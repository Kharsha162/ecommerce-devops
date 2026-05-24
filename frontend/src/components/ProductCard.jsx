import React from 'react';

/**
 * Product Card Component
 */
const ProductCard = ({ product, onAddToCart, onViewDetails, onWishlist }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group">
      {/* Product Image */}
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800 truncate mb-2">
          {product.title}
        </h3>

        {/* Category */}
        <p className="text-sm text-indigo-600 mb-3 font-medium">
          {product.category}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <span key={i}>
                {i < Math.floor(product.rating) ? '★' : '☆'}
              </span>
            ))}
          </div>
          <span className="text-sm text-gray-600">
            ({product.numReviews})
          </span>
        </div>

        {/* Price */}
        <p className="text-2xl font-bold text-indigo-600 mb-4">
          ${product.price}
        </p>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onAddToCart(product)}
            disabled={product.stock === 0}
            className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            Add to Cart
          </button>
          <button
            onClick={() => onViewDetails(product._id)}
            className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition font-semibold"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
