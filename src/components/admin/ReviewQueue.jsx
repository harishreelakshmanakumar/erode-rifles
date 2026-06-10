"use client";

import { useState } from "react";
import { reviews as mockReviews } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Star, Check, X } from "lucide-react";

export default function ReviewQueue() {
  const [activeTab, setActiveTab] = useState("pending");
  const [reviewList, setReviewList] = useState(
    mockReviews.map((r) => ({ ...r, status: r.id <= 1 ? "approved" : "pending" }))
  );

  const pendingReviews = reviewList.filter((r) => r.status === "pending");
  const approvedReviews = reviewList.filter((r) => r.status === "approved");

  const handleApprove = (id) => {
    setReviewList((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "approved" } : r))
    );
  };

  const handleReject = (id) => {
    setReviewList((prev) => prev.filter((r) => r.id !== id));
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`size-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  const renderCard = (review) => (
    <div
      key={review.id}
      className="border border-gray-200 rounded-lg p-4 bg-white"
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="font-semibold text-erode-black">{review.name}</p>
          <div className="flex items-center gap-1 mt-1">
            {renderStars(review.rating)}
          </div>
        </div>
        <span className="text-xs text-gray-400">{review.date}</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">{review.comment}</p>
      {review.status === "pending" && (
        <div className="flex gap-2">
          <Button
            onClick={() => handleApprove(review.id)}
            className="bg-erode-green hover:bg-erode-green/90 text-erode-black text-sm h-8"
          >
            <Check className="size-3.5 mr-1" />
            Approve
          </Button>
          <Button
            variant="outline"
            onClick={() => handleReject(review.id)}
            className="text-sm h-8"
          >
            <X className="size-3.5 mr-1" />
            Reject
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <div>
      <h2 className="font-heading text-2xl text-erode-black mb-4">Reviews</h2>

      {/* Tabs */}
      <div className="flex gap-4 mb-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("pending")}
          className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "pending"
              ? "border-erode-green text-erode-black"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Pending ({pendingReviews.length})
        </button>
        <button
          onClick={() => setActiveTab("approved")}
          className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "approved"
              ? "border-erode-green text-erode-black"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Approved ({approvedReviews.length})
        </button>
      </div>

      {/* Cards */}
      <div className="space-y-3">
        {activeTab === "pending" && (
          pendingReviews.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No pending reviews.</p>
          ) : (
            pendingReviews.map(renderCard)
          )
        )}
        {activeTab === "approved" && (
          approvedReviews.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No approved reviews.</p>
          ) : (
            approvedReviews.map(renderCard)
          )
        )}
      </div>
    </div>
  );
}
