import Product from '../models/Product.js';
import User from '../models/User.js';

/**
 * Create Product (Admin Only)
 * POST /api/admin/products
 */
export const createProduct = async (req, res) => {
  try {
    const { title, description, price, category, stock, image } = req.body;

    const product = await Product.create({
      title,
      description,
      price,
      category,
      stock,
      image: image || null,
    });

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Update Product (Admin Only)
 * PUT /api/admin/products/:id
 */
export const updateProduct = async (req, res) => {
  try {
    const { title, description, price, category, stock, image } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        ...(title && { title }),
        ...(description && { description }),
        ...(price !== undefined && { price }),
        ...(category && { category }),
        ...(stock !== undefined && { stock }),
        ...(image && { image }),
      },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Delete Product (Admin Only)
 * DELETE /api/admin/products/:id
 */
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get Dashboard Statistics (Admin Only)
 * GET /api/admin/dashboard/stats
 */
export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ isActive: true });
    const totalProducts = await Product.countDocuments({ isActive: true });
    const totalInactiveProducts = await Product.countDocuments({ isActive: false });

    // Calculate total inventory value
    const products = await Product.find();
    const inventoryValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);

    // Count by role
    const adminCount = await User.countDocuments({ role: 'admin', isActive: true });
    const userCount = await User.countDocuments({ role: 'user', isActive: true });

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        userCount,
        adminCount,
        totalProducts,
        totalInactiveProducts,
        inventoryValue: inventoryValue.toFixed(2),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get All Users (Admin Only)
 * GET /api/admin/users
 */
export const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;

    const filter = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const pageNum = Math.max(1, parseInt(page));
    const pageSize = Math.min(100, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * pageSize;

    const total = await User.countDocuments(filter);
    const users = await User.find(filter)
      .select('-password')
      .skip(skip)
      .limit(pageSize);

    res.status(200).json({
      success: true,
      data: users,
      pagination: {
        current: pageNum,
        total: Math.ceil(total / pageSize),
        count: users.length,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Delete User (Admin Only)
 * DELETE /api/admin/users/:id
 */
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Update User Role (Admin Only)
 * PUT /api/admin/users/:id/role
 */
export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role',
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'User role updated successfully',
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
