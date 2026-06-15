"use client";

import { useRouter } from "@/context/RouterContext";
import { categories } from "@/data/mockData";
import { handleImageError } from "@/lib/imageFallback";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function CategoryGrid() {
  const { navigate } = useRouter();

  const handleCategoryClick = (slug, name) => {
    navigate("/shop", { category: name });
  };

  return (
    <section className="bg-white py-16 md:py-24 px-4 md:px-6 lg:px-24">
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
          <h2 className="font-heading text-3xl md:text-4xl text-erode-black mt-2">
            Product Categories
          </h2>
          <p className="text-erode-black/50 text-sm mt-2 max-w-lg mx-auto">
            Browse our carefully curated selection of air rifles, pistols, pellets, and accessories
          </p>
        </motion.div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              onClick={() => handleCategoryClick(category.slug, category.name)}
              className="group cursor-pointer border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg hover:border-erode-green/20 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="overflow-hidden relative bg-gray-50">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full aspect-square object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  onError={handleImageError}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-4 space-y-1">
                <h3 className="font-semibold text-erode-black text-sm sm:text-base">
                  {category.name}
                </h3>
                <p className="text-xs text-erode-black/50">
                  {category.count} products
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-erode-green opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300 ease-out">
                  Explore <ArrowRight size={12} />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
