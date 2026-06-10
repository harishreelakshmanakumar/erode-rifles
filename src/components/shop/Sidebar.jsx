"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { categories } from "@/data/mockData";

export default function Sidebar({
  searchText,
  setSearchText,
  selectedCategories,
  setSelectedCategories,
  priceMin,
  setPriceMin,
  priceMax,
  setPriceMax,
  inStockOnly,
  setInStockOnly,
  onClearFilters,
}) {
  const handleCategoryToggle = (categoryName) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((c) => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  return (
    <aside className="w-[280px] shrink-0 hidden lg:block">
      <div className="sticky top-4 flex flex-col gap-6">
        {/* Search */}
        <div>
          <h3 className="font-semibold text-erode-black mb-2">Search</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full border border-gray-200 rounded pl-9 pr-3 py-2 text-sm focus:border-erode-black focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-semibold text-erode-black mb-2">Categories</h3>
          <div className="flex flex-col gap-2">
            {categories.map((cat) => (
              <label
                key={cat.id}
                className="flex items-center gap-2 cursor-pointer text-sm text-erode-black hover:text-erode-green transition-colors"
              >
                <Checkbox
                  checked={selectedCategories.includes(cat.name)}
                  onCheckedChange={() => handleCategoryToggle(cat.name)}
                  className="data-[state=checked]:bg-erode-green data-[state=checked]:border-erode-green data-[state=checked]:text-erode-black"
                />
                <span>{cat.name}</span>
                <span className="text-gray-400 text-xs ml-auto">
                  ({cat.count})
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="font-semibold text-erode-black mb-2">Price Range</h3>
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min"
              min={0}
              max={70000}
              value={priceMin || ""}
              onChange={(e) =>
                setPriceMin(e.target.value ? Number(e.target.value) : 0)
              }
              className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm focus:border-erode-black focus:outline-none transition-colors"
            />
            <span className="text-gray-400 text-sm">—</span>
            <input
              type="number"
              placeholder="Max"
              min={0}
              max={70000}
              value={priceMax || ""}
              onChange={(e) =>
                setPriceMax(e.target.value ? Number(e.target.value) : 70000)
              }
              className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm focus:border-erode-black focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* In Stock Toggle */}
        <div>
          <label className="flex items-center justify-between cursor-pointer">
            <span className="font-semibold text-erode-black text-sm">
              In Stock Only
            </span>
            <Switch
              checked={inStockOnly}
              onCheckedChange={setInStockOnly}
              className="data-[state=checked]:bg-erode-green"
            />
          </label>
        </div>

        {/* Clear Filters */}
        <button
          onClick={onClearFilters}
          className="border border-erode-black text-erode-black text-sm font-medium py-2 px-4 rounded hover:bg-erode-black hover:text-white transition-colors"
        >
          Clear Filters
        </button>
      </div>
    </aside>
  );
}
