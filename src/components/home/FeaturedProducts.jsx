"use client";

import { useRouter } from "@/context/RouterContext";
import { products } from "@/data/mockData";

export default function FeaturedProducts() {
  const { navigate } = useRouter();
  const featured = products.filter((p) => p.isFeatured === true);

  return (
    <section className="bg-white py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <span className="text-erode-green font-semibold text-sm uppercase tracking-wider">
            Handpicked Selection
          </span>
          <h2 className="font-heading text-4xl text-erode-black mt-2">
            Featured Products
          </h2>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product) => (
            <div
              key={product.id}
              className="border border-gray-200 rounded-lg overflow-hidden hover:border-erode-black/30 transition-colors"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full aspect-[4/3] object-cover rounded-t-lg"
                />
                <span className="absolute top-3 left-3 bg-erode-green text-erode-black text-xs font-bold px-3 py-1 rounded-full">
                  Featured
                </span>
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
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate("/shop")}
            className="border-2 border-erode-black text-erode-black font-semibold px-10 py-3 rounded-lg hover:bg-erode-black hover:text-white transition-colors cursor-pointer"
          >
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
}
