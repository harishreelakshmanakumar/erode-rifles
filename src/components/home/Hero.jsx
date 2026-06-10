"use client";

import { useRouter } from "@/context/RouterContext";
import { products } from "@/data/mockData";

export default function Hero() {
  const { navigate } = useRouter();
  const featuredProduct = products[0];

  return (
    <section className="bg-white py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Left Side */}
        <div className="flex-1 space-y-6">
          <span className="inline-block bg-erode-green text-erode-black text-sm font-semibold px-4 py-1.5 rounded-full">
            Premium Shooting Sports
          </span>
          <h1 className="font-heading text-5xl md:text-7xl text-erode-black font-bold leading-tight">
            Precision Air Rifles &amp; Shooting Sports
          </h1>
          <p className="text-erode-black/70 text-lg max-w-xl">
            Your premier destination for premium air rifles, air pistols, pellets, and
            professional shooting training in Erode, Tamil Nadu. Trusted by champions since 2018.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
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
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1 relative flex justify-center">
          <div className="animate-float">
            <img
              src={featuredProduct.image}
              alt={featuredProduct.name}
              className="w-full max-w-lg rounded-2xl object-cover"
            />
          </div>
          <span className="absolute top-4 right-4 md:top-6 md:right-6 bg-erode-green text-erode-black text-sm font-bold px-4 py-1.5 rounded-full">
            Featured
          </span>
        </div>
      </div>
    </section>
  );
}
