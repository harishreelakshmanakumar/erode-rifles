"use client";
import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { apiUrl } from "@/lib/apiUrl";

const AuthContext = createContext();

// Using shared apiUrl helper (respects NEXT_PUBLIC_API_BASE)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);

  // Hydrate from localStorage after mount (client-only)
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("erodeUser");
      const savedToken = localStorage.getItem("erodeToken");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      if (savedToken) {
        setToken(savedToken);
      }
    } catch {
      // Ignore parse errors
    }
    setMounted(true);
  }, []);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(apiUrl("auth/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Login failed");
      }
      const { token: jwt, ...userData } = data.data;
      setUser(userData);
      setToken(jwt);
      localStorage.setItem("erodeUser", JSON.stringify(userData));
      localStorage.setItem("erodeToken", jwt);
      setLoading(false);
      return userData;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  }, []);

  const signup = useCallback(async (name, email, phone, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(apiUrl("auth/register"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password }),
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Registration failed");
      }
      // Auto-login after registration
      const { token: jwt, ...userData } = data.data;
      setUser(userData);
      setToken(jwt);
      localStorage.setItem("erodeUser", JSON.stringify(userData));
      localStorage.setItem("erodeToken", jwt);
      setLoading(false);
      return userData;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  }, []);

  const googleLogin = useCallback(async (googleUser) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(apiUrl("auth/google"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: googleUser.name,
          email: googleUser.email,
          googleId: googleUser.sub,
        }),
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Google sign-in failed");
      }
      const { token: jwt, ...userData } = data.data;
      setUser(userData);
      setToken(jwt);
      localStorage.setItem("erodeUser", JSON.stringify(userData));
      localStorage.setItem("erodeToken", jwt);
      setLoading(false);
      return userData;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("erodeUser");
    localStorage.removeItem("erodeToken");
  }, []);

  const isAdmin = user?.role === "ADMIN";

  // Helper for authenticated API calls
  const authFetch = useCallback(async (url, options = {}) => {
    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };
    const res = await fetch(url, { ...options, headers });
    const data = await res.json();
    if (!data.success) {
      throw new Error(data.error || "API request failed");
    }
    return data.data;
  }, [token]);

  return (
    <AuthContext.Provider value={{
      user, token, loading, error, mounted,
      login, signup, googleLogin, logout, isAdmin, authFetch
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
