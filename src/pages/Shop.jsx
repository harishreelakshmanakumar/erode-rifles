"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useRouter } from "@/context/RouterContext";
import { products } from "@/data/mockData";
import ProductCard from "@/components/shop/ProductCard";
import Sidebar from "@/components/shop/Sidebar";
import SortBar from "@/components/shop/SortBar";
import FilterDrawer from "@/components/shop/FilterDrawer";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PRODUCTS_PER_PAGE = 9;

export default function Shop() {
  const { params } = useRouter();

  const [searchText, setSearchTextRaw] = useState("");
  const [selectedCategories, setSelectedCategoriesRaw] = useState([]);
  const [priceMin, setPriceMinRaw] = useState(0);
  const [priceMax, setPriceMaxRaw] = useState(70000);
  const [inStockOnly, setInStockOnlyRaw] = useState(false);
  const [sortOrder, setSortOrderRaw] = useState("relevance");
  const [currentPage, setCurrentPage] = useState(1);
  const [initialized, setInitialized] = useState(false);

  // Initialize category from router params (only once)
  if (!initialized && params) {
    if (params.category) {
      setSelectedCategoriesRaw([params.category]);
    }
    if (params.search) {
      setSearchTextRaw(params.search);
    }
    setInitialized(true);
  }

  // Wrapper setters that also reset page
  const setSearchText = useCallback((val) => {
    setSearchTextRaw(val);
    setCurrentPage(1);
  }, []);

  const setSelectedCategories = useCallback((val) => {
    setSelectedCategoriesRaw(val);
    setCurrentPage(1);
  }, []);

  const setPriceMin = useCallback((val) => {
    setPriceMinRaw(val);
    setCurrentPage(1);
  }, []);

  const setPriceMax = useCallback((val) => {
    setPriceMaxRaw(val);
    setCurrentPage(1);
  }, []);

  const setInStockOnly = useCallback((val) => {
    setInStockOnlyRaw(val);
    setCurrentPage(1);
  }, []);

  const setSortOrder = useCallback((val) => {
    setSortOrderRaw(val);
    setCurrentPage(1);
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by search text
    if (searchText.trim()) {
      const search = searchText.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(search) ||
          p.category.toLowerCase().includes(search) ||
          p.description?.toLowerCase().includes(search)
      );
    }

    // Filter by categories (using category names)
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    // Filter by price range
    result = result.filter(
      (p) => p.price >= priceMin && p.price <= priceMax
    );

    // Filter by stock
    if (inStockOnly) {
      result = result.filter((p) => p.stock > 0);
    }

    // Sort
    switch (sortOrder) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-az":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "popularity":
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
      case "newest":
        result.sort((a, b) => b.id - a.id);
        break;
      case "relevance":
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return result;
  }, [
    searchText,
    selectedCategories,
    priceMin,
    priceMax,
    inStockOnly,
    sortOrder,
  ]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const clearFilters = () => {
    setSearchTextRaw("");
    setSelectedCategoriesRaw([]);
    setPriceMinRaw(0);
    setPriceMaxRaw(70000);
    setInStockOnlyRaw(false);
    setSortOrderRaw("relevance");
    setCurrentPage(1);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <h1 className="font-heading text-3xl sm:text-4xl text-erode-black">Shop</h1>
          <p className="text-sm text-erode-black/50 mt-1">
            Browse our collection of premium air rifles, pistols, pellets, and accessories
          </p>
          {selectedCategories.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <span className="text-xs text-erode-black/50">Filtered by:</span>
              {selectedCategories.map((cat) => (
                <span key={cat} className="inline-flex items-center gap-1 bg-erode-green/10 text-erode-black text-xs font-medium px-3 py-1 rounded-full">
                  {cat}
                  <button
                    onClick={() => setSelectedCategories(selectedCategories.filter(c => c !== cat))}
                    className="hover:text-red-500 ml-1 cursor-pointer"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <Sidebar
            searchText={searchText}
            setSearchText={setSearchText}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            priceMin={priceMin}
            setPriceMin={setPriceMin}
            priceMax={priceMax}
            setPriceMax={setPriceMax}
            inStockOnly={inStockOnly}
            setInStockOnly={setInStockOnly}
            onClearFilters={clearFilters}
          />

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Mobile Filter Button + Sort */}
            <div className="flex items-center justify-between mb-4">
              <FilterDrawer
                searchText={searchText}
                setSearchText={setSearchText}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                priceMin={priceMin}
                setPriceMin={setPriceMin}
                priceMax={priceMax}
                setPriceMax={setPriceMax}
                inStockOnly={inStockOnly}
                setInStockOnly={setInStockOnly}
                onClearFilters={clearFilters}
              />

              <div className="lg:hidden flex-1">
                <SortBar
                  productCount={filteredProducts.length}
                  sortOrder={sortOrder}
                  setSortOrder={setSortOrder}
                />
              </div>
            </div>

            {/* Desktop SortBar */}
            <div className="hidden lg:block border-b border-gray-100 mb-6">
              <SortBar
                productCount={filteredProducts.length}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
              />
            </div>

            {/* Active Filters Display */}
            {(selectedCategories.length > 0 ||
              inStockOnly ||
              searchText ||
              priceMin > 0 ||
              priceMax < 70000) && (
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-sm text-erode-black/50">Active filters:</span>
                {selectedCategories.map((cat) => (
                  <span
                    key={cat}
                    className="inline-flex items-center gap-1 bg-gray-100 text-erode-black text-xs px-2 py-1 rounded-full"
                  >
                    {cat}
                    <button
                      onClick={() =>
                        setSelectedCategories((prev) =>
                          prev.filter((c) => c !== cat)
                        )
                      }
                      className="hover:text-red-500 cursor-pointer"
                    >
                      ×
                    </button>
                  </span>
                ))}
                {searchText && (
                  <span className="inline-flex items-center gap-1 bg-gray-100 text-erode-black text-xs px-2 py-1 rounded-full">
                    &quot;{searchText}&quot;
                    <button
                      onClick={() => setSearchText("")}
                      className="hover:text-red-500 cursor-pointer"
                    >
                      ×
                    </button>
                  </span>
                )}
                {inStockOnly && (
                  <span className="inline-flex items-center gap-1 bg-gray-100 text-erode-black text-xs px-2 py-1 rounded-full">
                    In Stock
                    <button
                      onClick={() => setInStockOnly(false)}
                      className="hover:text-red-500 cursor-pointer"
                    >
                      ×
                    </button>
                  </span>
                )}
                <button
                  onClick={clearFilters}
                  className="text-xs text-erode-green font-semibold hover:underline cursor-pointer"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Product Grid */}
            {paginatedProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-8">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(1, prev - 1))
                      }
                      disabled={currentPage === 1}
                      className="flex items-center gap-1 border border-gray-200 rounded-lg px-3 py-2 text-sm text-erode-black hover:border-erode-green transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Prev
                    </button>

                    {getPageNumbers().map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                          currentPage === page
                            ? "bg-erode-green text-erode-black"
                            : "border border-gray-200 text-erode-black hover:border-erode-green"
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="flex items-center gap-1 border border-gray-200 rounded-lg px-3 py-2 text-sm text-erode-black hover:border-erode-green transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Showing count */}
                <p className="text-center text-sm text-erode-black/40 mt-4">
                  Showing{" "}
                  {(currentPage - 1) * PRODUCTS_PER_PAGE + 1}–
                  {Math.min(
                    currentPage * PRODUCTS_PER_PAGE,
                    filteredProducts.length
                  )}{" "}
                  of {filteredProducts.length} products
                </p>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-16">
                <p className="text-lg text-erode-black font-semibold mb-2">
                  No products found
                </p>
                <p className="text-sm text-erode-black/50 mb-4">
                  Try adjusting your filters or search terms
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-erode-green text-erode-black font-semibold text-sm py-2 px-6 rounded-lg hover:bg-erode-green/90 transition-colors cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
