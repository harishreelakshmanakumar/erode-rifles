"use client";

import { useState } from "react";
import { Heart, Share2, Minus, Plus, ShoppingCart, ArrowRight } from "lucide-react";
import { useRouter } from "@/context/RouterContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.08 }}
      className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:border-0 sm:p-0 sm:shadow-none"
    >
      {/* Breadcrumb */}
      <nav className="flex flex-wrap items-center gap-y-1 text-xs sm:text-sm text-gray-500">
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
        <span className="text-erode-black line-clamp-1">{product.name}</span>
      </nav>

      {/* Product Name */}
      <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-erode-black leading-none">
        {product.name}
      </h1>

      {/* Price */}
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-2xl sm:text-3xl font-bold text-erode-black">
          {formatPrice(product.price)}
        </p>
        <span className="rounded-full bg-erode-green/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-erode-black">
          Match grade
        </span>
      </div>

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
      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
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
          <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 p-1">
            <button
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-erode-black hover:border-erode-black transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-12 text-center font-semibold text-erode-black text-lg">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= product.stock}
              className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-erode-black hover:border-erode-black transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="w-full flex items-center justify-center gap-2 bg-erode-green text-erode-black font-semibold py-3.5 rounded-xl hover:-translate-y-0.5 hover:shadow-lg hover:shadow-erode-green/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          <ShoppingCart className="w-5 h-5" />
          Add to Cart
        </button>
        <button
          onClick={handleBuyNow}
          disabled={product.stock === 0}
          className="w-full flex items-center justify-center gap-2 bg-erode-black text-white font-semibold py-3.5 rounded-xl hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/15 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          Buy Now
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Wishlist & Share */}
      <div className="flex flex-wrap items-center gap-3 pt-1">
        <button
          onClick={handleWishlistToggle}
          className="flex items-center gap-2 rounded-full border border-gray-200 px-3 py-2 text-sm text-erode-black hover:border-erode-green hover:text-erode-green transition-colors"
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
          className="flex items-center gap-2 rounded-full border border-gray-200 px-3 py-2 text-sm text-erode-black hover:border-erode-green hover:text-erode-green transition-colors"
        >
          <Share2 className="w-4 h-4" />
          Share
        </button>
      </div>
    </motion.div>
  );
}
