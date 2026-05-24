# Troubleshooting Guide

Comprehensive troubleshooting solutions for common issues.

## Backend Issues

### MongoDB Connection Failed

**Error:** `Cannot connect to MongoDB` or `ECONNREFUSED`

**Solutions:**
1. **Check if MongoDB is running**
   ```bash
   # macOS
   brew services list
   
   # Windows
   # Check Services > MongoDB Server
   
   # Linux
   sudo systemctl status mongod
   ```

2. **Verify connection string**
   ```
   Local: mongodb://localhost:27017/ecommerce
   Atlas: mongodb+srv://user:password@cluster.mongodb.net/ecommerce
   ```

3. **Check MongoDB URI in .env**
   ```bash
   # Should be set correctly
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
   ```

4. **Whitelist IP (MongoDB Atlas)**
   - Go to Network Access in MongoDB Atlas
   - Add your IP address (or 0.0.0.0 for testing)

5. **Test connection manually**
   ```bash
   # Install MongoDB CLI
   npm install -g mongodb-cli-tools
   
   # Test connection
   mongosh "mongodb://localhost:27017"
   ```

---

### Port 5000 Already in Use

**Error:** `EADDRINUSE: address already in use :::5000`

**Solutions:**
```bash
# macOS/Linux - Find and kill process
lsof -i :5000
kill -9 <PID>

# Windows - Find and kill process
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Use different port
PORT=3000 npm run dev
```

---

### JWT Secret Not Set

**Error:** `JWT secret is required` or undefined JWT_SECRET

**Solutions:**
```bash
# Generate strong secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Add to .env
JWT_SECRET=your_generated_secret_here

# Restart server
npm run dev
```

---

### CORS Error from Frontend

**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solutions:**
1. **Verify .env settings**
   ```
   CLIENT_URL=http://localhost:5173
   API_URL=http://localhost:5000
   ```

2. **Check server.js CORS configuration**
   ```javascript
   app.use(cors({
     origin: process.env.CLIENT_URL,
     credentials: true
   }));
   ```

3. **Restart backend after .env changes**
   ```bash
   npm run dev
   ```

4. **Test with curl**
   ```bash
   curl -H "Origin: http://localhost:5173" \
     -H "Access-Control-Request-Method: GET" \
     http://localhost:5000/api/products
   ```

---

### Password Hashing Issues

**Error:** `bcrypt error` or undefined password comparison

**Solutions:**
1. **Check bcrypt is installed**
   ```bash
   npm list bcryptjs
   ```

2. **Verify User model pre-hook**
   ```javascript
   userSchema.pre('save', async function(next) {
     if (!this.isModified('password')) return next();
     this.password = await bcryptjs.hash(this.password, 10);
     next();
   });
   ```

3. **Check password comparison**
   ```javascript
   const isMatch = await bcryptjs.compare(password, user.password);
   ```

---

### Validation Errors

**Error:** `Validation error` or `Invalid email format`

**Solutions:**
1. **Check validator middleware is applied**
   ```javascript
   // routes/auth.js
   app.post('/register', validationRules.register, handleValidationErrors, register);
   ```

2. **Verify validation rules**
   ```javascript
   body('email').isEmail().normalizeEmail()
   body('password').isLength({ min: 6 })
   body('name').isLength({ min: 3 })
   ```

3. **Send properly formatted data**
   ```javascript
   const data = {
     name: "John Doe",
     email: "john@example.com",
     password: "Password123"
   }
   ```

---

### Seed Script Errors

**Error:** Seed script fails or doesn't populate data

**Solutions:**
```bash
# 1. Check MongoDB is running
mongosh

# 2. Run seed with verbose output
node seed.js

# 3. Check seed.js for syntax errors
npm run dev && node seed.js

# 4. Clear collections before seeding
# In MongoDB:
# db.users.deleteMany({})
# db.products.deleteMany({})

# 5. Manual seed if script fails
# Copy data directly in MongoDB Compass
```

---

## Frontend Issues

