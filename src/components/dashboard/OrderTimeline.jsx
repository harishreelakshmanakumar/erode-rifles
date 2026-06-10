"use client";

import { Check } from "lucide-react";

export default function OrderTimeline({ timeline }) {
  return (
    <div className="relative pl-6">
      {timeline.map((step, index) => (
        <div key={step.step} className="relative pb-6 last:pb-0">
          {/* Vertical connecting line */}
          {index < timeline.length - 1 && (
            <div
              className={`absolute left-[-18px] top-6 w-0.5 h-full ${
                step.completed ? "bg-erode-green" : "bg-gray-300"
              }`}
            />
          )}

          {/* Circle indicator */}
          <div
            className={`absolute left-[-22px] top-0 size-[18px] rounded-full border-2 flex items-center justify-center ${
              step.completed
                ? "bg-erode-green border-erode-green"
                : "bg-white border-gray-300"
            }`}
          >
            {step.completed && (
              <Check className="size-3 text-erode-black" strokeWidth={3} />
            )}
          </div>

          {/* Step content */}
          <div className="ml-2">
            <p
              className={`text-sm font-medium ${
                step.completed ? "text-erode-black" : "text-gray-400"
              }`}
            >
              {step.step}
            </p>
            <p className="text-xs text-gray-400">{step.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
