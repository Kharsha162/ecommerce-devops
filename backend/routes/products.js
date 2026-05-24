import express from 'express';
import { optionalAuth } from '../middleware/auth.js';
import { protect } from '../middleware/auth.js';
import {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  getAllCategories,
  addReview,
} from '../controllers/productController.js';

const router = express.Router();

/**
 * Product Routes
 */
router.get('/', getAllProducts);
router.get('/categories/all', getAllCategories);
router.get('/category/:category', getProductsByCategory);
router.get('/:id', getProductById);
router.post('/:id/review', protect, addReview);

export default router;
