"use client";

import { useRouter } from "@/context/RouterContext";
import { motion } from "framer-motion";

export default function TrainingCTA() {
  const { navigate } = useRouter();

  return (
    <section className="bg-erode-black py-20 px-6">
      <div className="max-w-7xl mx-auto text-center space-y-6">
        <motion.h2
          className="font-heading text-4xl md:text-5xl text-white"
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          Learn From Professionals
        </motion.h2>
        <motion.p
          className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          Join our shooting training programs conducted by experienced professionals.
          From beginners to advanced shooters, we have the right program for you.
        </motion.p>
        <motion.div
          className="flex flex-wrap justify-center gap-4 pt-4"
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <button
            onClick={() => navigate("/training")}
            className="bg-erode-green text-erode-black font-semibold px-8 py-3 rounded-lg hover:bg-erode-green/90 transition-colors cursor-pointer"
          >
            Apply For Training
          </button>
          <button
            onClick={() => navigate("/training")}
            className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-erode-black transition-colors cursor-pointer"
          >
            Learn More
          </button>
        </motion.div>
      </div>
    </section>
  );
}
