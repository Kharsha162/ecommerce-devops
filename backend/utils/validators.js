import { body, validationResult } from 'express-validator';

/**
 * Email validation regex
 */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Password validation - minimum 8 chars, uppercase, lowercase, number
 */
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;

/**
 * Validate registration input
 */
export const validateRegister = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters'),
  body('email')
    .trim()
    .toLowerCase()
    .custom((value) => {
      if (!emailRegex.test(value)) {
        throw new Error('Invalid email address');
      }
      return true;
    }),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(passwordRegex)
    .withMessage('Password must contain uppercase, lowercase, and number'),
  body('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),
  body('role')
    .optional()
    .isIn(['user', 'admin'])
    .withMessage('Invalid role'),
];

/**
 * Validate login input
 */
export const validateLogin = [
  body('email')
    .trim()
    .toLowerCase()
    .custom((value) => {
      if (!emailRegex.test(value)) {
        throw new Error('Invalid email address');
      }
      return true;
    }),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];

/**
 * Validate product input
 */
export const validateProduct = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Product title is required')
    .isLength({ min: 3 })
    .withMessage('Title must be at least 3 characters'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Product description is required'),
  body('price')
    .notEmpty()
    .withMessage('Price is required')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required'),
  body('stock')
    .notEmpty()
    .withMessage('Stock is required')
    .isInt({ min: 0 })
    .withMessage('Stock must be a non-negative integer'),
];

/**
 * Handle validation errors
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next middleware
 */
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((error) => ({
        field: error.param,
        message: error.msg,
      })),
    });
  }
  next();
};