### Port 5173 Already in Use

**Error:** `Port 5173 is already in use`

**Solutions:**
```bash
# macOS/Linux
lsof -i :5173
kill -9 <PID>

# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Use different port
npm run dev -- --port 3001
```

---

### API Connection Errors

**Error:** `Failed to fetch from API` or `Cannot GET /api/products`

**Solutions:**
1. **Check VITE_API_URL in .env**
   ```
   VITE_API_URL=http://localhost:5000
   ```

2. **Verify backend is running**
   ```bash
   cd backend
   npm run dev
   # Should show: Server running on port 5000
   ```

3. **Check API client configuration**
   ```javascript
   // utils/apiClient.js
   const instance = axios.create({
     baseURL: import.meta.env.VITE_API_URL,
     timeout: 10000
   });
   ```

4. **Test API manually**
   ```bash
   curl http://localhost:5000/api/products
   ```

---

### Redux State Not Persisting

**Error:** State resets on page refresh

**Solutions:**
1. **Check localStorage keys**
   ```javascript
   // In browser console
   console.log(localStorage);
   // Should show: token, user, cart, wishlist
   ```

2. **Verify storage utility**
   ```javascript
   // utils/storage.js
   export const getToken = () => localStorage.getItem('token');
   export const setToken = (token) => localStorage.setItem('token', token);
   ```

3. **Check App.jsx initialization**
   ```javascript
   useEffect(() => {
     const token = localStorage.getItem('token');
     if (token) {
       dispatch(loginSuccess({ user, token }));
     }
   }, []);
   ```

4. **Clear localStorage and test**
   ```javascript
   // In browser console
   localStorage.clear();
   ```

---

### JWT Token Issues

**Error:** `401 Unauthorized` or `Invalid token`

**Solutions:**
1. **Check token in localStorage**
   ```javascript
   // Browser console
   console.log(localStorage.getItem('token'));
   ```

