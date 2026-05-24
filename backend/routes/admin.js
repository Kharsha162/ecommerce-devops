import express from 'express';
import { protect, adminOnly } from '../middleware/auth.js';
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getDashboardStats,
  getAllUsers,
  deleteUser,
  updateUserRole,
} from '../controllers/adminController.js';
import {
  validateProduct,
  handleValidationErrors,
} from '../utils/validators.js';

const router = express.Router();

// Protect all admin routes
router.use(protect, adminOnly);

/**
 * Admin Product Routes
 */
router.post('/products', validateProduct, handleValidationErrors, createProduct);
router.put('/products/:id', validateProduct, handleValidationErrors, updateProduct);
router.delete('/products/:id', deleteProduct);

/**
 * Admin Dashboard Routes
 */
router.get('/dashboard/stats', getDashboardStats);

/**
 * Admin User Management Routes
 */
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.put('/users/:id/role', updateUserRole);

export default router;
