"use client";
import { createContext, useContext, useState, useCallback, useEffect } from "react";

export const RouterContext = createContext();

export function RouterProvider({ children }) {
  const [path, setPath] = useState("/");
  const [params, setParams] = useState({});

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.slice(1) || "/";
      setPath(hash);
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const navigate = useCallback((to, p = {}) => {
    window.location.hash = to;
    setPath(to);
    setParams(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const goBack = useCallback(() => {
    window.history.back();
  }, []);

  return (
    <RouterContext.Provider value={{ path, params, navigate, goBack }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) throw new Error("useRouter must be used within RouterProvider");
  return context;
}
