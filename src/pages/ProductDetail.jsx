"use client";

import { useMemo } from "react";
import { useRouter } from "@/context/RouterContext";
import { products } from "@/data/mockData";
import ImageGallery from "@/components/product/ImageGallery";
import ProductInfo from "@/components/product/ProductInfo";
import SpecsTable from "@/components/product/SpecsTable";
import RelatedProducts from "@/components/product/RelatedProducts";
import ReviewsList from "@/components/product/ReviewsList";
import { ArrowLeft } from "lucide-react";

export default function ProductDetail() {
  const { path, params, navigate } = useRouter();

  const product = useMemo(() => {
    // Extract slug from path like /products/gare-falcon
    const slug = path.replace("/products/", "");
    return products.find((p) => p.slug === slug);
  }, [path]);

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
        <p className="text-lg text-erode-black font-semibold">
          Product not found
        </p>
        <button
          onClick={() => navigate("/shop")}
          className="flex items-center gap-2 border border-erode-black text-erode-black font-medium text-sm py-2 px-4 rounded hover:bg-erode-black hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate("/shop")}
            className="flex items-center gap-2 text-sm text-erode-black hover:text-erode-green transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Product Top Section */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Image Gallery (60%) */}
          <div className="w-full lg:w-[60%]">
            <ImageGallery images={product.images || [product.image]} />
          </div>

          {/* Right: Product Info (40%) */}
          <div className="w-full lg:w-[40%]">
            <ProductInfo product={product} />
          </div>
        </div>

        {/* Specs Table */}
        {product.specifications && (
          <div className="mt-12">
            <SpecsTable specifications={product.specifications} />
          </div>
        )}

        {/* Related Products */}
        <div className="mt-12">
          <RelatedProducts
            currentProductId={product.id}
            category={product.category}
          />
        </div>

        {/* Reviews */}
        <div className="mt-12">
          <ReviewsList />
        </div>
      </div>
    </div>
  );
}
