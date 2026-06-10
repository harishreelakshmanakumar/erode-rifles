"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";

const WishlistContext = createContext();

function getInitialWishlist() {
  if (typeof window === "undefined") return [];
  const saved = localStorage.getItem("erodeWishlist");
  if (saved) {
    try { return JSON.parse(saved); } catch { return []; }
  }
  return [];
}

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(getInitialWishlist);

  useEffect(() => {
    localStorage.setItem("erodeWishlist", JSON.stringify(items));
  }, [items]);

  const addToWishlist = useCallback((product) => {
    setItems(prev => {
      if (prev.find(i => i.id === product.id)) return prev;
      return [...prev, product];
    });
  }, []);

  const removeFromWishlist = useCallback((productId) => {
    setItems(prev => prev.filter(i => i.id !== productId));
  }, []);

  const isInWishlist = useCallback((productId) => {
    return items.some(i => i.id === productId);
  }, [items]);

  return (
    <WishlistContext.Provider value={{ items, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within WishlistProvider");
  return context;
}
