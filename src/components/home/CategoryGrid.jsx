"use client";

import { useRouter } from "@/context/RouterContext";
import { categories } from "@/data/mockData";
import { handleImageError } from "@/lib/imageFallback";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function CategoryGrid() {
  const { navigate } = useRouter();

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
          <span className="text-erode-green font-semibold text-sm uppercase tracking-wider">
            Our Collection
          </span>
          <h2 className="font-heading text-4xl text-erode-black mt-2">
            Product Categories
          </h2>
        </motion.div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              onClick={() => navigate("/shop?category=" + category.slug)}
              className="group cursor-pointer border border-gray-200 rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)",
              }}
            >
              <div className="overflow-hidden relative">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full aspect-square object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                  onError={handleImageError}
                />
                {/* Dark overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300 ease-out pointer-events-none" />
              </div>
              <div className="p-4 space-y-1">
                <h3 className="font-semibold text-erode-black">
                  {category.name}
                </h3>
                <p className="text-sm text-erode-black/60">
                  {category.count} products
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-erode-black/70 group-hover:text-erode-green group-hover:gap-2 group-hover:font-semibold transition-all duration-300 ease-out">
                  Explore <ArrowRight size={14} className="transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
