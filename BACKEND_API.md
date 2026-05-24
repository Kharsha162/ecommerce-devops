# Backend API Documentation

## Overview
Complete REST API documentation for the MERN eCommerce Backend.

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require JWT token in Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Response Format
All endpoints return JSON with the following structure:
```json
{
  "success": true/false,
  "message": "Response message",
  "data": {}
}
```

## Error Handling
- **400** - Bad Request (validation errors)
- **401** - Unauthorized (missing/invalid token)
- **403** - Forbidden (insufficient permissions)
- **404** - Not Found
- **500** - Internal Server Error

---

## Endpoints

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "confirmPassword": "SecurePass123",
  "role": "user"
}
```
**Response (201):**
```json
{
  "success": true,
  "message": "Registration successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "65a1b2c3d4e5f6g7h8i9j",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123",
  "rememberMe": true
}
```
**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "65a1b2c3d4e5f6g7h8i9j",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### Get Current User
```http
GET /auth/me
Authorization: Bearer <token>
```
**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "65a1b2c3d4e5f6g7h8i9j",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

#### Update Profile
```http
PUT /auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Jane Doe",
  "avatar": "https://example.com/avatar.jpg"
}
```

#### Logout
```http
POST /auth/logout
Authorization: Bearer <token>
```

---

### Product Endpoints

#### Get All Products
```http
GET /products?search=laptop&category=Electronics&page=1&limit=12&sortBy=price
```
**Query Parameters:**
- `search` (string) - Search in title/description
- `category` (string) - Filter by category
- `page` (number) - Page number (default: 1)
- `limit` (number) - Items per page (default: 12)
- `sortBy` (string) - Sort field (default: createdAt)

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j",
      "title": "Wireless Headphones",
      "description": "High-quality wireless headphones...",
      "price": 199.99,
      "category": "Electronics",
      "stock": 50,
      "rating": 4.5,
      "numReviews": 12,
      "image": "https://..."
    }
  ],
  "pagination": {
    "current": 1,
    "total": 5,
    "count": 12,
    "totalRecords": 60
  }
}
```

#### Get Single Product
```http
GET /products/65a1b2c3d4e5f6g7h8i9j
```
**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j",
    "title": "Wireless Headphones",
    "description": "High-quality wireless headphones...",
    "price": 199.99,
    "category": "Electronics",
    "stock": 50,
    "rating": 4.5,
    "numReviews": 12,
    "reviews": [
      {
        "userId": "user123",
        "username": "John Doe",
        "rating": 5,
        "comment": "Great product!",
        "createdAt": "2024-01-15T10:30:00Z"
      }
    ]
  }
}
```

#### Get All Categories
```http
GET /products/categories/all
```
**Response (200):**
```json
{
  "success": true,
  "data": ["Electronics", "Accessories", "Cables"]
}
```

#### Get Products by Category
```http
GET /products/category/Electronics
```

#### Add Product Review
```http
POST /products/65a1b2c3d4e5f6g7h8i9j/review
Authorization: Bearer <token>
Content-Type: application/json

{
  "rating": 5,
  "comment": "Excellent product, highly recommended!"
}
```

---

### Admin Endpoints

#### Create Product
```http
POST /admin/products
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "title": "New Product",
  "description": "Product description",
  "price": 99.99,
  "category": "Electronics",
  "stock": 100,
  "image": "https://example.com/image.jpg"
}
```

#### Update Product
```http
PUT /admin/products/65a1b2c3d4e5f6g7h8i9j
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "title": "Updated Product",
  "price": 109.99,
  "stock": 95
}
```

#### Delete Product
```http
DELETE /admin/products/65a1b2c3d4e5f6g7h8i9j
Authorization: Bearer <admin_token>
```

#### Get Dashboard Statistics
```http
GET /admin/dashboard/stats
Authorization: Bearer <admin_token>
```
**Response (200):**
```json
{
  "success": true,
  "data": {
    "totalUsers": 150,
    "userCount": 145,
    "adminCount": 5,
    "totalProducts": 500,
    "totalInactiveProducts": 20,
    "inventoryValue": "45250.50"
  }
}
```

#### Get All Users
```http
GET /admin/users?page=1&limit=10&search=john
Authorization: Bearer <admin_token>
```

#### Delete User
```http
DELETE /admin/users/65a1b2c3d4e5f6g7h8i9j
Authorization: Bearer <admin_token>
```

#### Update User Role
```http
PUT /admin/users/65a1b2c3d4e5f6g7h8i9j/role
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "role": "admin"
}
```

---

## Error Examples

### Validation Error
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email address"
    },
    {
      "field": "password",
      "message": "Password must be at least 8 characters"
    }
  ]
}
```

### Unauthorized Error
```json
{
  "success": false,
  "message": "Invalid or expired token"
}
```

### Admin Only Error
```json
{
  "success": false,
  "message": "Access denied. Admin only."
}
```

---

## Rate Limiting
Currently no rate limiting is implemented. For production, add rate limiting middleware.

## Pagination
Use `page` and `limit` parameters for pagination. Default limit is 12, maximum is 100.

## Filtering & Sorting
- Filter by: `category`, `search`
- Sort by: `createdAt`, `price`, `rating`

---

**API Version:** 1.0.0  
**Last Updated:** 2024
