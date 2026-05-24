# Installation & Setup Checklist

Use this checklist to ensure your eCommerce application is properly set up and ready to use.

## ✅ Pre-Installation Requirements

### System Check
- [ ] Node.js (v14+) installed - `node -v` should show version
- [ ] npm (v6+) installed - `npm -v` should show version
- [ ] Git installed - `git -v` should show version
- [ ] Terminal/Command prompt working
- [ ] Text editor (VS Code, WebStorm, etc.)
- [ ] MongoDB accessible (local or Atlas)

### Check Command
```bash
node -v && npm -v && git -v
# All should show version numbers
```

---

## 🗂️ Project Structure Check

After downloading/cloning the project:

```bash
cd c:\Users\Kharshavardhan\Documents\e-Commerce\ Devops

# Check structure
ls -la
# Should show:
# - backend/
# - frontend/
# - *.md files
# - .gitignore
```

- [ ] backend/ folder exists
- [ ] frontend/ folder exists
- [ ] .md documentation files present
- [ ] .gitignore files in place

---

## 🗄️ MongoDB Setup

### Option A: Local MongoDB

**macOS:**
```bash
# Install
brew tap mongodb/brew
brew install mongodb-community

# Start
brew services start mongodb-community

# Check
mongosh
> exit
```
- [ ] MongoDB installed
- [ ] MongoDB service running
- [ ] mongosh working

**Windows:**
```
1. Download from https://www.mongodb.com/try/download/community
2. Run installer
3. Accept defaults
4. MongoDB Compass installs automatically
```
- [ ] MongoDB downloaded and installed
- [ ] MongoDB service running
- [ ] MongoDB Compass accessible

**Linux:**
```bash
# Install
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start
sudo systemctl start mongod
sudo systemctl enable mongod

# Check
mongosh
> exit
```
- [ ] MongoDB installed
- [ ] MongoDB service enabled
- [ ] MongoDB running

### Option B: MongoDB Atlas (Cloud)

```
1. Go to https://www.mongodb.com/cloud/atlas
2. Create account
3. Create free cluster
4. Add network access (0.0.0.0 for testing)
5. Create database user
6. Get connection string
7. Format: mongodb+srv://user:pass@cluster.mongodb.net/ecommerce
```
- [ ] Atlas account created
- [ ] Cluster created
- [ ] Network access configured
- [ ] Database user created
- [ ] Connection string ready

---

## 📦 Backend Setup

### Step 1: Navigate to Backend
```bash
cd backend
```
- [ ] Inside backend directory

### Step 2: Install Dependencies
```bash
npm install
# Should take 1-2 minutes
```
- [ ] npm install completed without errors
- [ ] node_modules/ folder created (check: `ls -la`)
- [ ] package-lock.json created

### Step 3: Create .env File
```bash
# Copy from example
cp .env.example .env

# Edit .env with:
# MONGODB_URI=your_mongodb_uri
# PORT=5000
# JWT_SECRET=your_secret_key
# NODE_ENV=development
```

**To generate JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

- [ ] .env file created
- [ ] MONGODB_URI set correctly
- [ ] JWT_SECRET set to random string
- [ ] PORT=5000 configured
- [ ] NODE_ENV=development

### Step 4: Test Backend Start
```bash
npm run dev
# Should show:
# ✅ MongoDB Connected
# 🚀 Server running on port 5000
```

- [ ] Backend starts without errors
- [ ] Server shows port 5000
- [ ] MongoDB connection successful
- [ ] No red error messages

### Step 5: Stop Backend (Ctrl+C)
```bash
# Press Ctrl+C to stop
```
- [ ] Backend stopped cleanly

### Step 6: Seed Database (Optional but Recommended)
```bash
node seed.js
# Should show success messages with test data
```
- [ ] Seed script runs successfully
- [ ] Sample products created
- [ ] Sample users created

---

## 🎨 Frontend Setup

### Step 1: Navigate to Frontend
```bash
# From project root
cd frontend
# OR from backend
cd ../frontend
```
- [ ] Inside frontend directory

