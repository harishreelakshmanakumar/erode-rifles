"use client";

import { useState } from "react";
import OrderTimeline from "./OrderTimeline";
import { ChevronDown, ChevronUp, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OrderCard({ order }) {
  const [expanded, setExpanded] = useState(false);

  const statusColor = order.status === "Delivered"
    ? "bg-erode-green text-erode-black"
    : "bg-erode-black text-white";

  return (
    <div className="border border-gray-200 rounded-lg bg-white">
      <div
        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <span className="font-semibold text-erode-black">{order.id}</span>
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusColor}`}>
                {order.status}
              </span>
            </div>
            <p className="text-sm text-gray-500">{order.date}</p>
            <p className="text-sm text-gray-600 mt-1">
              {order.items.map((item) => `${item.name} x${item.qty}`).join(", ")}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-semibold text-erode-black text-lg">
              ₹{order.total.toLocaleString("en-IN")}
            </span>
            {expanded ? (
              <ChevronUp className="size-5 text-gray-400" />
            ) : (
              <ChevronDown className="size-5 text-gray-400" />
            )}
          </div>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-gray-200 p-4">
          <OrderTimeline timeline={order.timeline} />
          <div className="mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => alert(`Invoice for ${order.id} downloaded!`)}
              className="gap-2"
            >
              <Download className="size-4" />
              Download Invoice
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
