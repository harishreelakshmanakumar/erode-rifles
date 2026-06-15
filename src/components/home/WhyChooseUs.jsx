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
    <section className="bg-gray-50 py-16 md:py-24 px-4 md:px-6 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-erode-green font-semibold text-sm uppercase tracking-wider">
            Our Promise
          </span>
          <h2 className="font-heading text-3xl md:text-4xl text-erode-black mt-2">
            Why Choose Erode Rifles
          </h2>
          <p className="text-erode-black/50 text-sm mt-2 max-w-lg mx-auto">
            We&apos;re committed to providing the best shooting sports experience
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
          {whyChooseUs.map((item, index) => {
            const IconComponent = iconMap[item.icon] || CheckCircle;
            return (
              <motion.div
                key={index}
                className="bg-white border border-gray-100 rounded-xl p-5 sm:p-6 text-center space-y-3 hover:shadow-lg hover:border-erode-green/20 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="flex justify-center">
                  <div className="w-12 h-12 rounded-xl bg-erode-green/10 flex items-center justify-center">
                    <IconComponent
                      size={24}
                      className="text-erode-green"
                    />
                  </div>
                </div>
                <h3 className="font-bold text-sm sm:text-base text-erode-black">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-erode-black/50 leading-relaxed">
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
