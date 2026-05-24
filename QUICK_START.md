# 🚀 Quick Start Guide

Get your MERN eCommerce application running in 5 minutes!

## Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- Git

## Step 1: Setup MongoDB

### Option A: Local MongoDB
```bash
# Install MongoDB Community Edition
# macOS: brew install mongodb-community
# Windows: https://www.mongodb.com/try/download/community
# Linux: https://docs.mongodb.com/manual/installation/

# Start MongoDB
mongod
```

### Option B: MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Get your connection string

## Step 2: Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env file with your settings
# MONGODB_URI=mongodb://localhost:27017/ecommerce
# PORT=5000
# JWT_SECRET=your_secret_key_here

# Seed sample data (optional but recommended)
node seed.js

# Start server
npm run dev
```

✅ Backend running at: `http://localhost:5000`

## Step 3: Frontend Setup

```bash
# Navigate to frontend (in new terminal)
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev
```

✅ Frontend running at: `http://localhost:5173`

## Step 4: Login & Explore

Open browser to `http://localhost:5173`

### Test Credentials

**Admin Account:**
- Email: `admin@ecommerce.com`
- Password: `Admin@123`

**User Account:**
- Email: `john@example.com`
- Password: `John@123456`

## 🎯 What You Can Do

### As a Regular User
- ✅ Browse products
- ✅ Search and filter by category
- ✅ View product details
- ✅ Leave reviews and ratings
- ✅ Manage shopping cart

### As an Admin
- ✅ Dashboard with statistics
- ✅ Add, edit, and delete products
- ✅ Manage users and roles
- ✅ View inventory value
- ✅ Monitor analytics

## 📝 Common Commands

### Backend
```bash
npm run dev      # Development mode (with auto-reload)
npm start        # Production mode
npm run seed     # Seed database with sample data
```

### Frontend
```bash
npm run dev      # Development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 🔐 How Authentication Works

1. **Register** → Create new account
2. **Login** → Receive JWT token
3. **Token Storage** → Saved in localStorage
4. **Protected Routes** → Token checked for access
5. **API Requests** → Token sent in Authorization header
6. **Token Expiry** → Auto logout after 7 days (configurable)

## 📱 Responsive Breakpoints

The application is fully responsive:
- **Mobile** (< 640px)
- **Tablet** (640px - 1024px)
- **Desktop** (> 1024px)

## 🎨 UI Features

- Modern glassmorphism design
- Smooth animations
- Dark/Light mode compatible
- Professional admin panel
- Intuitive navigation
- Loading skeletons
- Toast notifications

## ⚡ Performance

- Fast page loads
- Optimized images
- Lazy loading
- Redux state management
- Efficient API calls

## 🐛 Troubleshooting

### Backend won't start
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
npm run dev
```

### MongoDB connection failed
```bash
# Verify MongoDB URI in .env
# Check if MongoDB is running
# For local: mongod
# For Atlas: Use correct connection string
```

### Port already in use
```bash
# Kill process using port
# macOS/Linux: lsof -i :5000 | kill -9 <PID>
# Windows: netstat -ano | findstr :5000
```

### CORS errors
- Verify backend .env has correct CLIENT_URL
- Restart backend after env changes

## 📚 Project Structure Overview

```
ecommerce/
├── backend/           # Express + MongoDB
│   ├── controllers/   # Business logic
│   ├── models/        # MongoDB schemas
│   ├── routes/        # API endpoints
│   ├── middleware/    # Auth & validation
│   └── server.js      # Main server file
│
├── frontend/          # React + Vite
│   ├── src/
│   │   ├── components/# Reusable UI
│   │   ├── pages/     # Page components
│   │   ├── store/     # Redux state
│   │   ├── hooks/     # Custom hooks
│   │   └── utils/     # Helper functions
│   └── index.html     # Entry point
```

## 🌐 API Overview

### Public Endpoints
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `GET /api/products` - Browse products
- `GET /api/products/:id` - Product details

### Protected Endpoints (Login required)
- `POST /api/products/:id/review` - Add review
- `PUT /api/auth/profile` - Update profile

### Admin Endpoints (Admin only)
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/:id` - Edit product
- `DELETE /api/admin/products/:id` - Delete product
- `GET /api/admin/users` - List users
- `PUT /api/admin/users/:id/role` - Change role

## 💡 Next Steps

1. **Explore the code** - Understand the architecture
2. **Customize** - Add your branding
3. **Add features** - Payment integration, email verification, etc.
4. **Deploy** - Host on Heroku, Vercel, AWS, etc.
5. **Monitor** - Add logging and error tracking

## 📞 Need Help?

- Check documentation files (README.md, BACKEND_API.md, FRONTEND_GUIDE.md)
- Review code comments
- Check browser console for errors
- Check server logs for API errors

## 🎉 Congratulations!

You now have a fully functional MERN eCommerce application running locally!

---

**Happy Coding! 🚀**
