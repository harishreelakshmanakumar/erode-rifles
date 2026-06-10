"use client";

import { products } from "@/data/mockData";
import ProductCard from "@/components/shop/ProductCard";

export default function RelatedProducts({ currentProductId, category }) {
  const related = products
    .filter((p) => p.category === category && p.id !== currentProductId)
    .slice(0, 4);

  if (related.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="font-heading text-2xl text-erode-black mb-4">
        You May Also Like
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {related.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
