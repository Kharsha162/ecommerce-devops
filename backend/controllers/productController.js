import Product from '../models/Product.js';

/**
 * Get All Products with Filters
 * GET /api/products?search=&category=&page=&limit=
 */
export const getAllProducts = async (req, res) => {
  try {
    const { search, category, page = 1, limit = 12, sortBy = 'createdAt' } = req.query;

    // Build filter object
    const filter = { isActive: true };

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    if (category) {
      filter.category = { $regex: category, $options: 'i' };
    }

    // Calculate pagination
    const pageNum = Math.max(1, parseInt(page));
    const pageSize = Math.min(100, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * pageSize;

    // Get total count
    const total = await Product.countDocuments(filter);

    // Get products
    const products = await Product.find(filter)
      .sort(sortBy === 'price' ? { price: 1 } : { [sortBy]: -1 })
      .skip(skip)
      .limit(pageSize);

    res.status(200).json({
      success: true,
      data: products,
      pagination: {
        current: pageNum,
        total: Math.ceil(total / pageSize),
        count: products.length,
        totalRecords: total,
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
 * Get Single Product
 * GET /api/products/:id
 */
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product || !product.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
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
 * Get Products by Category
 * GET /api/products/category/:category
 */
export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const products = await Product.find({
      category: { $regex: category, $options: 'i' },
      isActive: true,
    });

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get All Categories
 * GET /api/products/categories/all
 */
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Product.distinct('category', { isActive: true });

    res.status(200).json({
      success: true,
      data: categories.sort(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Add Product Review
 * POST /api/products/:id/review
 */
export const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const productId = req.params.id;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5',
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Check if user already reviewed
    const existingReview = product.reviews.find(
      (review) => review.userId.toString() === req.userId.toString()
    );

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this product',
      });
    }

    product.reviews.push({
      userId: req.userId,
      username: req.user.name,
      rating,
      comment: comment || '',
    });

    product.calculateRating();
    await product.save();

    res.status(201).json({
      success: true,
      message: 'Review added successfully',
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
