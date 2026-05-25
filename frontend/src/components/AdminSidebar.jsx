import React from 'react';
import { FiHome, FiBox, FiUsers, FiBarChart2, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';

/**
 * Admin Sidebar Component
 */
const AdminSidebar = ({ isOpen, onToggle, onLogout }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: FiHome },
    { path: '/admin/products', label: 'Products', icon: FiBox },
    { path: '/admin/users', label: 'Users', icon: FiUsers },
    { path: '/admin/analytics', label: 'Analytics', icon: FiBarChart2 },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={onToggle}
        className="fixed top-4 left-4 z-50 md:hidden bg-indigo-600 text-white p-2 rounded-lg"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen w-64 bg-gray-900 text-white p-6 transform transition-transform duration-300 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Logo */}
        <Link to="/admin" className="flex items-center gap-2 mb-10 mt-10 md:mt-0">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-xl">
            EC
          </div>
          <span className="font-bold text-lg">Admin</span>
        </Link>

        {/* Menu Items */}
        <nav className="space-y-2">
          {(menuItems || []).map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive(path)
                  ? 'bg-indigo-600'
                  : 'hover:bg-gray-800'
              }`}
            >
              <Icon size={20} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="absolute bottom-6 left-6 right-6 flex items-center gap-3 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition w-52"
        >
          <FiLogOut size={20} />
          <span>Logout</span>
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={onToggle}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
        />
      )}
    </>
  );
};

export default AdminSidebar;
