"use client";

import { Star } from "lucide-react";
import { reviews } from "@/data/mockData";

export default function ReviewsList() {
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  return (
    <div>
      <h2 className="font-heading text-2xl text-erode-black mb-4">
        Customer Reviews
      </h2>

      {/* Average Rating */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-5 h-5 ${
                star <= Math.round(averageRating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <span className="text-lg font-semibold text-erode-black">
          {averageRating.toFixed(1)}
        </span>
        <span className="text-sm text-gray-500">
          ({reviews.length} review{reviews.length !== 1 ? "s" : ""})
        </span>
      </div>

      {/* Review Cards */}
      <div className="flex flex-col gap-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border border-gray-200 rounded-lg p-4"
          >
            <div className="flex items-start gap-3">
              {/* Avatar */}
              <div className="w-10 h-10 bg-erode-green rounded-full flex items-center justify-center shrink-0">
                <span className="text-erode-black text-sm font-bold">
                  {review.initials}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                {/* Name & Date */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-erode-black text-sm">
                      {review.name}
                    </span>
                    {review.isVerified && (
                      <span className="text-xs text-erode-green font-medium">
                        ✓ Verified
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-400 shrink-0">
                    {review.date}
                  </span>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-0.5 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-3.5 h-3.5 ${
                        star <= review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                  {review.comment}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
