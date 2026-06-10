"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";

const CartContext = createContext();

function getInitialCart() {
  if (typeof window === "undefined") return [];
  const saved = localStorage.getItem("erodeCart");
  if (saved) {
    try { return JSON.parse(saved); } catch { return []; }
  }
  return [];
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(getInitialCart);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("erodeCart", JSON.stringify(items));
  }, [items]);

  const addToCart = useCallback((product, qty = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i =>
          i.id === product.id
            ? { ...i, qty: Math.min(i.qty + qty, product.stock || 99) }
            : i
        );
      }
      return [...prev, { ...product, qty: Math.min(qty, product.stock || 99) }];
    });
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((productId) => {
    setItems(prev => prev.filter(i => i.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId, qty) => {
    if (qty <= 0) {
      setItems(prev => prev.filter(i => i.id !== productId));
      return;
    }
    setItems(prev => prev.map(i =>
      i.id === productId ? { ...i, qty } : i
    ));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{
      items, total, count, isCartOpen, setIsCartOpen,
      addToCart, removeFromCart, updateQuantity, clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
