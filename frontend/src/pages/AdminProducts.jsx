import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import AdminSidebar from '../components/AdminSidebar.jsx';
import Button from '../components/Button.jsx';
import Input from '../components/Input.jsx';
import { adminAPI } from '../utils/api';
import toast from 'react-hot-toast';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';

/**
 * Admin Products Management
 */
const AdminProducts = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image: '',
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getDashboardStats();
      // In a real scenario, you'd have a dedicated endpoint
      setProducts([]);
    } catch (error) {
      toast.error(error.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData(product);
    } else {
      setEditingProduct(null);
      setFormData({
        title: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        image: '',
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setFormData({
      title: '',
      description: '',
      price: '',
      category: '',
      stock: '',
      image: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await adminAPI.updateProduct(editingProduct._id, formData);
        toast.success('Product updated successfully');
      } else {
        await adminAPI.createProduct(formData);
        toast.success('Product created successfully');
      }
      handleCloseModal();
      fetchProducts();
    } catch (error) {
      toast.error(error.message || 'Operation failed');
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await adminAPI.deleteProduct(productId);
      toast.success('Product deleted successfully');
      fetchProducts();
    } catch (error) {
      toast.error(error.message || 'Failed to delete product');
    }
  };

  const handleLogout = () => {
    logout();
  };

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
          <h1 className="text-2xl font-bold text-gray-800">Product Management</h1>
          <Button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2"
          >
            <FiPlus /> Add Product
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Products Table */}
          <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">Title</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">Price</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">Stock</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">Category</th>
                  <th className="px-6 py-3 text-center font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-600">
                      Loading...
                    </td>
                  </tr>
                ) : products.length > 0 ? (
                  products.map((product) => (
                    <tr key={product._id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-800 font-medium">{product.title}</td>
                      <td className="px-6 py-4 text-gray-800">${product.price}</td>
                      <td className="px-6 py-4 text-gray-800">{product.stock}</td>
                      <td className="px-6 py-4 text-gray-800">{product.category}</td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => handleOpenModal(product)}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <FiEdit2 />
                          </button>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-600">
                      No products found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-600 hover:text-gray-800"
              >
                <FiX size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Title"
                placeholder="Product title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
              <Input
                label="Description"
                placeholder="Product description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
              <Input
                label="Price"
                type="number"
                placeholder="Price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
              <Input
                label="Category"
                placeholder="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              />
              <Input
                label="Stock"
                type="number"
                placeholder="Stock quantity"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
              />
              <Input
                label="Image URL"
                placeholder="Image URL"
                name="image"
                value={formData.image}
                onChange={handleChange}
              />

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="secondary"
                  className="flex-1"
                  onClick={handleCloseModal}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  {editingProduct ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
