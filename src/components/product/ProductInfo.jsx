"use client";

import { useState } from "react";
import { Heart, Share2, Minus, Plus, ShoppingCart, ArrowRight } from "lucide-react";
import { useRouter } from "@/context/RouterContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export default function ProductInfo({ product }) {
  const { navigate } = useRouter();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);

  const wishlisted = isInWishlist(product.id);

  const formatPrice = (price) => `₹${price.toLocaleString("en-IN")}`;

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => {
      const next = prev + delta;
      return Math.max(1, Math.min(next, product.stock));
    });
  };

  const handleAddToCart = () => {
    if (product.stock > 0) {
      addToCart(product, quantity);
    }
  };

  const handleBuyNow = () => {
    if (product.stock > 0) {
      addToCart(product, quantity);
      navigate("/checkout");
    }
  };

  const handleWishlistToggle = () => {
    if (wishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch {
        // User cancelled
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
      } catch {
        // Clipboard API not available
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500">
        <button
          onClick={() => navigate("/shop")}
          className="hover:text-erode-green transition-colors"
        >
          Shop
        </button>
        <span className="mx-2">/</span>
        <button
          onClick={() => navigate("/shop", { category: product.category })}
          className="hover:text-erode-green transition-colors"
        >
          {product.category}
        </button>
        <span className="mx-2">/</span>
        <span className="text-erode-black">{product.name}</span>
      </nav>

      {/* Product Name */}
      <h1 className="font-heading text-3xl text-erode-black">
        {product.name}
      </h1>

      {/* Price */}
      <p className="text-2xl font-bold text-erode-black">
        {formatPrice(product.price)}
      </p>

      {/* Stock */}
      <p className="text-sm text-erode-black">
        <span
          className={
            product.stock > 5
              ? "text-erode-green"
              : product.stock > 0
              ? "text-erode-black"
              : "text-gray-400"
          }
        >
          {product.stock > 0
            ? `${product.stock} units available`
            : "Out of Stock"}
        </span>
      </p>

      {/* Description */}
      <p className="text-sm text-gray-600 leading-relaxed">
        {product.description}
      </p>

      {/* Divider */}
      <div className="border-t border-gray-200 my-2" />

      {/* Quantity Selector */}
      {product.stock > 0 && (
        <div>
          <label className="text-sm font-semibold text-erode-black mb-2 block">
            Quantity
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              className="w-10 h-10 border border-gray-200 rounded flex items-center justify-center text-erode-black hover:border-erode-black transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-12 text-center font-semibold text-erode-black text-lg">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= product.stock}
              className="w-10 h-10 border border-gray-200 rounded flex items-center justify-center text-erode-black hover:border-erode-black transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 mt-2">
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="w-full flex items-center justify-center gap-2 bg-erode-green text-erode-black font-semibold py-3 rounded hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ShoppingCart className="w-5 h-5" />
          Add to Cart
        </button>
        <button
          onClick={handleBuyNow}
          disabled={product.stock === 0}
          className="w-full flex items-center justify-center gap-2 bg-erode-black text-white font-semibold py-3 rounded hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Buy Now
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Wishlist & Share */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleWishlistToggle}
          className="flex items-center gap-2 text-sm text-erode-black hover:text-erode-green transition-colors"
        >
          <Heart
            className={`w-4 h-4 ${
              wishlisted ? "fill-red-500 text-red-500" : ""
            }`}
          />
          {wishlisted ? "Added to Wishlist" : "Add to Wishlist"}
        </button>
        <button
          onClick={handleShare}
          className="flex items-center gap-2 text-sm text-erode-black hover:text-erode-green transition-colors"
        >
          <Share2 className="w-4 h-4" />
          Share
        </button>
      </div>
    </div>
  );
}
