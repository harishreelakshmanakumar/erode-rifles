"use client";

import { ChevronDown } from "lucide-react";

export default function SortBar({ productCount, sortOrder, setSortOrder }) {
  return (
    <div className="flex items-center justify-between py-3 px-1">
      <span className="text-sm text-erode-black">
        Showing <span className="font-semibold">{productCount}</span> products
      </span>
      <div className="flex items-center gap-2">
        <label className="text-sm text-erode-black hidden sm:inline">Sort by:</label>
        <div className="relative">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="appearance-none border border-gray-200 rounded px-3 py-1.5 pr-8 text-sm text-erode-black bg-white focus:border-erode-black focus:outline-none cursor-pointer transition-colors"
          >
            <option value="relevance">Relevance</option>
            <option value="popularity">Popularity</option>
            <option value="newest">Newest</option>
            <option value="price-low">Price Low to High</option>
            <option value="price-high">Price High to Low</option>
            <option value="name-az">Name A-Z</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-erode-black pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
