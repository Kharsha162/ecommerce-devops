import React from 'react';
import { FiShoppingCart, FiHeart, FiLogOut, FiUser, FiMenu, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';

/**
 * Navbar Component
 */
const Navbar = ({ user, cartCount, onLogout, onMenuToggle, isMenuOpen }) => {
  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to={user?.role === 'admin' ? '/admin' : '/dashboard'} className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              EC
            </div>
            <span className="hidden sm:inline font-bold text-xl text-gray-800">
              eCommerce
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {user?.role === 'user' && (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-indigo-600 transition">
                  Shop
                </Link>
                <Link to="/cart" className="relative">
                  <FiShoppingCart size={24} className="hover:text-indigo-600 transition" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </>
            )}

            {/* User Menu */}
            <div className="flex items-center gap-4">
              {user && (
                <>
                  <span className="text-gray-700">
                    {user.name}
                  </span>
                  {user.avatar && (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <button
                    onClick={onLogout}
                    className="text-red-600 hover:text-red-700 transition"
                  >
                    <FiLogOut size={20} />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={onMenuToggle}
            className="md:hidden text-gray-700 hover:text-indigo-600"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t space-y-3">
            {user?.role === 'user' && (
              <>
                <Link
                  to="/dashboard"
                  className="block text-gray-700 hover:text-indigo-600 py-2"
                >
                  Shop
                </Link>
                <Link
                  to="/cart"
                  className="block text-gray-700 hover:text-indigo-600 py-2"
                >
                  Cart ({cartCount})
                </Link>
              </>
            )}
            <button
              onClick={onLogout}
              className="w-full text-left text-red-600 hover:text-red-700 py-2"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
