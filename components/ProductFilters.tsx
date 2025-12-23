"use client";

import { useState } from "react";

export interface FilterOptions {
  search: string;
  category: string;
  availability: "all" | "in-stock" | "out-of-stock" | "limited";
  priceRange: "all" | "under-50" | "50-100" | "100-500" | "over-500";
  sortBy: "name" | "price-low" | "price-high" | "newest";
}

interface ProductFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
  showSearch?: boolean;
}

const categoryLabels: Record<string, string> = {
  "biscuits-snacks": "Biscuits & Snacks",
  "rice-pulses": "Rice & Pulses",
  "cooking-oil": "Cooking Oil",
  spices: "Spices & Masala",
  namkeen: "Namkeen",
  "soap-shampoo": "Soap & Shampoo",
  detergents: "Detergents",
  household: "Household Items",
  general: "General",
};

export default function ProductFilters({ onFilterChange, showSearch = true }: ProductFiltersProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    search: "",
    category: "all",
    availability: "all",
    priceRange: "all",
    sortBy: "newest",
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters: FilterOptions = {
      search: "",
      category: "all",
      availability: "all",
      priceRange: "all",
      sortBy: "newest",
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters =
    filters.search || filters.category !== "all" || filters.availability !== "all" || filters.priceRange !== "all";

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
      {/* Search Bar */}
      {showSearch && (
        <div className="mb-6">
          <label className="block text-sm font-bold text-gray-700 mb-2">🔍 Search Products</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Type product name or description..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="w-full px-4 py-3 pl-12 pr-10 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg transition-all shadow-sm hover:shadow-md"
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl">🔍</span>
            {filters.search && (
              <button
                onClick={() => handleFilterChange("search", "")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors text-xl font-bold"
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      )}

      {/* Filter Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-3 text-primary-600 font-bold text-lg hover:text-primary-700 transition-all transform hover:scale-105"
        >
          <span
            className="text-2xl transform transition-transform duration-300"
            style={{ transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)" }}
          >
            ⚙️
          </span>
          <span>Filters & Sort Options</span>
          <span className={`text-lg transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}>▼</span>
        </button>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-all font-semibold text-sm flex items-center gap-2 transform hover:scale-105 shadow-sm"
          >
            <span>🗑️</span>
            <span>Clear All</span>
          </button>
        )}
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="pt-6 border-t-2 border-gray-200 animate-slide-down">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Category Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 flex items-center gap-2">
                <span>📦</span>
                <span>Category</span>
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange("category", e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white shadow-sm hover:shadow-md transition-all font-medium"
              >
                <option value="all">All Categories</option>
                <option value="biscuits-snacks">🍪 Biscuits & Snacks</option>
                <option value="rice-pulses">🍚 Rice & Pulses</option>
                <option value="cooking-oil">🛢️ Cooking Oil</option>
                <option value="spices">🌶️ Spices & Masala</option>
                <option value="namkeen">🥨 Namkeen</option>
                <option value="soap-shampoo">🧴 Soap & Shampoo</option>
                <option value="detergents">🧼 Detergents</option>
                <option value="household">🏠 Household Items</option>
                <option value="general">📦 General</option>
              </select>
            </div>

            {/* Availability Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 flex items-center gap-2">
                <span>✅</span>
                <span>Availability</span>
              </label>
              <select
                value={filters.availability}
                onChange={(e) => handleFilterChange("availability", e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white shadow-sm hover:shadow-md transition-all font-medium"
              >
                <option value="all">All Products</option>
                <option value="in-stock">✅ In Stock</option>
                <option value="limited">⚠️ Limited Stock</option>
                <option value="out-of-stock">❌ Out of Stock</option>
              </select>
            </div>

            {/* Price Range Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 flex items-center gap-2">
                <span>💰</span>
                <span>Price Range</span>
              </label>
              <select
                value={filters.priceRange}
                onChange={(e) => handleFilterChange("priceRange", e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white shadow-sm hover:shadow-md transition-all font-medium"
              >
                <option value="all">All Prices</option>
                <option value="under-50">💵 Under ₹500</option>
                <option value="50-100">💵 ₹500 - ₹1000</option>
                <option value="100-500">💵 ₹1000 - ₹5000</option>
                <option value="over-500">💵 Over ₹5000</option>
              </select>
            </div>

            {/* Sort By */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 flex items-center gap-2">
                <span>🔀</span>
                <span>Sort By</span>
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white shadow-sm hover:shadow-md transition-all font-medium"
              >
                <option value="newest">🆕 Newest First</option>
                <option value="name">🔤 Name (A-Z)</option>
                <option value="price-low">⬆️ Price: Low to High</option>
                <option value="price-high">⬇️ Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-6 pt-6 border-t-2 border-gray-200">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-bold text-gray-700">Active Filters:</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {filters.search && (
              <span className="px-4 py-2 bg-gradient-to-r from-primary-100 to-primary-200 text-primary-800 rounded-full text-sm font-semibold flex items-center gap-2 shadow-sm hover:shadow-md transition-all">
                <span>🔍</span>
                <span>Search: "{filters.search}"</span>
                <button
                  onClick={() => handleFilterChange("search", "")}
                  className="hover:text-red-600 transition-colors font-bold text-lg ml-1"
                  title="Remove filter"
                >
                  ✕
                </button>
              </span>
            )}
            {filters.category !== "all" && (
              <span className="px-4 py-2 bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 rounded-full text-sm font-semibold flex items-center gap-2 shadow-sm hover:shadow-md transition-all">
                <span>📦</span>
                <span>{categoryLabels[filters.category] || filters.category}</span>
                <button
                  onClick={() => handleFilterChange("category", "all")}
                  className="hover:text-red-600 transition-colors font-bold text-lg ml-1"
                  title="Remove filter"
                >
                  ✕
                </button>
              </span>
            )}
            {filters.availability !== "all" && (
              <span className="px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 rounded-full text-sm font-semibold flex items-center gap-2 shadow-sm hover:shadow-md transition-all">
                <span>
                  {filters.availability === "in-stock" ? "✅" : filters.availability === "limited" ? "⚠️" : "❌"}
                </span>
                <span>
                  {filters.availability === "in-stock"
                    ? "In Stock"
                    : filters.availability === "limited"
                    ? "Limited Stock"
                    : "Out of Stock"}
                </span>
                <button
                  onClick={() => handleFilterChange("availability", "all")}
                  className="hover:text-red-600 transition-colors font-bold text-lg ml-1"
                  title="Remove filter"
                >
                  ✕
                </button>
              </span>
            )}
            {filters.priceRange !== "all" && (
              <span className="px-4 py-2 bg-gradient-to-r from-green-100 to-green-200 text-green-800 rounded-full text-sm font-semibold flex items-center gap-2 shadow-sm hover:shadow-md transition-all">
                <span>💰</span>
                <span>
                  {filters.priceRange === "under-50"
                    ? "Under ₹500"
                    : filters.priceRange === "50-100"
                    ? "₹500-₹1000"
                    : filters.priceRange === "100-500"
                    ? "₹1000-₹5000"
                    : "Over ₹5000"}
                </span>
                <button
                  onClick={() => handleFilterChange("priceRange", "all")}
                  className="hover:text-red-600 transition-colors font-bold text-lg ml-1"
                  title="Remove filter"
                >
                  ✕
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
