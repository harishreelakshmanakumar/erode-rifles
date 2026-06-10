"use client";

import { useRouter } from "@/context/RouterContext";

export default function TrainingCTA() {
  const { navigate } = useRouter();

  return (
    <section className="bg-erode-black py-20 px-6">
      <div className="max-w-7xl mx-auto text-center space-y-6">
        <h2 className="font-heading text-4xl md:text-5xl text-white">
          Learn From Professionals
        </h2>
        <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
          Join our shooting training programs conducted by experienced professionals.
          From beginners to advanced shooters, we have the right program for you.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
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
        </div>
      </div>
    </section>
  );
}
