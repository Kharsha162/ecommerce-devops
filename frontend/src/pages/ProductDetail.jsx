import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import Button from '../components/Button.jsx';
import Input from '../components/Input.jsx';
import { FiArrowLeft, FiShoppingCart } from 'react-icons/fi';

/**
 * Product Detail Page
 */
const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, logout } = useAuth();
  const { currentProduct, loading, fetchProductById, addReview } = useProducts();
  const { add } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [reviewData, setReviewData] = useState({
    rating: 5,
    comment: '',
  });
  const [reviewLoading, setReviewLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (id) {
      fetchProductById(id);
    }
  }, [id]);

  const handleAddToCart = () => {
    if (!currentProduct) return;

    for (let i = 0; i < quantity; i++) {
      add({
        id: currentProduct._id,
        title: currentProduct.title,
        price: currentProduct.price,
        image: currentProduct.image,
        stock: currentProduct.stock,
      });
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    setReviewLoading(true);
    try {
      await addReview(id, reviewData);
      setReviewData({ rating: 5, comment: '' });
    } finally {
      setReviewLoading(false);
    }
  };

  if (loading || !currentProduct) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar user={user} cartCount={0} onLogout={logout} />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar
        user={user}
        cartCount={0}
        onLogout={logout}
        onMenuToggle={() => setMenuOpen(!menuOpen)}
        isMenuOpen={menuOpen}
      />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold"
        >
          <FiArrowLeft /> Back
        </button>
      </div>

      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-lg shadow-lg p-8 mb-12">
          {/* Image */}
          <div className="flex items-center justify-center">
            <img
              src={currentProduct.image}
              alt={currentProduct.title}
              className="max-w-full h-auto rounded-lg"
            />
          </div>

          {/* Details */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {currentProduct.title}
            </h1>

            {/* Category & Rating */}
            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm font-semibold">
                {currentProduct.category}
              </span>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>
                    {i < Math.floor(currentProduct.rating) ? '★' : '☆'}
                  </span>
                ))}
              </div>
              <span className="text-gray-600">
                ({currentProduct.numReviews} reviews)
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-6">{currentProduct.description}</p>

            {/* Price */}
            <div className="mb-6">
              <p className="text-4xl font-bold text-indigo-600">
                ${currentProduct.price}
              </p>
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {currentProduct.stock > 0 ? (
                <p className="text-green-600 font-semibold">
                  ✓ In Stock ({currentProduct.stock} available)
                </p>
              ) : (
                <p className="text-red-600 font-semibold">Out of Stock</p>
              )}
            </div>

            {/* Quantity & Add to Cart */}
            {currentProduct.stock > 0 && (
              <div className="flex gap-4 mb-8">
                <div className="flex items-center border-2 border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-gray-600 hover:text-indigo-600"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={currentProduct.stock}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 text-center border-0 outline-none"
                  />
                  <button
                    onClick={() => setQuantity(Math.min(currentProduct.stock, quantity + 1))}
                    className="px-4 py-2 text-gray-600 hover:text-indigo-600"
                  >
                    +
                  </button>
                </div>
                <Button
                  onClick={handleAddToCart}
                  size="lg"
                  className="flex-1"
                >
                  <FiShoppingCart /> Add to Cart
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Existing Reviews */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Customer Reviews
            </h2>
            {currentProduct.reviews && currentProduct.reviews.length > 0 ? (
              <div className="space-y-4">
                {currentProduct.reviews.map((review, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-semibold text-gray-800">
                        {review.username}
                      </p>
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <span key={i}>
                            {i < review.rating ? '★' : '☆'}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No reviews yet. Be the first!</p>
            )}
          </div>

          {/* Add Review Form */}
          <div className="bg-white p-6 rounded-lg shadow-lg h-fit">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Write a Review
            </h3>
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Rating
                </label>
                <select
                  value={reviewData.rating}
                  onChange={(e) =>
                    setReviewData({
                      ...reviewData,
                      rating: parseInt(e.target.value),
                    })
                  }
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                >
                  {[1, 2, 3, 4, 5].map((r) => (
                    <option key={r} value={r}>
                      {r} Star{r > 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Comment
                </label>
                <textarea
                  placeholder="Share your experience..."
                  value={reviewData.comment}
                  onChange={(e) =>
                    setReviewData({
                      ...reviewData,
                      comment: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 resize-none"
                  rows="4"
                />
              </div>

              <Button
                type="submit"
                loading={reviewLoading}
                disabled={reviewLoading}
                className="w-full"
              >
                Submit Review
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProductDetail;
