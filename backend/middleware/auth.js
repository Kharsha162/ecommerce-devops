import { verifyToken } from '../utils/jwt.js';
import ErrorHandler from '../utils/errorHandler.js';

/**
 * Authentication Middleware
 * Verifies JWT token and attaches user info to request
 */
export const protect = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided. Please login.',
      });
    }

    const decoded = verifyToken(token);
    req.userId = decoded.id;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
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
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin only.',
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Authorization error',
    });
  }
};

/**
 * Optional Authentication Middleware
 * Attempts to authenticate but doesn't fail if token is missing
 */
export const optionalAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
      const decoded = verifyToken(token);
      req.userId = decoded.id;
      req.user = decoded;
    }

    next();
  } catch (error) {
    // Continue without user info
    next();
  }
};
