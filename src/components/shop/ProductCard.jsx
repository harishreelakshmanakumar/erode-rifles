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
    navigate(`/product/${product.slug}`);
  };

  const formatPrice = (price) => `₹${price.toLocaleString("en-IN")}`;

  const getStockStatus = () => {
    if (product.stock === 0) {
      return <span className="text-gray-400 text-sm">Out of Stock</span>;
    }
    if (product.stock <= 5) {
      return (
        <span className="text-erode-black text-sm">
          Low Stock ({product.stock} left)
        </span>
      );
    }
    return <span className="text-erode-green text-sm">In Stock ✓</span>;
  };

  return (
    <motion.div
      className="border border-gray-200 rounded-lg overflow-hidden bg-white"
      whileHover={{
        y: -6,
        boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)",
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Image */}
      <div
        className="relative cursor-pointer overflow-hidden"
        onClick={handleViewDetails}
      >
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full aspect-[4/3] object-cover rounded-t-lg"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          onError={handleImageError}
        />

        {/* Featured badge */}
        {product.isFeatured && (
          <span className="absolute top-2 left-2 bg-erode-green text-erode-black text-xs font-semibold px-2 py-0.5 rounded">
            Featured
          </span>
        )}

        {/* Wishlist button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center border border-gray-200 hover:border-erode-black transition-colors"
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`w-4 h-4 ${
              wishlisted
                ? "fill-red-500 text-red-500"
                : "text-erode-black"
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2">
        {/* Category tag */}
        <span className="inline-block w-fit border border-erode-black rounded text-xs px-2 py-0.5 text-erode-black">
          {product.category}
        </span>

        {/* Product name */}
        <h3
          className="font-semibold text-lg text-erode-black cursor-pointer hover:text-erode-green transition-colors"
          onClick={handleViewDetails}
        >
          {product.name}
        </h3>

        {/* Stock status */}
        {getStockStatus()}

        {/* Price */}
        <p className="text-xl font-bold text-erode-black">
          {formatPrice(product.price)}
        </p>

        {/* Buttons */}
        <div className="flex gap-2 mt-2">
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="flex-1 flex items-center justify-center gap-1.5 bg-erode-green text-erode-black font-medium text-sm py-2 px-3 rounded hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
          <button
            onClick={handleViewDetails}
            className="flex-1 flex items-center justify-center gap-1.5 border border-erode-black text-erode-black font-medium text-sm py-2 px-3 rounded hover:bg-erode-black hover:text-white transition-colors"
          >
            <Eye className="w-4 h-4" />
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
}
