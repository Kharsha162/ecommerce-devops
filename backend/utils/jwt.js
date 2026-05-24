import jwt from 'jsonwebtoken';

/**
 * Generate JWT Token
 * @param {string} userId - User ID to encode in token
 * @returns {string} - JWT Token
 */
export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

/**
 * Verify JWT Token
 * @param {string} token - JWT Token to verify
 * @returns {object} - Decoded token data
 */
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

/**
 * Decode JWT Token without verification (use with caution)
 * @param {string} token - JWT Token to decode
 * @returns {object} - Decoded token data
 */
export const decodeToken = (token) => {
  return jwt.decode(token);
};
