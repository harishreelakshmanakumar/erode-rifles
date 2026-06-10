"use client";
import { createContext, useContext, useState, useCallback } from "react";

const AuthContext = createContext();

function getInitialUser() {
  if (typeof window === "undefined") return null;
  const saved = localStorage.getItem("erodeUser");
  if (saved) {
    try { return JSON.parse(saved); } catch { return null; }
  }
  return null;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getInitialUser);

  const login = useCallback((email, password) => {
    // Mock auth
    const mockUser = {
      id: 1,
      name: "Rahul Kumar",
      email: email,
      phone: "+91 9876543210",
      role: email.includes("admin") ? "admin" : "user",
    };
    setUser(mockUser);
    localStorage.setItem("erodeUser", JSON.stringify(mockUser));
    return mockUser;
  }, []);

  const signup = useCallback((name, email, phone, password) => {
    const mockUser = {
      id: Date.now(),
      name,
      email,
      phone,
      role: "user",
    };
    setUser(mockUser);
    localStorage.setItem("erodeUser", JSON.stringify(mockUser));
    return mockUser;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("erodeUser");
  }, []);

  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
