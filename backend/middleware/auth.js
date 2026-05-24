import { verifyToken } from '../utils/jwt.js';
import ErrorHandler from '../utils/errorHandler.js';
import User from '../models/User.js';

/**
 * Authentication Middleware
 * Verifies JWT token and attaches user info to request
 */
export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        message: 'No token provided. Please login.',
      });
    }

    const decoded = verifyToken(token);

    // Load user from DB to get role and other fields
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({
        message: 'User not found',
      });
    }

    req.userId = user._id;
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid or expired token',
    });
  }
};

/**
 * Admin Authorization Middleware
 * Checks if user has admin role
 */
export const adminOnly = (req, res, next) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({
        message: 'Access denied. Admin only.',
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      message: 'Authorization error',
    });
  }
};

/**
 * Optional Authentication Middleware
 * Attempts to authenticate but doesn't fail if token is missing
 */
export const optionalAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
      const decoded = verifyToken(token);
      const user = await User.findById(decoded.id).select('-password');
      if (user) {
        req.userId = user._id;
        req.user = user;
      }
    }

    next();
  } catch (error) {
    // Continue without user info
    next();
  }
};
