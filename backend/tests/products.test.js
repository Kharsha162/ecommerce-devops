const request = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Product = require('../models/Product');

// Mock Express app for testing
const app = require('../server');

describe('Product Routes', () => {
  let token;
  let adminToken;
  let userId;
  let adminId;

  beforeEach(async () => {
    // Create regular user
    const user = await User.create({
      name: 'Test User',
      email: 'user@example.com',
      password: 'Password123!',
      role: 'user',
    });
    userId = user._id;
    token = jwt.sign({ id: userId }, process.env.JWT_SECRET || 'test-secret');

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'Password123!',
      role: 'admin',
    });
    adminId = admin._id;
    adminToken = jwt.sign({ id: adminId }, process.env.JWT_SECRET || 'test-secret');

    // Create sample products
    await Product.create({
      name: 'Product 1',
      description: 'Description 1',
      price: 100,
      category: 'Electronics',
      image: 'image1.jpg',
      stock: 10,
    });
  });

  describe('GET /api/products', () => {
    it('should get all products', async () => {
      const response = await request(app)
        .get('/api/products');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should filter products by category', async () => {
      const response = await request(app)
        .get('/api/products')
        .query({ category: 'Electronics' });

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should handle pagination', async () => {
      const response = await request(app)
        .get('/api/products')
        .query({ page: 1, limit: 10 });

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('GET /api/products/:id', () => {
    it('should get product by id', async () => {
      const product = await Product.findOne();
      const response = await request(app)
        .get(`/api/products/${product._id}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('name');
      expect(response.body.name).toBe('Product 1');
    });

    it('should return 404 for non-existent product', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const response = await request(app)
        .get(`/api/products/${fakeId}`);

      expect(response.status).toBe(404);
    });
  });

  describe('POST /api/products (Admin Only)', () => {
    it('should create product as admin', async () => {
      const response = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'New Product',
          description: 'New Description',
          price: 200,
          category: 'Books',
          image: 'image.jpg',
          stock: 5,
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('_id');
      expect(response.body.name).toBe('New Product');
    });

    it('should not create product as regular user', async () => {
      const response = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'New Product',
          description: 'New Description',
          price: 200,
          category: 'Books',
          image: 'image.jpg',
          stock: 5,
        });

      expect(response.status).toBe(403);
    });

    it('should validate product fields', async () => {
      const response = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'New Product',
          // missing required fields
        });

      expect(response.status).toBeGreaterThanOrEqual(400);
    });
  });

  describe('PUT /api/products/:id (Admin Only)', () => {
    it('should update product as admin', async () => {
      const product = await Product.findOne();
      const response = await request(app)
        .put(`/api/products/${product._id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Updated Product',
          price: 150,
        });

      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Updated Product');
    });

    it('should not update product as regular user', async () => {
      const product = await Product.findOne();
      const response = await request(app)
        .put(`/api/products/${product._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Updated' });

      expect(response.status).toBe(403);
    });
  });

  describe('DELETE /api/products/:id (Admin Only)', () => {
    it('should delete product as admin', async () => {
      const product = await Product.findOne();
      const response = await request(app)
        .delete(`/api/products/${product._id}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(200);

      // Verify product is deleted
      const deleted = await Product.findById(product._id);
      expect(deleted).toBeNull();
    });

    it('should not delete product as regular user', async () => {
      const product = await Product.findOne();
      const response = await request(app)
        .delete(`/api/products/${product._id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(403);
    });
  });

  describe('POST /api/products/:id/review', () => {
    it('should add review to product', async () => {
      const product = await Product.findOne();
      const response = await request(app)
        .post(`/api/products/${product._id}/review`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          rating: 5,
          comment: 'Great product!',
        });

      expect(response.status).toBe(200);
      expect(response.body.reviews).toBeDefined();
    });

    it('should not allow review without authentication', async () => {
      const product = await Product.findOne();
      const response = await request(app)
        .post(`/api/products/${product._id}/review`)
        .send({
          rating: 5,
          comment: 'Great product!',
        });

      expect(response.status).toBe(401);
    });
  });
});
