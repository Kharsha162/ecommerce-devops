# MERN eCommerce Application

A production-ready, full-stack eCommerce web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). Features modern UI/UX with Tailwind CSS, JWT authentication, role-based access control, and comprehensive admin panel.

## 🚀 Features

### Authentication & Authorization
- ✅ User registration and login with JWT tokens
- ✅ Password hashing with bcrypt
- ✅ Role-based access control (User/Admin)
- ✅ Protected routes and API endpoints
- ✅ Session persistence

### User Features
- ✅ Browse and search products
- ✅ Filter by category
- ✅ View product details
- ✅ Add to cart functionality
- ✅ Product reviews and ratings
- ✅ Responsive product catalog

### Admin Features
- ✅ Dashboard with statistics
- ✅ Product management (Create, Read, Update, Delete)
- ✅ User management and role assignment
- ✅ Inventory tracking
- ✅ Analytics overview

### UI/UX
- ✅ Modern glassmorphism design
- ✅ Fully responsive layouts (mobile, tablet, desktop)
- ✅ Smooth animations with Framer Motion
- ✅ Loading skeletons
- ✅ Toast notifications
- ✅ Dark/Light mode ready

## 📋 Tech Stack

### Frontend
- React 18.2
- Vite (build tool)
- Redux Toolkit (state management)
- React Router v6
- Tailwind CSS
- Framer Motion
- Axios
- React Hot Toast
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Express Validator
- Multer (file upload)
- CORS

## 📁 Project Structure

```
ecommerce/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   └── adminController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorMiddleware.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   └── admin.js
│   ├── utils/
│   │   ├── errorHandler.js
│   │   ├── jwt.js
│   │   └── validators.js
│   ├── server.js
│   ├── seed.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Button.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Skeleton.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── FilterSidebar.jsx
│   │   │   ├── AdminSidebar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminProducts.jsx
│   │   │   └── AdminUsers.jsx
│   │   ├── store/
│   │   │   ├── slices/
│   │   │   │   ├── authSlice.js
│   │   │   │   ├── cartSlice.js
│   │   │   │   ├── wishlistSlice.js
│   │   │   │   └── productSlice.js
│   │   │   └── index.js
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   ├── useProducts.js
│   │   │   ├── useCart.js
│   │   │   └── useWishlist.js
│   │   ├── utils/
│   │   │   ├── apiClient.js
│   │   │   ├── api.js
│   │   │   └── storage.js
│   │   ├── styles/
│   │   │   └── globals.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   └── .env.example
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create .env file:**
```bash
cp .env.example .env
```

4. **Configure environment variables in .env:**
```
MONGODB_URI=mongodb://localhost:27017/ecommerce
PORT=5000
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
API_URL=http://localhost:5000
CLIENT_URL=http://localhost:5173
BCRYPT_ROUNDS=10
```

5. **Seed database (optional):**
```bash
npm run seed
```

6. **Start backend server:**
```bash
npm run dev
```

Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create .env file:**
```bash
cp .env.example .env
```

4. **Configure environment variables in .env:**
```
VITE_API_URL=http://localhost:5000
VITE_API_TIMEOUT=10000
VITE_APP_NAME=eCommerce
VITE_ENABLE_DARK_MODE=true
```

5. **Start development server:**
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## 🧪 Test Credentials

### Admin Account
- **Email:** admin@ecommerce.com
- **Password:** Admin@123
- **Role:** Admin

### Regular User Account
- **Email:** john@example.com
- **Password:** John@123456
- **Role:** User

## 📚 API Endpoints

### Authentication Endpoints
```
POST   /api/auth/register     - Register new user
POST   /api/auth/login        - Login user
GET    /api/auth/me           - Get current user (Protected)
PUT    /api/auth/profile      - Update profile (Protected)
POST   /api/auth/logout       - Logout (Protected)
```

### Product Endpoints
```
GET    /api/products                    - Get all products with filters
GET    /api/products/:id                - Get single product
GET    /api/products/category/:category - Get products by category
GET    /api/products/categories/all     - Get all categories
POST   /api/products/:id/review         - Add review (Protected)
```

### Admin Endpoints
```
POST   /api/admin/products              - Create product (Admin Only)
PUT    /api/admin/products/:id          - Update product (Admin Only)
DELETE /api/admin/products/:id          - Delete product (Admin Only)
GET    /api/admin/dashboard/stats       - Get dashboard stats (Admin Only)
GET    /api/admin/users                 - Get all users (Admin Only)
DELETE /api/admin/users/:id             - Delete user (Admin Only)
PUT    /api/admin/users/:id/role        - Update user role (Admin Only)
```

## 🔐 Security Features

- ✅ JWT token-based authentication
- ✅ Password hashing with bcrypt (10 rounds)
- ✅ Protected API routes with middleware
- ✅ Input validation on frontend and backend
- ✅ CORS protection
- ✅ Role-based authorization
- ✅ Secure token storage (localStorage)

## 📱 Responsive Breakpoints

- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px

## 🎨 Color Scheme

- **Primary:** Indigo (#6366f1)
- **Secondary:** Purple (#9333ea)
- **Accent:** Pink (#ec4899)
- **Success:** Green (#22c55e)
- **Error:** Red (#ef4444)

## 🚀 Deployment

### Backend Deployment (Heroku Example)
```bash
cd backend
git init
git add .
git commit -m "Deploy backend"
heroku create your-app-name
git push heroku main
```

### Frontend Deployment (Vercel Example)
```bash
cd frontend
npm run build
vercel --prod
```

## 📦 Build Commands

### Backend
```bash
npm start        # Production start
npm run dev      # Development with nodemon
```

### Frontend
```bash
npm run dev      # Development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI in .env file
- Verify connection string format

### Port Already in Use
- Backend: `lsof -i :5000` then `kill -9 <PID>`
- Frontend: `lsof -i :5173` then `kill -9 <PID>`

### CORS Issues
- Ensure CLIENT_URL is correctly set in backend .env
- Check frontend API_URL matches backend URL

### Token Expired
- Clear localStorage and login again
- Adjust JWT_EXPIRE in backend .env

## 📄 License

MIT License - feel free to use this project for personal and commercial purposes.

## 👥 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For issues and questions, please create an issue in the repository.

---

**Built with ❤️ using MERN Stack**
