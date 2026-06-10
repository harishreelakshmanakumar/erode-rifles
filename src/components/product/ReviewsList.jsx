"use client";

import { useState } from "react";
import { Star, Shield } from "lucide-react";
import { reviews } from "@/data/mockData";
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

// Star rating with partial fill support
function StarRating({ rating, size = 16 }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => {
        const fillPercent = Math.min(Math.max(rating - i, 0), 1);
        return (
          <div key={i} className="relative" style={{ width: size, height: size }}>
            <Star
              size={size}
              className="text-gray-300 absolute inset-0"
            />
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

// Local Guide badge
function LocalGuideBadge() {
  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#1a73e8]">
      <Shield size={11} className="fill-[#1a73e8] text-[#1a73e8]" />
      Local Guide
    </span>
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
      className="border border-gray-200 rounded-lg p-5 bg-white hover:shadow-sm transition-shadow duration-200"
    >
      <div className="flex items-start gap-3">
        {/* Google-style avatar */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 text-white"
          style={{ backgroundColor: review.avatarBg || "#4285F4" }}
        >
          {review.initials}
        </div>

        <div className="flex-1 min-w-0">
          {/* Name + Local Guide + review count */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-semibold text-sm text-[#202124]">
              {review.name}
            </span>
            {review.googleLocalGuide && <LocalGuideBadge />}
            {review.reviewCount && (
              <span className="text-[11px] text-[#5f6368]">
                · {review.reviewCount} review{review.reviewCount !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          {/* Stars + date */}
          <div className="flex items-center gap-2 mt-1">
            <StarRating rating={review.rating} size={13} />
            <span className="text-xs text-[#5f6368]">{review.date}</span>
          </div>

          {/* Review text */}
          <div className="text-sm text-[#3c4043] leading-relaxed mt-2">
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
      {/* Header: "Google Reviews" with G icon */}
      <div className="flex items-center gap-2 mb-5">
        <GoogleGIcon size={22} />
        <h2 className="text-xl font-normal text-[#202124]">Google Reviews</h2>
      </div>

      {/* Rating summary: score + stars + count + distribution */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8 mb-6 p-4 bg-gray-50 rounded-lg"
      >
        {/* Left: Big rating + stars */}
        <div className="flex items-center gap-3">
          <span className="text-4xl font-light text-[#202124] leading-none">
            {averageRating.toFixed(1)}
          </span>
          <div className="flex flex-col gap-0.5">
            <StarRating rating={averageRating} size={20} />
            <span className="text-xs text-[#5f6368]">
              ({totalReviews} review{totalReviews !== 1 ? "s" : ""})
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
                <span className="text-[11px] text-[#5f6368] w-3 text-right">
                  {star}
                </span>
                <Star
                  size={11}
                  className="fill-[#FBBC04] text-[#FBBC04] flex-shrink-0"
                />
                <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#FBBC04] rounded-full transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <span className="text-[11px] text-[#5f6368] w-7 text-right">
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

      {/* Google watermark */}
      <div className="flex items-center gap-1.5 mt-5 justify-end opacity-40">
        <GoogleGIcon size={14} />
        <span className="text-xs text-gray-500 font-medium">Google</span>
      </div>
    </div>
  );
}
