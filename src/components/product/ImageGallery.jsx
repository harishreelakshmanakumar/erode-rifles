"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { handleImageError } from "@/lib/imageFallback";

export default function ImageGallery({ images = [] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [isZooming, setIsZooming] = useState(false);
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
      <div className="w-full aspect-[4/3] bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
        <span className="text-gray-400">No image available</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Main Image — with premium frame and zoom lens */}
      <div
        ref={mainImageRef}
        className="relative w-full aspect-[4/3] rounded-xl overflow-hidden cursor-crosshair border border-gray-200 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.15)]"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={selectedIndex}
            src={images[selectedIndex]}
            alt="Product image"
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.02 }}
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
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  }
                : {}
            }
          />
        </AnimatePresence>

        {/* Zoom lens circular indicator — follows cursor */}
        {isZooming && (
          <div
            className="absolute w-24 h-24 rounded-full border-2 border-white/50 pointer-events-none shadow-[0_0_15px_rgba(0,0,0,0.2)] backdrop-blur-[1px]"
            style={{
              left: `${zoomPosition.x}%`,
              top: `${zoomPosition.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          />
        )}

        {/* Subtle inner highlight ring */}
        <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10 pointer-events-none" />
      </div>

      {/* Thumbnails — with smooth active state transition */}
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ease-out ${
                idx === selectedIndex
                  ? "border-erode-green shadow-[0_0_0_2px_rgba(184,214,60,0.3)]"
                  : "border-gray-200 hover:border-erode-black/40"
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                onError={handleImageError}
              />
              {/* Active indicator dot */}
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
