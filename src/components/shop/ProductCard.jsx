"use client";

import { Heart, ShoppingCart, Eye } from "lucide-react";
import { useRouter } from "@/context/RouterContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { handleImageError } from "@/lib/imageFallback";
import { motion } from "framer-motion";

export default function ProductCard({ product }) {
  const { navigate } = useRouter();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const wishlisted = isInWishlist(product.id);

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    if (wishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (product.stock > 0) {
      addToCart(product, 1);
    }
  };

  const handleViewDetails = (e) => {
    e.stopPropagation();
    navigate(`/products/${product.slug}`);
  };

  const formatPrice = (price) => `₹${price.toLocaleString("en-IN")}`;

  const getStockStatus = () => {
    if (product.stock === 0) {
      return <span className="text-gray-400 text-xs font-medium">Out of Stock</span>;
    }
    if (product.stock <= 5) {
      return (
        <span className="text-amber-600 text-xs font-medium">
          Only {product.stock} left
        </span>
      );
    }
    return <span className="text-erode-green text-xs font-semibold">In Stock</span>;
  };

  return (
    <motion.div
      className="border border-gray-100 rounded-xl overflow-hidden bg-white group"
      whileHover={{
        y: -4,
        boxShadow: "0 12px 32px -8px rgba(0,0,0,0.12), 0 4px 8px -4px rgba(0,0,0,0.06)",
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Image Container - Fixed size with consistent aspect ratio */}
      <div
        className="relative cursor-pointer overflow-hidden bg-gray-50"
        onClick={handleViewDetails}
      >
        <div className="w-full h-48 sm:h-56 lg:h-60 flex items-center justify-center p-4">
          <img
            src={product.image}
            alt={product.name}
            className="max-w-full max-h-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
            onError={handleImageError}
          />
        </div>

        {/* Featured badge */}
        {product.isFeatured && (
          <span className="absolute top-3 left-3 bg-erode-green text-erode-black text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
            Featured
          </span>
        )}

        {/* Wishlist button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center border border-gray-100 hover:border-erode-green hover:bg-white shadow-sm transition-all duration-200"
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`w-4 h-4 transition-colors duration-200 ${
              wishlisted
                ? "fill-red-500 text-red-500"
                : "text-erode-black/50 group-hover:text-erode-black"
            }`}
          />
        </button>

        {/* Hover overlay with quick actions */}
        <div className="absolute inset-0 bg-erode-black/0 group-hover:bg-erode-black/10 transition-colors duration-300 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col gap-2">
        {/* Category tag */}
        <span className="inline-block w-fit text-[10px] font-semibold uppercase tracking-wider text-erode-black/50 border border-erode-black/10 rounded-full px-2.5 py-0.5">
          {product.category}
        </span>

        {/* Product name */}
        <h3
          className="font-semibold text-base sm:text-lg text-erode-black cursor-pointer hover:text-erode-green transition-colors line-clamp-2 leading-snug"
          onClick={handleViewDetails}
        >
          {product.name}
        </h3>

        {/* Short description */}
        <p className="text-xs text-erode-black/50 line-clamp-2 leading-relaxed">
          {product.shortDescription}
        </p>

        {/* Stock status */}
        {getStockStatus()}

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-1">
          <p className="text-lg sm:text-xl font-bold text-erode-black">
            {formatPrice(product.price)}
          </p>
          {product.originalPrice && (
            <p className="text-sm text-erode-black/40 line-through">
              {formatPrice(product.originalPrice)}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-2">
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="flex-1 flex items-center justify-center gap-1.5 bg-erode-green text-erode-black font-semibold text-sm py-2.5 px-3 rounded-lg hover:bg-erode-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
          <button
            onClick={handleViewDetails}
            className="flex-1 flex items-center justify-center gap-1.5 border border-erode-black text-erode-black font-semibold text-sm py-2.5 px-3 rounded-lg hover:bg-erode-black hover:text-white transition-colors"
          >
            <Eye className="w-4 h-4" />
            Details
          </button>
        </div>
      </div>
    </motion.div>
  );
}
