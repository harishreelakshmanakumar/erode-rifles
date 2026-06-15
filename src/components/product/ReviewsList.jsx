"use client";

import { useState } from "react";
import { Star, Verified } from "lucide-react";
import { reviews } from "@/data/mockData";
import { motion } from "framer-motion";

// Star rating with partial fill support using brand colors
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

// Single review row for product detail page
function ReviewRow({ review, index }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.comment.length > 200;
  const displayText =
    isLong && !expanded ? review.comment.slice(0, 200) + "..." : review.comment;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="border border-gray-100 rounded-xl p-5 bg-white hover:shadow-md hover:border-erode-green/20 transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 text-white"
          style={{ backgroundColor: review.avatarBg || "#B8D63C" }}
        >
          {review.initials}
        </div>

        <div className="flex-1 min-w-0">
          {/* Name + Verified + title */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-semibold text-sm text-erode-black">
              {review.name}
            </span>
            {review.isVerified && (
              <Verified size={14} className="text-erode-green" />
            )}
            {review.title && (
              <span className="text-xs text-erode-black/50 bg-gray-100 px-2 py-0.5 rounded-full">
                {review.title}
              </span>
            )}
          </div>

          {/* Stars + date */}
          <div className="flex items-center gap-2 mt-1">
            <StarRating rating={review.rating} size={13} />
            <span className="text-xs text-erode-black/50">{review.date}</span>
          </div>

          {/* Review text */}
          <div className="text-sm text-erode-black/80 leading-relaxed mt-2">
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
        </div>
      </div>
    </motion.div>
  );
}

export default function ReviewsList() {
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

  return (
    <div>
      {/* Header: "Customer Reviews" - NO Google branding */}
      <div className="mb-5">
        <h2 className="font-heading text-2xl text-erode-black">Customer Reviews</h2>
      </div>

      {/* Rating summary */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8 mb-6 p-5 bg-gray-50 rounded-xl border border-gray-100"
      >
        {/* Left: Big rating + stars */}
        <div className="flex items-center gap-3">
          <span className="text-4xl font-heading text-erode-black leading-none">
            {averageRating.toFixed(1)}
          </span>
          <div className="flex flex-col gap-0.5">
            <StarRating rating={averageRating} size={20} />
            <span className="text-xs text-erode-black/60">
              Based on {totalReviews} review{totalReviews !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* Right: Distribution bar chart */}
        <div className="flex-1 max-w-xs">
          {[5, 4, 3, 2, 1].map((star) => {
            const idx = star - 1;
            const percent = distPercents[idx];
            return (
              <div key={star} className="flex items-center gap-2 mb-0.5">
                <span className="text-[11px] text-erode-black/60 w-3 text-right">
                  {star}
                </span>
                <Star
                  size={11}
                  className="fill-erode-green text-erode-green flex-shrink-0"
                />
                <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-erode-green rounded-full transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <span className="text-[11px] text-erode-black/60 w-7 text-right">
                  {percent}%
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Review cards - vertical list */}
      <div className="flex flex-col gap-3">
        {reviews.map((review, idx) => (
          <ReviewRow key={review.id} review={review} index={idx} />
        ))}
      </div>
    </div>
  );
}
