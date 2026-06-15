"use client";

import { useRouter } from "@/context/RouterContext";
import { products } from "@/data/mockData";
import { handleImageError } from "@/lib/imageFallback";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function FeaturedProducts() {
  const { navigate } = useRouter();
  const featured = products.filter((p) => p.isFeatured === true);

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
            Handpicked Selection
          </span>
          <h2 className="font-heading text-3xl md:text-4xl text-erode-black mt-2">
            Featured Products
          </h2>
          <p className="text-erode-black/50 text-sm mt-2 max-w-lg mx-auto">
            Premium air rifles and pistols chosen for their exceptional quality and performance
          </p>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product, index) => (
            <motion.div
              key={product.id}
              className="border border-gray-100 rounded-xl overflow-hidden group hover:shadow-lg hover:border-erode-green/20 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                y: -4,
              }}
            >
              {/* Image with fixed container */}
              <div className="relative overflow-hidden bg-gray-50">
                <div className="w-full h-48 sm:h-56 flex items-center justify-center p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-w-full max-h-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
                    onError={handleImageError}
                  />
                </div>
                <span className="absolute top-3 left-3 bg-erode-green text-erode-black text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full z-10">
                  Featured
                </span>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 ease-out" />
              </div>

              {/* Content */}
              <div className="p-5 space-y-3">
                <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-erode-black/50 border border-erode-black/10 rounded-full px-2.5 py-0.5">
                  {product.category}
                </span>
                <h3 className="font-semibold text-lg text-erode-black line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-sm text-erode-black/50 line-clamp-2 leading-relaxed">
                  {product.shortDescription}
                </p>
                <div className="flex items-baseline gap-2">
                  <p className="font-bold text-erode-black text-xl">
                    ₹{product.price.toLocaleString("en-IN")}
                  </p>
                  {product.originalPrice && (
                    <p className="text-sm text-erode-black/40 line-through">
                      ₹{product.originalPrice.toLocaleString("en-IN")}
                    </p>
                  )}
                </div>
                <button
                  onClick={() =>
                    navigate("/products/" + product.slug, {
                      slug: product.slug,
                    })
                  }
                  className="w-full flex items-center justify-center gap-2 border-2 border-erode-black text-erode-black font-semibold py-2.5 rounded-lg hover:bg-erode-black hover:text-white transition-colors cursor-pointer group/btn"
                >
                  View Details
                  <ArrowRight size={16} className="transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={() => navigate("/shop")}
            className="inline-flex items-center gap-2 bg-erode-green text-erode-black font-semibold px-8 py-3 rounded-lg hover:bg-erode-green/90 transition-colors cursor-pointer"
          >
            View All Products
            <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