### Step 2: Install Dependencies
```bash
npm install
# Should take 1-2 minutes
```
- [ ] npm install completed without errors
- [ ] node_modules/ folder created
- [ ] package-lock.json created

### Step 3: Create .env File
```bash
# Copy from example
cp .env.example .env

# Edit .env with:
# VITE_API_URL=http://localhost:5000
# VITE_API_TIMEOUT=10000
# VITE_APP_NAME=eCommerce
```

- [ ] .env file created
- [ ] VITE_API_URL=http://localhost:5000
- [ ] VITE_API_TIMEOUT=10000

### Step 4: Test Frontend Start
```bash
npm run dev
# Should show:
# VITE v4.5.0 ready in XXX ms
# ➜  Local: http://localhost:5173
```

- [ ] Frontend starts without errors
- [ ] Port 5173 shows in output
- [ ] Local URL displays (http://localhost:5173)
- [ ] No build errors

### Step 5: Open in Browser
```
http://localhost:5173
```
- [ ] Website loads in browser
- [ ] No blank pages
- [ ] No red console errors
- [ ] Styling looks good

### Step 6: Stop Frontend (Ctrl+C)
```bash
# Press Ctrl+C to stop
```
- [ ] Frontend stopped cleanly

---

## 🔐 Authentication Test

### Test Backend Authentication API

```bash
# Test registration endpoint
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "Test@123456",
    "role": "user"
  }'

# Should return: { success: true, user: {...}, token: "..." }
```
- [ ] Registration endpoint works
- [ ] Returns success response
- [ ] Token generated

```bash
# Test login endpoint
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@ecommerce.com",
    "password": "Admin@123"
  }'

# Should return: { success: true, user: {...}, token: "..." }
```
- [ ] Login endpoint works
- [ ] Returns token
- [ ] User data included

---

## 🧪 Full Application Test

### Start Both Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
- [ ] Backend running on port 5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
- [ ] Frontend running on port 5173

### Test in Browser

1. **Open http://localhost:5173**
   - [ ] Website loads
   - [ ] No errors in console (F12)

2. **Test Login**
   - [ ] Go to Login page
   - [ ] Enter: admin@ecommerce.com / Admin@123
   - [ ] Click "Sign In"
   - [ ] Should redirect to dashboard
   - [ ] User name displays in navbar

3. **Test User Features**
   - [ ] View products on dashboard
   - [ ] Search/filter products
   - [ ] Click on a product
   - [ ] View product details
   - [ ] Leave a review
   - [ ] Add to cart
   - [ ] View cart

4. **Test Admin Features**
   - [ ] Logout
   - [ ] Login as admin
   - [ ] Navigate to Admin Dashboard
   - [ ] View statistics
   - [ ] Go to Products tab
   - [ ] See product list
   - [ ] Go to Users tab
   - [ ] See user list

5. **Test Logout**
   - [ ] Click logout in navbar
   - [ ] Redirected to login page
   - [ ] Cannot access protected pages

---

## 🛠️ Verification Checklist

### Backend Verification

```bash
cd backend

# Check .env file
[ -f .env ] && echo "✅ .env exists" || echo "❌ .env missing"

# Check key dependencies
npm list mongodb mongoose express jsonwebtoken bcryptjs

# Test server start
npm run dev
# Look for:
# ✅ MongoDB Connected
# 🚀 Server running on port 5000

# Stop server (Ctrl+C)
```

- [ ] .env file exists and is configured
- [ ] All dependencies installed
- [ ] Server starts successfully
- [ ] MongoDB connects
- [ ] No error messages

### Frontend Verification

```bash
cd frontend

# Check .env file
[ -f .env ] && echo "✅ .env exists" || echo "❌ .env missing"

# Check key dependencies
npm list react redux react-router-dom

# Test frontend start
npm run dev
# Look for:
# ✅ VITE ready in XXX ms
# ➜  Local: http://localhost:5173

# Stop (Ctrl+C)
```

- [ ] .env file exists and is configured
- [ ] All dependencies installed
- [ ] Frontend starts successfully
- [ ] Vite build shows no errors
- [ ] Port 5173 shows correctly

---

## 🐛 Troubleshooting During Setup

### Port Already in Use

**Error:** `EADDRINUSE: address already in use :::5000`

**Solution:**
```bash
# Find and kill process (macOS/Linux)
lsof -i :5000
kill -9 <PID>

# Or use different port
PORT=3000 npm run dev

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```
- [ ] Port conflict resolved

### MongoDB Connection Failed

**Error:** `Cannot connect to MongoDB`

**Solutions:**
```bash
# Check MongoDB is running
mongosh

# Or verify connection string in .env
MONGODB_URI=mongodb://localhost:27017/ecommerce

# For Atlas, verify:
# 1. Cluster is running
# 2. IP whitelist includes your IP
# 3. Database user exists
# 4. Connection string is correct
```
- [ ] MongoDB running
- [ ] Connection string correct
- [ ] IP whitelisted (if using Atlas)

### Node Modules Issues

**Error:** Missing dependencies or installation fails

**Solution:**
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install

# If still issues, clear cache
npm cache clean --force
npm install
```
- [ ] Dependencies reinstalled
- [ ] No errors during install

### CORS Errors

**Error:** `Access to XMLHttpRequest blocked by CORS`

**Solutions:**
1. Verify backend .env has CLIENT_URL
2. Verify frontend .env has VITE_API_URL
3. Restart both servers
4. Clear browser cache (Ctrl+Shift+Del)

- [ ] Backend .env configured
- [ ] Frontend .env configured
- [ ] Servers restarted
- [ ] Cache cleared

---

## 📱 Final Verification Tests

### Desktop (1920x1080)
- [ ] Login page displays correctly
- [ ] Dashboard shows product grid
- [ ] Navbar has all elements
- [ ] Admin dashboard visible
- [ ] No horizontal scrolling

### Tablet (768x1024)
- [ ] Layout is responsive
- [ ] Mobile menu doesn't show
- [ ] All features accessible
- [ ] Text is readable

### Mobile (375x667)
- [ ] Mobile menu works
- [ ] Hamburger menu toggles
- [ ] Single column layout
- [ ] Buttons are clickable
- [ ] No overflow issues

---

## 💾 Backup Checklist

Before starting development:

- [ ] Backup .env files (save passwords safely)
- [ ] Backup database (MongoDB backup)
- [ ] Git initialized (git init)
- [ ] First commit made (git add . && git commit -m "initial commit")

---

## 📚 Documentation Review

Before starting development:

- [ ] Read README.md
- [ ] Read QUICK_START.md
- [ ] Read BACKEND_API.md
- [ ] Read FRONTEND_GUIDE.md
- [ ] Bookmarked TROUBLESHOOTING.md
- [ ] Bookmarked DOCUMENTATION_INDEX.md

---

## 🎉 Setup Complete!

If all checkboxes are marked:

✅ Backend configured and running  
✅ Frontend configured and running  
✅ Database connected  
✅ Authentication working  
✅ Features tested  
✅ Responsive design verified  
✅ Documentation reviewed  

**You're ready to:**
1. Start developing
2. Deploy to production
3. Customize for your needs

---

## 🚀 Next Steps

### For Development
1. Open both terminal windows
2. Run `npm run dev` in each
3. Open http://localhost:5173
4. Start modifying and adding features

### For Deployment
1. Read DEPLOYMENT.md
2. Choose your platform
3. Follow platform-specific instructions
4. Deploy!

### For Troubleshooting
1. Check browser console (F12)
2. Check server logs
3. Read TROUBLESHOOTING.md
4. Check documentation

---

## 📞 Need Help?

1. **Setup Issues** → Check QUICK_START.md
2. **Feature Questions** → Check FRONTEND_GUIDE.md
3. **API Questions** → Check BACKEND_API.md
4. **Troubleshooting** → Check TROUBLESHOOTING.md
5. **Architecture** → Check PROJECT_SUMMARY.md

---

**Setup Guide Complete! 🎊**

Print this checklist and tick off items as you complete them. Happy coding! 💻
