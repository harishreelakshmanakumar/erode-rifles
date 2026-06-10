"use client";

import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Trash2, ShoppingCart } from "lucide-react";

export default function WishlistGrid() {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Your wishlist is empty.</p>
        <p className="text-gray-400 text-sm mt-1">
          Browse products and add items you love.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="border border-gray-200 rounded-lg bg-white overflow-hidden"
        >
          <div className="aspect-[4/3] bg-gray-100">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-erode-black mb-1">{item.name}</h3>
            <p className="text-lg font-bold text-erode-black mb-3">
              ₹{item.price.toLocaleString("en-IN")}
            </p>
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  addToCart(item);
                  removeFromWishlist(item.id);
                }}
                className="flex-1 bg-erode-green hover:bg-erode-green/90 text-erode-black text-sm h-9"
              >
                <ShoppingCart className="size-4 mr-1" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => removeFromWishlist(item.id)}
                className="h-9 w-9"
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
