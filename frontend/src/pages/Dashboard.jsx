import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import ProductCard from '../components/ProductCard.jsx';
import FilterSidebar from '../components/FilterSidebar.jsx';
import { ProductSkeleton } from '../components/Skeleton.jsx';

/**
 * User Dashboard / Shop Page
 */
const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { products, categories, loading, fetchProducts, fetchCategories } = useProducts();
  const { itemCount, add } = useCart();

  const [menuOpen, setMenuOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    page: 1,
    limit: 12,
  });

  useEffect(() => {
    fetchProducts(filters);
  }, [filters]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryChange = (category) => {
    setFilters((prev) => ({
      ...prev,
      category,
      page: 1,
    }));
  };

  const handleSearchChange = (search) => {
    setFilters((prev) => ({
      ...prev,
      search,
      page: 1,
    }));
  };

  const handleAddToCart = (product) => {
    add({
      id: product._id,
      title: product.title,
      price: product.price,
      image: product.image,
      stock: product.stock,
    });
  };

  const handleViewDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar
        user={user}
        cartCount={itemCount}
        onLogout={handleLogout}
        onMenuToggle={() => setMenuOpen(!menuOpen)}
        isMenuOpen={menuOpen}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to eCommerce
          </h1>
          <p className="text-lg text-indigo-100">
            Discover amazing products at unbeatable prices
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <FilterSidebar
              categories={categories}
              selectedCategory={filters.category}
              searchQuery={filters.search}
              onCategoryChange={handleCategoryChange}
              onSearchChange={handleSearchChange}
              loading={loading}
            />
          </div>

          {/* Products Grid */}
          <div className="md:col-span-3">
            {/* Results Count */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {filters.search ? `Search Results for "${filters.search}"` : 'All Products'}
              </h2>
              {filters.category && (
                <p className="text-gray-600">Category: {filters.category}</p>
              )}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                <ProductSkeleton count={12} />
              ) : products.length > 0 ? (
                products.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onViewDetails={handleViewDetails}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-600 text-lg">No products found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;
