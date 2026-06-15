"use client";
import { createContext, useContext, useState, useCallback } from "react";

const AuthContext = createContext();

// Helper to build API URLs through the Caddy gateway
function apiUrl(path) {
  return `/api/${path}?XTransformPort=3001`;
}

function getInitialUser() {
  if (typeof window === "undefined") return null;
  const saved = localStorage.getItem("erodeUser");
  if (saved) {
    try { return JSON.parse(saved); } catch { return null; }
  }
  return null;
}

function getInitialToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("erodeToken") || null;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getInitialUser);
  const [token, setToken] = useState(getInitialToken);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      user, token, loading, error,
      login, signup, logout, isAdmin, authFetch
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
