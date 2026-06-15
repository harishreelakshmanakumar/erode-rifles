"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { handleImageError } from "@/lib/imageFallback";

export default function ImageGallery({ images = [] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-[4/3] bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100">
        <span className="text-gray-400 text-sm">No image available</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Main Image — same aspect-[4/3] as ProductCard, no zoom */}
      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-gray-100 bg-gray-50">
        <AnimatePresence mode="wait">
          <motion.img
            key={selectedIndex}
            src={images[selectedIndex]}
            alt="Product image"
            className="w-full h-full object-contain p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onError={handleImageError}
          />
        </AnimatePresence>

        {/* Subtle inner border */}
        <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/5 pointer-events-none" />
      </div>

      {/* Thumbnails — consistent sizes */}
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ease-out bg-gray-50 cursor-pointer ${
                idx === selectedIndex
                  ? "border-erode-green shadow-[0_0_0_2px_rgba(184,214,60,0.3)]"
                  : "border-gray-100 hover:border-erode-black/30"
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-contain p-1.5"
                onError={handleImageError}
              />
              {idx === selectedIndex && (
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-erode-green" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
