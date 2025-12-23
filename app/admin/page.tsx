'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import ProductFilters, { FilterOptions } from '@/components/ProductFilters';
import AdminLogin from '@/components/AdminLogin';
import { useToast } from '@/contexts/ToastContext';
import ConfirmDialog from '@/components/ConfirmDialog';

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

export default function AdminPage() {
  const { showToast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    category: 'all',
    availability: 'all',
    priceRange: 'all',
    sortBy: 'newest',
  });
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    availability: 'in-stock' as 'in-stock' | 'out-of-stock' | 'limited',
    category: 'general' as string,
    description: '',
  });
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    productId: string | null;
    productName: string;
  }>({
    isOpen: false,
    productId: null,
    productName: '',
  });

  useEffect(() => {
    // Check authentication on mount
    const checkAuth = () => {
      const authStatus = localStorage.getItem('admin_authenticated');
      const loginTime = localStorage.getItem('admin_login_time');
      
      // Check if authenticated and session is valid (24 hours)
      if (authStatus === 'true' && loginTime) {
        const timeDiff = Date.now() - parseInt(loginTime);
        const hoursDiff = timeDiff / (1000 * 60 * 60);
        
        if (hoursDiff < 24) {
          setIsAuthenticated(true);
        } else {
          // Session expired
          localStorage.removeItem('admin_authenticated');
          localStorage.removeItem('admin_login_time');
        }
      }
      setCheckingAuth(false);
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      applyFilters();
    }
  }, [products, filters, isAuthenticated]);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated');
    localStorage.removeItem('admin_login_time');
    setIsAuthenticated(false);
    router.push('/');
  };

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
          return 0;
      }
    });

    setFilteredProducts(filtered);
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          category: formData.category || 'general',
        }),
      });

      const data = await res.json();

          if (data.success) {
            setFormData({
              name: '',
              price: '',
              image: '',
              availability: 'in-stock',
              category: 'general',
              description: '',
            });
            fetchProducts();
            showToast('Product added successfully!', 'success');
          } else {
            showToast('Error: ' + data.error, 'error');
          }
        } catch (error) {
          console.error('Error adding product:', error);
          showToast('Error adding product. Please try again.', 'error');
        } finally {
          setSubmitting(false);
        }
  };

  const handleDeleteClick = (id: string, name: string) => {
    setDeleteConfirm({
      isOpen: true,
      productId: id,
      productName: name,
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm.productId) return;

    try {
      const res = await fetch(`/api/products/${deleteConfirm.productId}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (data.success) {
        fetchProducts();
        showToast('Product deleted successfully!', 'success');
      } else {
        showToast('Error: ' + data.error, 'error');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      showToast('Error deleting product. Please try again.', 'error');
    } finally {
      setDeleteConfirm({
        isOpen: false,
        productId: null,
        productName: '',
      });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm({
      isOpen: false,
      productId: null,
      productName: '',
    });
  };

  // Show login if not authenticated
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1"></div>
            <div className="flex-1 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Admin Panel
              </h1>
              <div className="w-24 h-1 bg-primary-600 mx-auto mb-4"></div>
              <p className="text-lg text-gray-600">
                Manage your products. Add new products or delete existing ones.
              </p>
            </div>
            <div className="flex-1 flex justify-end">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold flex items-center gap-2"
                title="Logout"
              >
                <span>🚪</span>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Product Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Product</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter product name"
                  />
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    id="price"
                    required
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL *
                  </label>
                  <input
                    type="url"
                    id="image"
                    required
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Use a direct image URL or Cloudinary link
                  </p>
                </div>

                <div>
                  <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">
                    Availability *
                  </label>
                  <select
                    id="availability"
                    required
                    value={formData.availability}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        availability: e.target.value as 'in-stock' | 'out-of-stock' | 'limited',
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="in-stock">In Stock</option>
                    <option value="limited">Limited Stock</option>
                    <option value="out-of-stock">Out of Stock</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    id="category"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="general">📦 General</option>
                    <option value="biscuits-snacks">🍪 Biscuits & Snacks</option>
                    <option value="rice-pulses">🍚 Rice & Pulses</option>
                    <option value="cooking-oil">🛢️ Cooking Oil</option>
                    <option value="spices">🌶️ Spices & Masala</option>
                    <option value="namkeen">🥨 Namkeen</option>
                    <option value="soap-shampoo">🧴 Soap & Shampoo</option>
                    <option value="detergents">🧼 Detergents</option>
                    <option value="household">🏠 Household Items</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description (Optional)
                  </label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Product description..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Adding...' : 'Add Product'}
                </button>
              </form>
            </div>
          </div>

          {/* Products List */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                All Products ({products.length})
              </h2>
            </div>

            {/* Filters */}
            <ProductFilters onFilterChange={handleFilterChange} showSearch={true} />

            {/* Results Count */}
            <div className="mb-6 text-gray-600">
              Showing <span className="font-bold text-primary-600">{filteredProducts.length}</span> of{' '}
              <span className="font-bold">{products.length}</span> products
            </div>

            {products.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <div className="text-6xl mb-4">📦</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Products Yet</h3>
                <p className="text-gray-600">
                  Add your first product using the form on the left.
                </p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Products Found</h3>
                <p className="text-gray-600">
                  Try adjusting your filters to see more products.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product._id} className="relative">
                    <ProductCard
                      id={product._id}
                      name={product.name}
                      price={product.price}
                      image={product.image}
                      availability={product.availability}
                      category={product.category}
                      description={product.description}
                      showWhatsApp={false}
                    />
                    <button
                      onClick={() => product._id && handleDeleteClick(product._id, product.name)}
                      className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                      title="Delete product"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        title="Delete Product"
        message={`Are you sure you want to delete "${deleteConfirm.productName}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        type="danger"
      />
    </div>
  );
}

