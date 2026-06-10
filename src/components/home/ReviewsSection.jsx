"use client";

import { useRef, useState, useCallback } from "react";
import { reviews } from "@/data/mockData";
import { Star, Shield, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

// Google "G" SVG logo
function GoogleGIcon({ size = 20 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size}>
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

// Star rating component (Google yellow #FBBC04)
function StarRating({ rating, size = 16 }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => {
        const fillPercent = Math.min(Math.max(rating - i, 0), 1);
        return (
          <div key={i} className="relative" style={{ width: size, height: size }}>
            {/* Empty star (gray) */}
            <Star
              size={size}
              className="text-gray-300 absolute inset-0"
            />
            {/* Filled star with clip */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fillPercent * 100}%` }}
            >
              <Star
                size={size}
                className="fill-[#FBBC04] text-[#FBBC04]"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Local Guide badge component (like Google's real badge)
function LocalGuideBadge() {
  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#1a73e8]">
      <Shield size={11} className="fill-[#1a73e8] text-[#1a73e8]" />
      Local Guide
    </span>
  );
}

// Google watermark
function GoogleWatermark() {
  return (
    <div className="flex items-center gap-1.5 mt-6 justify-end opacity-40">
      <GoogleGIcon size={14} />
      <span className="text-xs text-gray-500 font-medium">Google</span>
    </div>
  );
}

// Review card with "Show more" for long text
function ReviewCard({ review, index }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.comment.length > 150;
  const displayText =
    isLong && !expanded ? review.comment.slice(0, 150) + "..." : review.comment;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="min-w-[320px] max-w-[340px] flex-shrink-0 bg-white border border-gray-200 rounded-lg p-5 flex flex-col gap-3 hover:shadow-md transition-shadow duration-200"
    >
      {/* User info row */}
      <div className="flex items-center gap-3">
        {/* Google-style avatar */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 text-white"
          style={{ backgroundColor: review.avatarBg || "#4285F4" }}
        >
          {review.initials}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-semibold text-sm text-[#202124] truncate">
              {review.name}
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
            {review.googleLocalGuide && <LocalGuideBadge />}
            {review.reviewCount && (
              <span className="text-[11px] text-[#5f6368]">
                · {review.reviewCount} review{review.reviewCount !== 1 ? "s" : ""}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Star rating + date */}
      <div className="flex items-center gap-2">
        <StarRating rating={review.rating} size={14} />
        <span className="text-xs text-[#5f6368]">{review.date}</span>
      </div>

      {/* Review text */}
      <div className="text-sm text-[#3c4043] leading-relaxed">
        <span>{displayText}</span>
        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-[#1a73e8] text-sm font-medium ml-1 hover:underline cursor-pointer"
          >
            {expanded ? "Show less" : "Show more"}
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default function ReviewsSection() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Calculate overall rating & distribution
  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
      : 0;

  // Star distribution
  const distribution = [0, 0, 0, 0, 0]; // index 0 = 1 star, index 4 = 5 stars
  reviews.forEach((r) => {
    if (r.rating >= 1 && r.rating <= 5) distribution[r.rating - 1]++;
  });
  const distPercents = distribution.map((count) =>
    totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0
  );

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
  }, []);

  const scroll = useCallback(
    (direction) => {
      const el = scrollRef.current;
      if (!el) return;
      const scrollAmount = 360;
      el.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      // Check after animation
      setTimeout(checkScroll, 350);
    },
    [checkScroll]
  );

  return (
    <section className="bg-white py-16 md:py-20 px-4 md:px-6 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Header + Rating Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          {/* "Google Reviews" title with G icon */}
          <div className="flex items-center gap-2 mb-6">
            <GoogleGIcon size={24} />
            <h2 className="text-xl md:text-2xl font-normal text-[#202124]">
              Google Reviews
            </h2>
          </div>

          {/* Rating summary row: score + stars + count + distribution */}
          <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10">
            {/* Left: Big rating + stars */}
            <div className="flex items-center gap-4">
              <span className="text-5xl font-light text-[#202124] leading-none">
                {averageRating.toFixed(1)}
              </span>
              <div className="flex flex-col gap-1">
                <StarRating rating={averageRating} size={22} />
                <span className="text-sm text-[#5f6368]">
                  ({totalReviews} review{totalReviews !== 1 ? "s" : ""})
                </span>
              </div>
            </div>

            {/* Right: Star distribution bar chart */}
            <div className="flex-1 max-w-sm">
              {[5, 4, 3, 2, 1].map((star) => {
                const idx = star - 1;
                const percent = distPercents[idx];
                return (
                  <div key={star} className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-[#5f6368] w-4 text-right">
                      {star}
                    </span>
                    <Star
                      size={12}
                      className="fill-[#FBBC04] text-[#FBBC04] flex-shrink-0"
                    />
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#FBBC04] rounded-full transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <span className="text-xs text-[#5f6368] w-8 text-right">
                      {percent}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Carousel with scroll buttons */}
        <div className="relative">
          {/* Left scroll button */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-gray-300 rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer -ml-3"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} className="text-[#5f6368]" />
            </button>
          )}

          {/* Right scroll button */}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-gray-300 rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer -mr-3"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} className="text-[#5f6368]" />
            </button>
          )}

          {/* Scrollable review cards */}
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-4 overflow-x-auto pb-2 px-1 scroll-smooth"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {/* Hide scrollbar with CSS */}
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            {reviews.map((review, idx) => (
              <ReviewCard key={review.id} review={review} index={idx} />
            ))}

            {/* "Review us on Google" CTA card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: reviews.length * 0.08 }}
              className="min-w-[260px] max-w-[280px] flex-shrink-0 bg-white border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center gap-3 text-center"
            >
              <GoogleGIcon size={32} />
              <p className="text-sm text-[#3c4043] font-medium">
                Review us on Google
              </p>
              <button className="text-xs text-[#1a73e8] font-medium hover:underline cursor-pointer">
                Write a review
              </button>
            </motion.div>
          </div>
        </div>

        {/* Google watermark */}
        <GoogleWatermark />
      </div>
    </section>
  );
}
