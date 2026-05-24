import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  register,
  login,
  getCurrentUser,
  updateProfile,
  logout,
} from '../controllers/authController.js';
import {
  validateRegister,
  validateLogin,
  handleValidationErrors,
} from '../utils/validators.js';

const router = express.Router();

/**
 * Authentication Routes
 */
router.post('/register', validateRegister, handleValidationErrors, register);
router.post('/login', validateLogin, handleValidationErrors, login);
router.get('/me', protect, getCurrentUser);
router.put('/profile', protect, updateProfile);
router.post('/logout', protect, logout);

export default router;
