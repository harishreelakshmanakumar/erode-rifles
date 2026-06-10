"use client";

import { whyChooseUs } from "@/data/mockData";
import { Shield, Award, Tag, Heart, CheckCircle } from "lucide-react";

const iconMap = {
  Shield: Shield,
  Award: Award,
  Tag: Tag,
  Heart: Heart,
  Check: CheckCircle,
};

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl text-erode-black">
            Why Choose Erode Rifles
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {whyChooseUs.map((item, index) => {
            const IconComponent = iconMap[item.icon] || CheckCircle;
            return (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-6 text-center space-y-3"
              >
                <div className="flex justify-center">
                  <IconComponent size={32} className="text-erode-green" />
                </div>
                <h3 className="font-bold text-lg text-erode-black">
                  {item.title}
                </h3>
                <p className="text-sm text-erode-black/70 font-normal leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
