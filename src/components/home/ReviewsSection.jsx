"use client";

import { useRef, useState, useCallback } from "react";
import { reviews } from "@/data/mockData";
import { Star, ChevronLeft, ChevronRight, Quote, Verified } from "lucide-react";
import { motion } from "framer-motion";

// Star rating component using brand colors
function StarRating({ rating, size = 16 }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => {
        const fillPercent = Math.min(Math.max(rating - i, 0), 1);
        return (
          <div key={i} className="relative" style={{ width: size, height: size }}>
            <Star size={size} className="text-gray-300 absolute inset-0" />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fillPercent * 100}%` }}
            >
              <Star size={size} className="fill-erode-green text-erode-green" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Testimonial card with premium design
function TestimonialCard({ review, index }) {
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
      className="min-w-[300px] max-w-[340px] flex-shrink-0 bg-white border border-gray-100 rounded-xl p-6 flex flex-col gap-4 hover:shadow-lg hover:border-erode-green/20 transition-all duration-300"
    >
      {/* Quote icon */}
      <Quote size={24} className="text-erode-green/30" />

      {/* Review text */}
      <div className="text-sm text-erode-black/80 leading-relaxed flex-1">
        <span>{displayText}</span>
        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-erode-green text-sm font-semibold ml-1 hover:underline cursor-pointer"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </div>

      {/* Star rating */}
      <div className="flex items-center gap-2">
        <StarRating rating={review.rating} size={14} />
        <span className="text-xs text-erode-black/50">{review.date}</span>
      </div>

      {/* User info */}
      <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 text-white"
          style={{ backgroundColor: review.avatarBg || "#B8D63C" }}
        >
          {review.initials}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-sm text-erode-black truncate">
              {review.name}
            </span>
            {review.isVerified && (
              <Verified size={14} className="text-erode-green flex-shrink-0" />
            )}
          </div>
          <span className="text-xs text-erode-black/50">{review.title}</span>
        </div>
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
  const distribution = [0, 0, 0, 0, 0];
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
      setTimeout(checkScroll, 350);
    },
    [checkScroll]
  );

  return (
    <section className="bg-gray-50 py-16 md:py-24 px-4 md:px-6 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Header + Rating Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          {/* Section Title */}
          <div className="text-center mb-8">
            <span className="text-erode-green font-semibold text-sm uppercase tracking-wider">
              What Our Customers Say
            </span>
            <h2 className="font-heading text-3xl md:text-4xl text-erode-black mt-2">
              Customer Reviews
            </h2>
          </div>

          {/* Rating summary row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
            {/* Left: Big rating + stars */}
            <div className="flex items-center gap-4">
              <span className="text-5xl font-heading text-erode-black leading-none">
                {averageRating.toFixed(1)}
              </span>
              <div className="flex flex-col gap-1">
                <StarRating rating={averageRating} size={22} />
                <span className="text-sm text-erode-black/60">
                  Based on {totalReviews} review{totalReviews !== 1 ? "s" : ""}
                </span>
              </div>
            </div>

            {/* Right: Star distribution bar chart */}
            <div className="flex-1 max-w-xs w-full">
              {[5, 4, 3, 2, 1].map((star) => {
                const idx = star - 1;
                const percent = distPercents[idx];
                return (
                  <div key={star} className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-erode-black/60 w-4 text-right">
                      {star}
                    </span>
                    <Star
                      size={12}
                      className="fill-erode-green text-erode-green flex-shrink-0"
                    />
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-erode-green rounded-full transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <span className="text-xs text-erode-black/60 w-8 text-right">
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
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center hover:bg-erode-green hover:text-erode-black hover:border-erode-green transition-colors cursor-pointer -ml-3"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {/* Right scroll button */}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center hover:bg-erode-green hover:text-erode-black hover:border-erode-green transition-colors cursor-pointer -mr-3"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          )}

          {/* Scrollable review cards */}
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-5 overflow-x-auto pb-2 px-1 scroll-smooth"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            {reviews.map((review, idx) => (
              <TestimonialCard key={review.id} review={review} index={idx} />
            ))}

            {/* "Share Your Experience" CTA card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: reviews.length * 0.08 }}
              className="min-w-[260px] max-w-[280px] flex-shrink-0 bg-white border border-dashed border-erode-green/40 rounded-xl p-8 flex flex-col items-center justify-center gap-4 text-center"
            >
              <div className="w-14 h-14 rounded-full bg-erode-green/10 flex items-center justify-center">
                <Star size={24} className="text-erode-green" />
              </div>
              <p className="text-sm text-erode-black/80 font-semibold">
                Share Your Experience
              </p>
              <p className="text-xs text-erode-black/50">
                Your feedback helps us improve and helps others make informed decisions.
              </p>
              <button className="text-sm text-erode-green font-semibold hover:underline cursor-pointer">
                Write a Review
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
