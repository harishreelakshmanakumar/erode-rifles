"use client";

import { whyChooseUs } from "@/data/mockData";
import { Shield, Award, Tag, Heart, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

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
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-4xl text-erode-black">
            Why Choose Erode Rifles
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {whyChooseUs.map((item, index) => {
            const IconComponent = iconMap[item.icon] || CheckCircle;
            return (
              <motion.div
                key={index}
                className="border border-gray-200 rounded-lg p-6 text-center space-y-3"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  y: -4,
                  boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)",
                }}
              >
                <div className="flex justify-center">
                  <IconComponent
                    size={32}
                    className="text-erode-green transition-colors duration-300"
                  />
                </div>
                <h3 className="font-bold text-lg text-erode-black">
                  {item.title}
                </h3>
                <p className="text-sm text-erode-black/70 font-normal leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
