# Frontend Setup Guide

## Quick Start

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Configure environment variables
# Edit .env with your API URL

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Project Structure

### Components (`src/components/`)
- **Button.jsx** - Reusable button component with variants
- **ProductCard.jsx** - Product display card
- **Navbar.jsx** - Navigation bar with user menu
- **Input.jsx** - Form input with validation
- **FilterSidebar.jsx** - Product filters
- **AdminSidebar.jsx** - Admin navigation
- **Footer.jsx** - Footer component
- **Skeleton.jsx** - Loading skeleton
- **ProtectedRoute.jsx** - Route protection

### Pages (`src/pages/`)
- **Login.jsx** - User login page
- **Register.jsx** - User registration page
- **Dashboard.jsx** - User product dashboard
- **ProductDetail.jsx** - Product detail page
- **AdminDashboard.jsx** - Admin overview
- **AdminProducts.jsx** - Product management
- **AdminUsers.jsx** - User management

### Redux Store (`src/store/`)
- **authSlice.js** - Authentication state
- **cartSlice.js** - Shopping cart state
- **wishlistSlice.js** - Wishlist state
- **productSlice.js** - Products state

### Hooks (`src/hooks/`)
- **useAuth.js** - Authentication operations
- **useProducts.js** - Product operations
- **useCart.js** - Cart operations
- **useWishlist.js** - Wishlist operations

### Utilities (`src/utils/`)
- **apiClient.js** - Axios instance with interceptors
- **api.js** - API endpoint definitions
- **storage.js** - localStorage helpers

## Environment Variables

```
VITE_API_URL=http://localhost:5000
VITE_API_TIMEOUT=10000
VITE_APP_NAME=eCommerce
VITE_ENABLE_DARK_MODE=true
```

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Styling

- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Icons** - Icon library

### Custom Classes
- `.glass` - Glassmorphism effect
- `.smooth-transition` - Smooth animations
- `.btn-primary` - Primary button
- `.gradient-primary` - Gradient background

## Component Examples

### Using Button Component
```jsx
import Button from '../components/Button';

<Button 
  onClick={handleClick}
  variant="primary"
  size="lg"
  loading={isLoading}
>
  Click Me
</Button>
```

### Using Custom Hooks
```jsx
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';

function MyComponent() {
  const { user, logout } = useAuth();
  const { products, fetchProducts } = useProducts();
  const { items, add } = useCart();
}
```

## State Management (Redux)

### Dispatching Actions
```jsx
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/slices/authSlice';

const dispatch = useDispatch();
dispatch(loginSuccess({ user, token }));
```

### Selectors
```jsx
import { useSelector } from 'react-redux';

const { user, isAuthenticated } = useSelector(state => state.auth);
const { items, total } = useSelector(state => state.cart);
```

## API Integration

### Making API Calls
```jsx
import { useProducts } from '../hooks/useProducts';

function Component() {
  const { fetchProducts, products, loading } = useProducts();

  useEffect(() => {
    fetchProducts({ search: 'laptop', category: 'Electronics' });
  }, []);
}
```

### Error Handling
Errors are automatically handled with toast notifications via react-hot-toast.

## Forms & Validation

### Form Validation
```jsx
const [formData, setFormData] = useState({
  email: '',
  password: '',
});

const validateForm = () => {
  const errors = {};
  if (!formData.email) errors.email = 'Email required';
  if (!formData.password) errors.password = 'Password required';
  return errors;
};
```

## Performance Optimization

- Code splitting via React Router
- Image optimization
- Lazy loading components
- Memoization for expensive operations

## Deployment

### Vercel
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

### GitHub Pages
Configure vite.config.js with base path and deploy.

## Troubleshooting

### Port 5173 Already in Use
```bash
lsof -i :5173
kill -9 <PID>
```

### CORS Errors
- Verify API_URL in .env
- Check backend CORS configuration

### Token Issues
- Clear localStorage: `localStorage.clear()`
- Login again

### API Connection Issues
- Verify backend is running
- Check API_URL in .env file

## Best Practices

1. **Component Organization** - Keep components focused and single-purpose
2. **State Management** - Use Redux for global state, useState for local
3. **API Calls** - Use custom hooks for reusable logic
4. **Error Handling** - Always provide user feedback with toast notifications
5. **Responsive Design** - Test on mobile, tablet, and desktop
6. **Performance** - Lazy load images and components when needed

---

**Frontend Version:** 1.0.0  
**Built with:** React 18, Vite, Tailwind CSS
