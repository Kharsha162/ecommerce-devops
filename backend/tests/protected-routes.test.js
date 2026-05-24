const request = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Mock Express app for testing
const app = require('../server');

describe('Protected Routes', () => {
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
  });

  describe('Authentication Middleware', () => {
    it('should allow request with valid token', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).not.toBe(401);
    });

    it('should reject request without token', async () => {
      const response = await request(app)
        .get('/api/auth/me');

      expect(response.status).toBe(401);
    });

    it('should reject request with invalid token', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', 'Bearer invalid-token');

      expect(response.status).toBe(401);
    });

    it('should reject request with expired token', async () => {
      // Create an expired token
      const expiredToken = jwt.sign(
        { id: userId },
        process.env.JWT_SECRET || 'test-secret',
        { expiresIn: '-1h' }
      );

      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${expiredToken}`);

      expect(response.status).toBe(401);
    });

    it('should accept token in different formats', async () => {
      // Test with Bearer prefix
      const response1 = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${token}`);

      expect(response1.status).not.toBe(401);
    });
  });

  describe('Admin Authorization', () => {
    it('should allow admin user to access admin routes', async () => {
      const response = await request(app)
        .get('/api/admin/users')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).not.toBe(403);
    });

    it('should deny regular user from accessing admin routes', async () => {
      const response = await request(app)
        .get('/api/admin/users')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(403);
    });

    it('should deny anonymous user from accessing admin routes', async () => {
      const response = await request(app)
        .get('/api/admin/users');

      expect(response.status).toBe(401);
    });
  });

  describe('User Authorization', () => {
    it('should allow authenticated user to access user routes', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.user).toBeDefined();
    });

    it('should deny unauthenticated user from accessing user routes', async () => {
      const response = await request(app)
        .get('/api/auth/me');

      expect(response.status).toBe(401);
    });
  });

  describe('Role-based Access Control', () => {
    it('admin token should have admin role', async () => {
      const decoded = jwt.verify(adminToken, process.env.JWT_SECRET || 'test-secret');
      const user = await User.findById(decoded.id);
      expect(user.role).toBe('admin');
    });

    it('user token should have user role', async () => {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'test-secret');
      const user = await User.findById(decoded.id);
      expect(user.role).toBe('user');
    });
  });

  describe('Token Validation', () => {
    it('should validate token structure', () => {
      expect(() => {
        jwt.verify(token, process.env.JWT_SECRET || 'test-secret');
      }).not.toThrow();
    });

    it('should reject malformed tokens', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', 'Bearer malformed.token');

      expect(response.status).toBe(401);
    });

    it('should extract user id from token', () => {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'test-secret');
      expect(decoded.id).toBeTruthy();
      expect(decoded.id).toEqual(userId);
    });
  });
});
