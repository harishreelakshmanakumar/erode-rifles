"use client";
import { createContext, useContext, useState, useEffect, useCallback, useSyncExternalStore } from "react";

const CartContext = createContext();

// Subscribe to no-op (localStorage doesn't emit events within same tab)
function subscribe() { return () => {}; }
function getSnapshot() { return true; } // client: always mounted
function getServerSnapshot() { return false; } // server: never mounted

export function CartProvider({ children }) {
  const mounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [items, setItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage after mount
  useEffect(() => {
    if (hydrated) return;
    try {
      const saved = localStorage.getItem("erodeCart");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setItems(parsed);
        }
      }
    } catch {
      // Ignore parse errors
    }
    setHydrated(true);
  }, []);

  // Save to localStorage whenever items change
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem("erodeCart", JSON.stringify(items));
    }
  }, [items, hydrated]);

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
      items, total, count, isCartOpen, setIsCartOpen, mounted,
      addToCart, removeFromCart, updateQuantity, clearCart,
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
