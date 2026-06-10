"use client";

import { useRouter } from "@/context/RouterContext";
import { heroImage } from "@/data/mockData";
import { handleImageError } from "@/lib/imageFallback";
import { motion } from "framer-motion";

export default function Hero() {
  const { navigate } = useRouter();

  return (
    <section className="bg-white py-20 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Left Side */}
        <div className="flex-1 space-y-6">
          <motion.span
            className="inline-block bg-erode-green text-erode-black text-sm font-semibold px-4 py-1.5 rounded-full"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
          >
            Premium Shooting Sports
          </motion.span>
          <motion.h1
            className="font-heading text-5xl md:text-7xl text-erode-black font-bold leading-tight"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            Precision Air Rifles &amp; Shooting Sports
          </motion.h1>
          <motion.p
            className="text-erode-black/70 text-lg max-w-xl"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Your premier destination for premium air rifles, air pistols, pellets, and
            professional shooting training in Erode, Tamil Nadu. Trusted by champions since 2018.
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-4 pt-2"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            <button
              onClick={() => navigate("/shop")}
              className="bg-erode-green text-erode-black font-semibold px-8 py-3 rounded-lg hover:bg-erode-green/90 transition-colors cursor-pointer"
            >
              Shop Now
            </button>
            <button
              onClick={() => navigate("/shop")}
              className="border-2 border-erode-black text-erode-black font-semibold px-8 py-3 rounded-lg hover:bg-erode-black hover:text-white transition-colors cursor-pointer"
            >
              Explore Collection
            </button>
          </motion.div>
        </div>

        {/* Right Side — Hero banner image with premium treatment */}
        <div className="flex-1 relative flex justify-center">
          {/* Decorative background accent */}
          <motion.div
            className="absolute inset-0 bg-erode-green/5 rounded-3xl -rotate-3 scale-95"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 0.95 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />

          <motion.div
            className="relative w-full max-w-lg"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Premium framed image container */}
            <motion.div
              className="relative rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25),0_0_0_1px_rgba(0,0,0,0.05)]"
              initial={{ opacity: 0, x: 30, rotateY: -5 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{ perspective: "1200px" }}
            >
              <motion.img
                src={heroImage}
                alt="Erode Rifles — Premium Shooting Sports"
                className="w-full object-cover rounded-2xl"
                onError={handleImageError}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />

              {/* Subtle inner border highlight */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/20 pointer-events-none" />
            </motion.div>
          </motion.div>

          <motion.span
            className="absolute top-4 right-4 md:top-6 md:right-6 bg-erode-green text-erode-black text-sm font-bold px-4 py-1.5 rounded-full shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Featured
          </motion.span>
        </div>
      </div>
    </section>
  );
}
