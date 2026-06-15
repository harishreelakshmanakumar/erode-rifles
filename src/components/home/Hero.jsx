"use client";

import { useRouter } from "@/context/RouterContext";
import { heroImage } from "@/data/mockData";
import { handleImageError } from "@/lib/imageFallback";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Award, Users } from "lucide-react";

export default function Hero() {
  const { navigate } = useRouter();

  return (
    <section className="bg-white py-12 md:py-20 lg:py-24 px-4 md:px-8 lg:px-24 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16">
        {/* Left Side */}
        <div className="flex-1 space-y-6 text-center md:text-left">
          {/* Brand name - Most prominent */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
          >
            <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-erode-black leading-none tracking-wider">
              ERODE
              <span className="block text-erode-green">RIFLES</span>
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="text-erode-black/60 text-base sm:text-lg md:text-xl max-w-xl mx-auto md:mx-0 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Your premier destination for premium air rifles, air pistols, pellets, and
            professional shooting training in Erode, Tamil Nadu.
          </motion.p>

          {/* Trust indicators */}
          <motion.div
            className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-erode-black/60"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <span className="flex items-center gap-1.5">
              <Shield size={16} className="text-erode-green" />
              Genuine Products
            </span>
            <span className="flex items-center gap-1.5">
              <Award size={16} className="text-erode-green" />
              Expert Guidance
            </span>
            <span className="flex items-center gap-1.5">
              <Users size={16} className="text-erode-green" />
              Trusted by Shooters
            </span>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <button
              onClick={() => navigate("/shop")}
              className="inline-flex items-center gap-2 bg-erode-green text-erode-black font-bold px-8 py-3.5 rounded-lg hover:bg-erode-green/90 transition-colors cursor-pointer text-sm sm:text-base"
            >
              Shop Now
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => navigate("/training")}
              className="inline-flex items-center gap-2 border-2 border-erode-black text-erode-black font-bold px-8 py-3.5 rounded-lg hover:bg-erode-black hover:text-white transition-colors cursor-pointer text-sm sm:text-base"
            >
              Training Programs
            </button>
          </motion.div>
        </div>

        {/* Right Side — Hero image */}
        <div className="flex-1 relative flex justify-center w-full">
          <motion.div
            className="relative w-full max-w-lg"
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Premium framed image container */}
            <motion.div
              className="relative rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2),0_0_0_1px_rgba(0,0,0,0.05)]"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <img
                src={heroImage}
                alt="Erode Rifles — Premium Shooting Sports"
                className="w-full object-cover rounded-2xl"
                onError={handleImageError}
              />

              {/* Subtle inner border */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/20 pointer-events-none" />
            </motion.div>
          </motion.div>

          {/* Decorative accent */}
          <motion.div
            className="absolute inset-0 bg-erode-green/5 rounded-3xl -rotate-3 scale-95 -z-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 0.95 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </div>
      </div>
    </section>
  );
}
