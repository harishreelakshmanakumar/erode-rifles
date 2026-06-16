"use client";

import { Check } from "lucide-react";
import { motion } from "framer-motion";

const steps = ["Address", "Review", "Payment", "Success"];

export default function StepIndicator({ currentStep }) {
  return (
    <div className="mb-6 overflow-x-auto pb-2 sm:mb-8">
      <div className="flex min-w-max items-center justify-start sm:justify-center px-1">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;

        return (
          <div key={step} className="flex items-center">
            {/* Step circle + label */}
            <div className="flex flex-col items-center">
              <motion.div
                layout
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-colors ${
                  isCompleted
                    ? "bg-erode-green border-erode-green text-erode-black"
                    : isCurrent
                    ? "bg-erode-green border-erode-green text-erode-black"
                    : "bg-white border-gray-300 text-gray-400"
                }`}
              >
                {isCompleted ? <Check className="size-5" strokeWidth={3} /> : index + 1}
              </motion.div>
              <span
                className={`text-xs mt-1.5 font-medium ${
                  isCompleted || isCurrent ? "text-erode-black" : "text-gray-400"
                }`}
              >
                {step}
              </span>
            </div>

            {/* Connecting line */}
            {index < steps.length - 1 && (
              <div
                className={`w-12 sm:w-24 h-0.5 mx-2 mt-[-18px] ${
                  index < currentStep ? "bg-erode-green" : "bg-gray-300"
                }`}
              />
            )}
          </div>
        );
      })}
      </div>
    </div>
  );
}