2. **Verify token format**
   ```javascript
   // Should be: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

3. **Check authorization header**
   ```javascript
   // utils/apiClient.js interceptor
   config.headers.Authorization = `Bearer ${token}`;
   ```

4. **Test with curl**
   ```bash
   curl -H "Authorization: Bearer YOUR_TOKEN" \
     http://localhost:5000/api/auth/me
   ```

5. **Re-login if token expired**
   ```javascript
   // Happens automatically on 401 response
   ```

---

### Components Not Rendering

**Error:** Blank page or components missing

**Solutions:**
1. **Check browser console for errors**
   - F12 or Cmd+Option+I
   - Look for red error messages

2. **Verify component imports**
   ```javascript
   import Button from '../components/Button';
   import { useAuth } from '../hooks/useAuth';
   ```

3. **Check Redux provider in App.jsx**
   ```javascript
   <Provider store={store}>
     <App />
   </Provider>
   ```

4. **Verify routes are configured**
   ```javascript
   // App.jsx should have routes defined
   <Routes>
     <Route path="/" element={<Dashboard />} />
     <Route path="/admin" element={<AdminDashboard />} />
   </Routes>
   ```

---

### Styling Issues

**Error:** Tailwind classes not applying

**Solutions:**
1. **Check Tailwind config**
   ```javascript
   // tailwind.config.js
   content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"]
   ```

2. **Verify CSS file imported**
   ```javascript
   // main.jsx
   import './styles/globals.css'
   ```

3. **Check PostCSS config**
   ```javascript
   // postcss.config.js
   module.exports = {
     plugins: {
       tailwindcss: {},
       autoprefixer: {},
     },
   }
   ```

4. **Rebuild CSS**
   ```bash
   npm run dev
   ```

---

### Form Validation Not Working

**Error:** Form submits with invalid data

**Solutions:**
1. **Add form validation**
   ```javascript
   const validateForm = () => {
     const errors = {};
     if (!email) errors.email = 'Email required';
     if (password.length < 6) errors.password = 'Min 6 chars';
     return errors;
   };
   ```

2. **Display error messages**
   ```jsx
   {errors.email && <span className="text-red-500">{errors.email}</span>}
   ```

3. **Prevent invalid submission**
   ```javascript
   const handleSubmit = (e) => {
     e.preventDefault();
     const errors = validateForm();
     if (Object.keys(errors).length > 0) {
       setErrors(errors);
       return;
     }
     // Submit
   };
   ```

---

### Images Not Loading

**Error:** Broken image icons

**Solutions:**
1. **Check image URLs are correct**
   ```javascript
   <img src={product.image} alt={product.title} />
   ```

2. **Add fallback image**
   ```jsx
   <img 
     src={product.image || '/placeholder.png'} 
     alt={product.title}
     onError={(e) => e.target.src = '/placeholder.png'}
   />
   ```

3. **Verify CORS for external images**
   - Use same-origin images or CORS proxy

---

## Common Runtime Errors

### TypeError: Cannot read property 'X' of undefined

**Solutions:**
1. **Add optional chaining**
   ```javascript
   const name = user?.profile?.name;
   ```

2. **Add null checks**
   ```javascript
   if (user && user.profile) {
     return user.profile.name;
   }
   ```

3. **Use default values**
   ```javascript
   const { name = 'Guest' } = user || {};
   ```

---

### ReferenceError: X is not defined

**Solutions:**
1. **Check variable is declared**
   ```javascript
   const x = 'value'; // ✓ Declared
   console.log(x); // ✓ Works
   ```

2. **Verify imports**
   ```javascript
   import { functionName } from './utils'; // ✓ Imported
   ```

3. **Check scope**
   ```javascript
   function myFunc() {
     const x = 1;
   }
   console.log(x); // ✗ Out of scope
   ```

---

## Performance Issues

### Slow Page Load

**Solutions:**
1. **Check network tab**
   - DevTools → Network
   - Identify large requests
   - Optimize API responses

2. **Optimize bundle**
   ```bash
   npm run build
   # Check dist folder size
   ```

3. **Lazy load components**
   ```javascript
   const AdminDashboard = lazy(() => import('./AdminDashboard'));
   ```

4. **Implement pagination**
   ```javascript
   const [page, setPage] = useState(1);
   const { products } = useProducts({ page });
   ```

---

### High Memory Usage

**Solutions:**
1. **Stop background processes**
   ```bash
   # Kill unnecessary terminals
   # Close unused browser tabs
   ```

2. **Restart development server**
   ```bash
   npm run dev
   ```

3. **Clear cache**
   ```bash
   rm -rf node_modules
   npm install
   ```

---

## Debugging Tips

### Enable Debug Mode
```javascript
// In utils/apiClient.js
if (process.env.DEBUG === 'true') {
  console.log('API Request:', config);
  console.log('Response:', response);
}
```

### Browser DevTools
- F12 or Cmd+Shift+I
- Console tab for errors
- Network tab for API calls
- Storage tab for localStorage
- Application tab for cookies

### React DevTools Extension
- Install from Chrome Web Store
- Inspect component props
- Check Redux state

### Network Requests
```bash
# See all network requests
curl -v http://localhost:5000/api/products
```

---

## Getting Help

1. **Check error message carefully** - They often explain the issue
2. **Search error online** - Copy exact error message
3. **Review code context** - Look at surrounding code
4. **Check documentation** - BACKEND_API.md, FRONTEND_GUIDE.md
5. **Simplify code** - Remove parts until it works
6. **Test in isolation** - Create minimal reproducible example

---

## Prevention Tips

1. ✅ Always use `.env.example` as reference
2. ✅ Don't commit `.env` files to git
3. ✅ Restart servers after env changes
4. ✅ Check console regularly during development
5. ✅ Test API endpoints with curl first
6. ✅ Validate all user input
7. ✅ Handle all error cases
8. ✅ Use TypeScript or JSDoc for type safety
9. ✅ Add comprehensive error messages
10. ✅ Keep dependencies updated

---

**Happy Debugging! 🐛🔍**
