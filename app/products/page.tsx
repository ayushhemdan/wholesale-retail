'use client';

import { useState, useEffect, useMemo } from 'react';
import ProductCard from '@/components/ProductCard';
import ProductFilters, { FilterOptions } from '@/components/ProductFilters';

interface Product {
  _id?: string;
  name: string;
  price: number;
  image: string;
  availability: 'in-stock' | 'out-of-stock' | 'limited';
  category?: string;
  description?: string;
  createdAt?: string;
}

const categoryLabels: Record<string, string> = {
  'biscuits-snacks': 'Biscuits & Snacks',
  'rice-pulses': 'Rice & Pulses',
  'cooking-oil': 'Cooking Oil',
  'spices': 'Spices & Masala',
  'namkeen': 'Namkeen',
  'soap-shampoo': 'Soap & Shampoo',
  'detergents': 'Detergents',
  'household': 'Household Items',
  'general': 'General',
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    category: 'all',
    availability: 'all',
    priceRange: 'all',
    sortBy: 'newest',
  });
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [products, filters]);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...products];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description?.toLowerCase().includes(searchLower)
      );
    }

    // Category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter((product) => product.category === filters.category);
    }

    // Availability filter
    if (filters.availability !== 'all') {
      filtered = filtered.filter((product) => product.availability === filters.availability);
    }

    // Price range filter
    if (filters.priceRange !== 'all') {
      filtered = filtered.filter((product) => {
        switch (filters.priceRange) {
          case 'under-50':
            return product.price < 500;
          case '50-100':
            return product.price >= 500 && product.price <= 1000;
          case '100-500':
            return product.price > 1000 && product.price <= 5000;
          case 'over-500':
            return product.price > 5000;
          default:
            return true;
        }
      });
    }

    // Sort
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'newest':
        default:
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
      }
    });

    setFilteredProducts(filtered);
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    setSelectedCategory(newFilters.category);
  };

  // Get unique categories from products
  const categories = useMemo(() => {
    const cats = new Set<string>();
    products.forEach((p) => {
      if (p.category) cats.add(p.category);
    });
    return Array.from(cats).sort();
  }, [products]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
            Our Products
          </h1>
          <div className="w-32 h-2 bg-gradient-to-r from-primary-600 to-pink-600 mx-auto mb-4 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse our complete collection of groceries and household essentials. From biscuits and snacks to rice, dal, spices, soaps, and detergents - we have everything you need!
          </p>
        </div>

        {/* Category Quick Filters */}
        {categories.length > 0 && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  handleFilterChange({ ...filters, category: 'all' });
                }}
                className={`px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-105 ${
                  selectedCategory === 'all'
                    ? 'bg-gradient-to-r from-primary-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                }`}
              >
                All Products
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    handleFilterChange({ ...filters, category: cat });
                  }}
                  className={`px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-105 ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-primary-600 to-purple-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                  }`}
                >
                  {categoryLabels[cat] || cat}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Filters */}
        <ProductFilters onFilterChange={handleFilterChange} showSearch={true} />

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <div className="text-gray-600">
            Showing <span className="font-bold text-primary-600">{filteredProducts.length}</span> of{' '}
            <span className="font-bold">{products.length}</span> products
          </div>
          {filteredProducts.length > 0 && (
            <div className="text-sm text-gray-500">
              {selectedCategory !== 'all' && (
                <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full">
                  {categoryLabels[selectedCategory] || selectedCategory}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Products Yet</h2>
            <p className="text-gray-600 mb-6">
              Products will appear here once they are added through the admin panel.
            </p>
            <a
              href="/admin"
              className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Go to Admin Panel
            </a>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Products Found</h2>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters to see more products.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                handleFilterChange({
                  search: '',
                  category: 'all',
                  availability: 'all',
                  priceRange: 'all',
                  sortBy: 'newest',
                });
              }}
              className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product._id} className="animate-slide-up">
                <ProductCard
                  id={product._id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  availability={product.availability}
                  category={product.category}
                  description={product.description}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
