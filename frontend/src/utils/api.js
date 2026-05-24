import apiClient from './apiClient';

/**
 * Authentication API calls
 */
export const authAPI = {
  register: (data) => apiClient.post('/api/auth/register', data),
  login: (data) => apiClient.post('/api/auth/login', data),
  getCurrentUser: () => apiClient.get('/api/auth/me'),
  updateProfile: (data) => apiClient.put('/api/auth/profile', data),
  logout: () => apiClient.post('/api/auth/logout'),
};

/**
 * Product API calls
 */
export const productAPI = {
  getAllProducts: (params) => apiClient.get('/api/products', { params }),
  getProductById: (id) => apiClient.get(`/api/products/${id}`),
  getCategories: () => apiClient.get('/api/products/categories/all'),
  getProductsByCategory: (category) =>
    apiClient.get(`/api/products/category/${category}`),
  addReview: (productId, data) => apiClient.post(`/api/products/${productId}/review`, data),
};

/**
 * Admin API calls
 */
export const adminAPI = {
  createProduct: (data) => apiClient.post('/api/admin/products', data),
  updateProduct: (id, data) => apiClient.put(`/api/admin/products/${id}`, data),
  deleteProduct: (id) => apiClient.delete(`/api/admin/products/${id}`),
  getDashboardStats: () => apiClient.get('/api/admin/dashboard/stats'),
  getAllUsers: (params) => apiClient.get('/api/admin/users', { params }),
  deleteUser: (id) => apiClient.delete(`/api/admin/users/${id}`),
  updateUserRole: (id, data) => apiClient.put(`/api/admin/users/${id}/role`, data),
};
