"use client";

import { reviews } from "@/data/mockData";
import { Star } from "lucide-react";

export default function ReviewsSection() {
  return (
    <section className="bg-white py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-4">
          <h2 className="font-heading text-4xl text-erode-black">
            Google Reviews
          </h2>
        </div>

        {/* Rating Summary */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <span className="text-2xl font-bold text-erode-black">Google</span>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                size={18}
                className="text-erode-green fill-erode-green"
              />
            ))}
          </div>
          <span className="text-lg font-bold text-erode-black">4.9</span>
          <span className="text-sm text-erode-black/60">(53 reviews)</span>
        </div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="border border-gray-200 rounded-lg p-6 space-y-4"
            >
              {/* Avatar + Name Row */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-erode-black text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {review.initials}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-erode-black">
                      {review.name}
                    </span>
                  </div>
                  {review.isVerified && (
                    <span className="text-xs bg-erode-green/15 text-erode-green font-semibold px-2 py-0.5 rounded">
                      Verified Customer
                    </span>
                  )}
                </div>
              </div>

              {/* Star Rating */}
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={
                      i < review.rating
                        ? "text-erode-green fill-erode-green"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-sm text-erode-black/70 leading-relaxed">
                {review.comment}
              </p>

              {/* Date */}
              <p className="text-xs text-erode-black/40">{review.date}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
