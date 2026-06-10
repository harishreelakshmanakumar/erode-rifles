"use client";

import { useState } from "react";
import { SlidersHorizontal, Search } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { categories } from "@/data/mockData";

export default function FilterDrawer({
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
  const [open, setOpen] = useState(false);

  // Local state for drawer editing
  const [localSearch, setLocalSearch] = useState(searchText);
  const [localCategories, setLocalCategories] = useState(selectedCategories);
  const [localPriceMin, setLocalPriceMin] = useState(priceMin);
  const [localPriceMax, setLocalPriceMax] = useState(priceMax);
  const [localInStock, setLocalInStock] = useState(inStockOnly);

  const handleOpenChange = (isOpen) => {
    setOpen(isOpen);
    if (isOpen) {
      setLocalSearch(searchText);
      setLocalCategories([...selectedCategories]);
      setLocalPriceMin(priceMin);
      setLocalPriceMax(priceMax);
      setLocalInStock(inStockOnly);
    }
  };

  const handleCategoryToggle = (categoryName) => {
    setLocalCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((c) => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  const applyFilters = () => {
    setSearchText(localSearch);
    setSelectedCategories(localCategories);
    setPriceMin(localPriceMin);
    setPriceMax(localPriceMax);
    setInStockOnly(localInStock);
    setOpen(false);
  };

  const clearAll = () => {
    setLocalSearch("");
    setLocalCategories([]);
    setLocalPriceMin(0);
    setLocalPriceMax(70000);
    setLocalInStock(false);
    onClearFilters();
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <button className="lg:hidden flex items-center gap-2 border border-erode-black text-erode-black font-medium text-sm py-2 px-4 rounded hover:bg-erode-black hover:text-white transition-colors">
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </button>
      </SheetTrigger>
      <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="font-heading text-2xl text-erode-black">
            Filters
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-6 px-4 pb-4">
          {/* Search */}
          <div>
            <h3 className="font-semibold text-erode-black mb-2">Search</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
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
                  className="flex items-center gap-2 cursor-pointer text-sm text-erode-black"
                >
                  <Checkbox
                    checked={localCategories.includes(cat.name)}
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
                value={localPriceMin || ""}
                onChange={(e) =>
                  setLocalPriceMin(e.target.value ? Number(e.target.value) : 0)
                }
                className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm focus:border-erode-black focus:outline-none transition-colors"
              />
              <span className="text-gray-400 text-sm">—</span>
              <input
                type="number"
                placeholder="Max"
                min={0}
                max={70000}
                value={localPriceMax || ""}
                onChange={(e) =>
                  setLocalPriceMax(
                    e.target.value ? Number(e.target.value) : 70000
                  )
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
                checked={localInStock}
                onCheckedChange={setLocalInStock}
                className="data-[state=checked]:bg-erode-green"
              />
            </label>
          </div>
        </div>

        <SheetFooter className="flex-row gap-2 border-t pt-4">
          <button
            onClick={applyFilters}
            className="flex-1 bg-erode-green text-erode-black font-medium text-sm py-2.5 rounded hover:opacity-90 transition-opacity"
          >
            Apply Filters
          </button>
          <button
            onClick={clearAll}
            className="flex-1 border border-erode-black text-erode-black font-medium text-sm py-2.5 rounded hover:bg-erode-black hover:text-white transition-colors"
          >
            Clear
          </button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
