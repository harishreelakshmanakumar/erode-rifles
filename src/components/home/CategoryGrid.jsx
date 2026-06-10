"use client";

import { useRouter } from "@/context/RouterContext";
import { categories } from "@/data/mockData";
import { ArrowRight } from "lucide-react";

export default function CategoryGrid() {
  const { navigate } = useRouter();

  return (
    <section className="bg-white py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <span className="text-erode-green font-semibold text-sm uppercase tracking-wider">
            Our Collection
          </span>
          <h2 className="font-heading text-4xl text-erode-black mt-2">
            Product Categories
          </h2>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => navigate("/shop?category=" + category.slug)}
              className="group cursor-pointer border border-gray-200 rounded-lg overflow-hidden hover:scale-[1.02] transition-transform duration-200"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full aspect-square object-cover"
              />
              <div className="p-4 space-y-1">
                <h3 className="font-semibold text-erode-black">
                  {category.name}
                </h3>
                <p className="text-sm text-erode-black/60">
                  {category.count} products
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-erode-black group-hover:text-erode-green transition-colors">
                  Explore <ArrowRight size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
