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
import { motion } from "framer-motion";

export default function ProductDetail() {
  const { path, navigate } = useRouter();

  const product = useMemo(() => {
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
          className="flex items-center gap-2 border border-erode-black text-erode-black font-medium text-sm py-2 px-4 rounded hover:bg-erode-black hover:text-white transition-colors cursor-pointer"
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
      <div className="border-b border-gray-100 bg-white/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <button
            onClick={() => navigate("/shop")}
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-3.5 py-2 text-sm font-medium text-erode-black hover:border-erode-green hover:text-erode-green transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-8 lg:py-12">
        {/* Product Top Section */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-[minmax(320px,440px)_1fr] gap-6 lg:gap-12 items-start"
        >
          {/* Left: Image — constrained to match product card width for visual consistency */}
          <div className="w-full max-w-[420px] mx-auto lg:mx-0 lg:sticky lg:top-28">
            <ImageGallery images={product.images || [product.image]} />
          </div>

          {/* Right: Product Info — takes remaining space */}
          <div className="w-full lg:flex-1 min-w-0">
            <ProductInfo product={product} />
          </div>
        </motion.div>

        {/* Specs Table */}
        {product.specifications && (
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4 }}
            className="mt-10 sm:mt-14"
          >
            <SpecsTable specifications={product.specifications} />
          </motion.section>
        )}

        {/* Related Products */}
        <section className="mt-10 sm:mt-14">
          <RelatedProducts
            currentProductId={product.id}
            category={product.category}
          />
        </section>

        {/* Reviews */}
        <section className="mt-10 sm:mt-14">
          <ReviewsList />
        </section>
      </main>
    </div>
  );
}
