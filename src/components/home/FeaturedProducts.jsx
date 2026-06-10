"use client";

import { useRouter } from "@/context/RouterContext";
import { products } from "@/data/mockData";
import { handleImageError } from "@/lib/imageFallback";
import { motion } from "framer-motion";

export default function FeaturedProducts() {
  const { navigate } = useRouter();
  const featured = products.filter((p) => p.isFeatured === true);

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
            Handpicked Selection
          </span>
          <h2 className="font-heading text-4xl text-erode-black mt-2">
            Featured Products
          </h2>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product, index) => (
            <motion.div
              key={product.id}
              className="border border-gray-200 rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                y: -8,
                boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)",
              }}
            >
              {/* Image with hover overlay */}
              <div className="relative group overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full aspect-[4/3] object-cover rounded-t-lg transition-transform duration-500 ease-out group-hover:scale-105"
                  onError={handleImageError}
                />
                <span className="absolute top-3 left-3 bg-erode-green text-erode-black text-xs font-bold px-3 py-1 rounded-full z-10">
                  Featured
                </span>

                {/* Hover overlay with "View Details" — CSS only for performance */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 ease-out flex items-center justify-center">
                  <span className="text-white font-semibold text-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-out bg-white/20 backdrop-blur-sm px-6 py-2.5 rounded-lg border border-white/30">
                    View Details
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                <span className="inline-block text-xs border border-erode-black/20 text-erode-black/70 px-2.5 py-0.5 rounded">
                  {product.category}
                </span>
                <h3 className="font-semibold text-lg text-erode-black">
                  {product.name}
                </h3>
                <p className="font-bold text-erode-black text-xl">
                  ₹{product.price.toLocaleString("en-IN")}
                </p>
                <button
                  onClick={() =>
                    navigate("/products/" + product.slug, {
                      slug: product.slug,
                    })
                  }
                  className="w-full border-2 border-erode-black text-erode-black font-semibold py-2.5 rounded-lg hover:bg-erode-black hover:text-white transition-colors cursor-pointer"
                >
                  View Details
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
            className="border-2 border-erode-black text-erode-black font-semibold px-10 py-3 rounded-lg hover:bg-erode-black hover:text-white transition-colors cursor-pointer"
          >
            View All Products
          </button>
        </motion.div>
      </div>
    </section>
  );
}
