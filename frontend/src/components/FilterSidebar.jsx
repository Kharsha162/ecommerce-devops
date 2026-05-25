import React from 'react';
import { FiFilter, FiSearch } from 'react-icons/fi';

/**
 * Filter Component
 */
const FilterSidebar = ({
  categories,
  selectedCategory,
  searchQuery,
  onCategoryChange,
  onSearchChange,
  loading,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Search */}
      <div className="mb-6">
        <label className="block font-semibold text-gray-800 mb-3">
          <FiSearch className="inline mr-2" />
          Search Products
        </label>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          disabled={loading}
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 disabled:bg-gray-100"
        />
      </div>

      {/* Categories */}
      <div>
        <label className="block font-semibold text-gray-800 mb-3">
          <FiFilter className="inline mr-2" />
          Categories
        </label>
        <div className="space-y-2">
          <button
            onClick={() => onCategoryChange('')}
            className={`w-full text-left px-4 py-2 rounded-lg transition ${
              selectedCategory === ''
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            All Products
          </button>
          {(categories || []).map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`w-full text-left px-4 py-2 rounded-lg transition ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
