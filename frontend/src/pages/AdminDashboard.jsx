import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import AdminSidebar from '../components/AdminSidebar.jsx';
import { adminAPI } from '../utils/api';
import toast from 'react-hot-toast';
import { FiUsers, FiBox, FiDollarSign, FiBarChart2 } from 'react-icons/fi';

/**
 * Admin Dashboard
 */
const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getDashboardStats();
      setStats(response.data);
    } catch (error) {
      toast.error(error.message || 'Failed to fetch statistics');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  const StatCard = ({ icon: Icon, title, value, color }) => (
    <div className={`${color} rounded-lg shadow-lg p-6 text-white`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-90">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <Icon size={40} opacity={0.5} />
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        {/* Header */}
        <div className="bg-white shadow-md p-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <div className="text-right">
            <p className="text-gray-600">Welcome, {user?.name}</p>
            <p className="text-sm text-gray-500">{new Date().toLocaleDateString()}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {loading ? (
              [...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-300 rounded-lg h-32 animate-pulse" />
              ))
            ) : stats ? (
              <>
                <StatCard
                  icon={FiUsers}
                  title="Total Users"
                  value={stats.totalUsers}
                  color="bg-blue-600"
                />
                <StatCard
                  icon={FiBox}
                  title="Total Products"
                  value={stats.totalProducts}
                  color="bg-indigo-600"
                />
                <StatCard
                  icon={FiDollarSign}
                  title="Inventory Value"
                  value={`$${stats.inventoryValue}`}
                  color="bg-green-600"
                />
                <StatCard
                  icon={FiBarChart2}
                  title="Inactive Products"
                  value={stats.totalInactiveProducts}
                  color="bg-orange-600"
                />
              </>
            ) : null}
          </div>

          {/* Chart Placeholder */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* User Distribution */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">User Distribution</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">Admin Users</span>
                    <span className="font-semibold">{stats?.adminCount || 0}</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-indigo-600 h-full"
                      style={{
                        width: `${stats?.totalUsers > 0 ? (stats.adminCount / stats.totalUsers) * 100 : 0}%`,
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">Regular Users</span>
                    <span className="font-semibold">{stats?.userCount || 0}</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-green-600 h-full"
                      style={{
                        width: `${stats?.totalUsers > 0 ? (stats.userCount / stats.totalUsers) * 100 : 0}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Links</h2>
              <div className="space-y-2">
                <a
                  href="/admin/products"
                  className="block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  Manage Products
                </a>
                <a
                  href="/admin/users"
                  className="block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Manage Users
                </a>
                <a
                  href="/admin/analytics"
                  className="block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  View Analytics
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
