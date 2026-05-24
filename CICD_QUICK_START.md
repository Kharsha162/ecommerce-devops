# GitHub Secrets Setup - Quick Reference

## Step 1: Generate Docker Hub Access Token

1. Go to https://hub.docker.com/settings/security
2. Click **New Access Token**
3. Name: `github-actions`
4. Permissions: Check "Read" and "Write"
5. Click **Generate**
6. Copy the token (you'll only see it once)

## Step 2: Add Secrets to GitHub Repository

### Using GitHub Web Interface

1. Go to your repository on GitHub
2. Click **Settings**
3. Go to **Secrets and variables → Actions**
4. Click **New repository secret**
5. Add these secrets:

| Name | Value |
|------|-------|
| `DOCKER_USERNAME` | Your Docker Hub username |
| `DOCKER_PASSWORD` | Your Docker access token (from Step 1) |

### Using GitHub CLI

```bash
gh secret set DOCKER_USERNAME --body "your-docker-username"
gh secret set DOCKER_PASSWORD --body "your-docker-token"
```

## Step 3: Install Test Dependencies

### Frontend

```bash
cd frontend
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event @vitest/ui jsdom --legacy-peer-deps
npm install --save-dev eslint-plugin-react eslint-plugin-react-hooks prettier --legacy-peer-deps
```

**Note:** `--legacy-peer-deps` resolves React types version conflicts with @testing-library/react.

### Backend

```bash
cd ../backend
npm install --save-dev jest supertest mongodb-memory-server
npm install --save-dev eslint prettier
```

## Step 4: Add Test Scripts to package.json

### Frontend

```json
"scripts": {
  "test": "vitest",
  "test:ui": "vitest --ui",
  "test:coverage": "vitest --coverage --run",
  "lint": "eslint src",
  "format": "prettier --write src",
  "format:check": "prettier --check src"
}
```

### Backend

```json
"scripts": {
  "test": "jest",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage",
  "lint": "eslint .",
  "format": "prettier --write .",
  "format:check": "prettier --check ."
}
```

## Step 5: Verify Setup

### Run Tests Locally

```bash
# Frontend
cd frontend
npm test

# Backend
cd ../backend
npm test
```

### Check Linting

```bash
# Frontend
cd frontend
npm run lint

# Backend
cd ../backend
npm run lint
```

## Step 6: Push and Trigger Workflows

```bash
git add .
git commit -m "Add CI/CD pipeline"
git push origin main
```

Go to **Actions** tab to see workflows running.

## Files Created

### Configuration Files
- `.github/workflows/ci.yml` - CI pipeline
- `.github/workflows/docker.yml` - Docker build & push
- `frontend/vitest.config.js` - Frontend test config
- `frontend/.eslintrc.json` - Frontend linting
- `frontend/.prettierrc.json` - Frontend formatting
- `backend/jest.config.js` - Backend test config
- `backend/.eslintrc.json` - Backend linting
- `backend/.prettierrc.json` - Backend formatting

### Frontend Tests
- `frontend/src/tests/setup.js`
- `frontend/src/tests/App.test.jsx`
- `frontend/src/tests/Button.test.jsx`
- `frontend/src/tests/Navbar.test.jsx`
- `frontend/src/tests/api.test.js`

### Backend Tests
- `backend/tests/setup.js`
- `backend/tests/auth.test.js`
- `backend/tests/products.test.js`
- `backend/tests/protected-routes.test.js`

## Troubleshooting

### Tests failing in GitHub Actions but passing locally?

```bash
# Test with exact Node versions
nvm install 18.0.0
npm test

nvm install 20.0.0
npm test
```

### Docker push fails?

1. Verify token is valid (not password)
2. Check secret names are exact
3. Verify Docker Hub account permissions

### CI workflow stuck?

1. Check GitHub Actions page for logs
2. Verify all dependencies installed
3. Check environment variables in workflows

---

**All set! 🚀 Your CI/CD pipeline is ready!**

See `CI_CD_SETUP_GUIDE.md` for detailed documentation.
