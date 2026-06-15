"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { handleImageError } from "@/lib/imageFallback";
import { ZoomIn } from "lucide-react";

export default function ImageGallery({ images = [] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [isZooming, setIsZooming] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const mainImageRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!mainImageRef.current) return;
    const rect = mainImageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsZooming(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsZooming(false);
  }, []);

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-square bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100">
        <span className="text-gray-400 text-sm">No image available</span>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        {/* Main Image — consistent container with object-contain */}
        <div
          ref={mainImageRef}
          className="relative w-full aspect-square rounded-xl overflow-hidden cursor-crosshair border border-gray-100 bg-gray-50 shadow-sm"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={selectedIndex}
              src={images[selectedIndex]}
              alt="Product image"
              className="w-full h-full object-contain p-4 sm:p-6"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                scale: isZooming ? 1.8 : 1,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onError={handleImageError}
              style={
                isZooming
                  ? {
                      objectFit: "cover",
                      transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    }
                  : {}
              }
            />
          </AnimatePresence>

          {/* Zoom indicator */}
          {!isZooming && (
            <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1 text-xs text-erode-black/60 pointer-events-none">
              <ZoomIn size={12} />
              Hover to zoom
            </div>
          )}

          {/* Fullscreen button */}
          <button
            onClick={() => setIsFullscreen(true)}
            className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-lg flex items-center justify-center text-erode-black/60 hover:text-erode-black hover:bg-white transition-colors cursor-pointer shadow-sm"
            aria-label="View fullscreen"
          >
            <ZoomIn size={16} />
          </button>

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
                className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ease-out bg-gray-50 ${
                  idx === selectedIndex
                    ? "border-erode-green shadow-[0_0_0_2px_rgba(184,214,60,0.3)]"
                    : "border-gray-100 hover:border-erode-black/30"
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-contain p-1.5 transition-transform duration-200 hover:scale-105"
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

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/90 flex items-center justify-center"
            onClick={() => setIsFullscreen(false)}
          >
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={images[selectedIndex]}
              alt="Product image fullscreen"
              className="max-w-[90vw] max-h-[90vh] object-contain"
              onError={handleImageError}
            />
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-6 right-6 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="Close fullscreen"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
