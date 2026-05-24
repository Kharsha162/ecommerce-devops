# CI/CD Pipeline Setup Guide

Complete GitHub Actions CI/CD pipeline for the MERN eCommerce application with automated testing, linting, Docker builds, and image pushes to Docker Hub.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Workflow Files](#workflow-files)
3. [GitHub Secrets Setup](#github-secrets-setup)
4. [Frontend Testing](#frontend-testing)
5. [Backend Testing](#backend-testing)
6. [GitHub Actions Workflows](#github-actions-workflows)
7. [Docker Integration](#docker-integration)
8. [Running Locally](#running-locally)
9. [Troubleshooting](#troubleshooting)

---

## Overview

The CI/CD pipeline includes:

✅ **Frontend Tests** - Vitest with React Testing Library
✅ **Backend Tests** - Jest with Supertest
✅ **Linting** - ESLint for code quality
✅ **Formatting** - Prettier for consistent code style
✅ **Docker Builds** - Automated image building
✅ **Docker Registry** - Push to Docker Hub
✅ **Code Coverage** - Upload to Codecov
✅ **Multi-version Testing** - Node 18.x and 20.x

### Workflow Triggers

- **CI Workflow (ci.yml)**: Runs on every push and pull request
- **Docker Workflow (docker.yml)**: Runs on push to main branch
- **Manual Trigger**: Available via workflow_dispatch
- **Scheduled**: Docker builds weekly on Sundays

---

## Workflow Files

### Location
```
.github/
└── workflows/
    ├── ci.yml          # Continuous Integration pipeline
    └── docker.yml      # Docker build and push workflow
```

### CI Pipeline (ci.yml)

**Triggers:**
- `push` to main and develop branches
- `pull_request` against main and develop

**Jobs:**
1. **frontend-tests** - Tests frontend with Node 18.x and 20.x
2. **backend-tests** - Tests backend with Node 18.x and 20.x (includes MongoDB)
3. **docker-validation** - Validates Docker images can build
4. **code-quality** - Checks ESLint and Prettier
5. **ci-status** - Final status check

### Docker Pipeline (docker.yml)

**Triggers:**
- `push` to main branch
- Manual trigger via `workflow_dispatch`
- Weekly schedule (Sunday 2 AM UTC)

**Jobs:**
1. **build-and-push** - Builds and pushes frontend and backend images
2. **validate-images** - Validates pushed images and docker-compose
3. **notify** - Sends deployment notifications

---

## GitHub Secrets Setup

### Required Secrets for Docker Hub Integration

Add these secrets to your GitHub repository:

1. Go to **Settings → Secrets and variables → Actions**
2. Create new repository secrets:

#### `DOCKER_USERNAME`
- Your Docker Hub username
- Example: `username`

#### `DOCKER_PASSWORD`
- Your Docker Hub access token (NOT password)
- Generate at: https://hub.docker.com/settings/security
- Keep this secret!

#### Optional: `CODECOV_TOKEN`
- For Codecov coverage reports
- Generate at: https://codecov.io/

### How to Generate Docker Hub Access Token

1. Log in to Docker Hub
2. Go to **Account Settings → Security**
3. Click **New Access Token**
4. Name: `github-actions`
5. Permissions: Read, Write
6. Copy the token
7. Add to GitHub Secrets as `DOCKER_PASSWORD`

### Adding Secrets to GitHub

```bash
# Using GitHub CLI
gh secret set DOCKER_USERNAME --body "your-username"
gh secret set DOCKER_PASSWORD --body "your-token"

# Or manually:
# 1. Go to repo Settings
# 2. Secrets and variables → Actions
# 3. New repository secret
```

---

## Frontend Testing

### Setup

All test files are in: `frontend/src/tests/`

**Configuration File:** `frontend/vitest.config.js`

**Test Files:**
- `App.test.jsx` - Application rendering
- `Button.test.jsx` - Button component
- `Navbar.test.jsx` - Navigation component
- `api.test.js` - API mocking tests
- `setup.js` - Global test setup

### Running Frontend Tests Locally

```bash
cd frontend

# Install dependencies
npm install

# Install test dependencies (use --legacy-peer-deps to resolve React types conflicts)
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event @vitest/ui jsdom --legacy-peer-deps

# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch

# Run specific test file
npm test -- App.test.jsx
```

### Test Scripts

Add to `frontend/package.json`:

```json
"scripts": {
  "test": "vitest",
  "test:ui": "vitest --ui",
  "test:coverage": "vitest --coverage",
  "test:watch": "vitest --watch",
  "lint": "eslint src",
  "format": "prettier --write src",
  "format:check": "prettier --check src"
}
```

### Testing Coverage

- **Minimum Coverage:** 70% (configurable)
- **Reporters:** Text, HTML, JSON, LCOV
- **Coverage Report:** `frontend/coverage/index.html`

### Test Examples

**Button Component Test:**
```javascript
it('should call onClick handler when clicked', () => {
  const handleClick = vi.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  const button = screen.getByRole('button');
  fireEvent.click(button);
  expect(handleClick).toHaveBeenCalledOnce();
});
```

---

## Backend Testing

### Setup

All test files are in: `backend/tests/`

**Configuration File:** `backend/jest.config.js`

**Test Files:**
- `auth.test.js` - Authentication API tests
- `products.test.js` - Product CRUD tests
- `protected-routes.test.js` - Authorization tests
- `setup.js` - Global test setup with MongoMemoryServer

### Running Backend Tests Locally

```bash
cd backend

# Install dependencies
npm install

# Install test dependencies
npm install --save-dev jest supertest mongodb-memory-server @types/jest

# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- auth.test.js

# Run tests in watch mode
npm test -- --watch
```

### Test Scripts

Add to `backend/package.json`:

```json
"scripts": {
  "test": "jest",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage",
  "test:verbose": "jest --verbose",
  "lint": "eslint .",
  "format": "prettier --write .",
  "format:check": "prettier --check ."
}
```

### Testing Setup

Uses **MongoMemoryServer** for isolated testing:
- No external database needed
- Clean database between tests
- Fast test execution
- Full MongoDB functionality

### Test Examples

**Authentication Test:**
```javascript
it('should login with correct credentials', async () => {
  const response = await request(app)
    .post('/api/auth/login')
    .send({
      email: 'test@example.com',
      password: 'Password123!',
    });

  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty('token');
});
```

**Protected Routes Test:**
```javascript
it('should deny regular user from accessing admin routes', async () => {
  const response = await request(app)
    .get('/api/admin/users')
    .set('Authorization', `Bearer ${userToken}`);

  expect(response.status).toBe(403);
});
```

### Coverage

- **Minimum Coverage:** 70% (configurable)
- **Test Timeout:** 30 seconds
- **Coverage Report:** `backend/coverage/index.html`

---

## GitHub Actions Workflows

### CI Workflow (ci.yml) - Detailed

#### Triggers
```yaml
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]
```

#### Jobs

**1. frontend-tests**
- Node versions: 18.x, 20.x
- Install dependencies
- Run ESLint
- Run Prettier check
- Run Vitest with coverage
- Upload coverage to Codecov

**2. backend-tests**
- Node versions: 18.x, 20.x
- MongoDB service container
- Install dependencies
- Run ESLint
- Run Prettier check
- Run Jest with coverage
- Upload coverage to Codecov

**3. docker-validation**
- Depends on: frontend-tests, backend-tests
- Validates Dockerfiles can build
- Validates docker-compose.yml syntax
- Uses Docker layer caching

**4. code-quality**
- Runs linting and formatting checks
- Non-blocking (continue-on-error)

**5. ci-status**
- Final check for pipeline success
- Fails if any required job fails

#### Example Run Output

```
✅ frontend-tests (18.x)
✅ frontend-tests (20.x)
✅ backend-tests (18.x)
✅ backend-tests (20.x)
✅ docker-validation
✅ code-quality
✅ CI Pipeline Status: PASSED
```

### Docker Workflow (docker.yml) - Detailed

#### Triggers
```yaml
on:
  push:
    branches: [main]
    paths:
      - 'backend/**'
      - 'frontend/**'
      - 'docker-compose.yml'
      - '.github/workflows/docker.yml'
  workflow_dispatch:
  schedule:
    - cron: '0 2 * * 0'  # Weekly
```

#### Jobs

**1. build-and-push**
- Builds both frontend and backend
- Uses Docker Buildx for multi-platform
- Logs in to Docker Hub securely
- Applies smart tagging:
  - `latest` - for main branch
  - `<branch-name>` - for any branch
  - `v<version>` - for version tags
  - `sha-<commit>` - for commits
- Uses GitHub Actions Cache
- Pushes only on main branch (not on PR)

**2. validate-images**
- Pulls images from Docker Hub
- Validates images exist
- Tests docker-compose with real images
- Only runs on successful build

**3. notify**
- Posts status to PR comments
- Logs deployment information

#### Image Tags

Created images will be tagged as:

```
# On main branch push
docker.io/username/ecommerce-frontend:latest
docker.io/username/ecommerce-frontend:main
docker.io/username/ecommerce-frontend:sha-a1b2c3d

# On PR
docker.io/username/ecommerce-frontend:pr-123-develop
```

---

## Docker Integration

### Docker Hub Setup

1. **Create Docker Hub Account** (if not already)
   - https://hub.docker.com/signup

2. **Create Access Token**
   - Settings → Security → New Access Token
   - Name: `github-actions`
   - Permissions: Read, Write

3. **Add to GitHub Secrets**
   - `DOCKER_USERNAME`: your-username
   - `DOCKER_PASSWORD`: your-access-token

### Image Structure

**Frontend Image**
```
docker.io/username/ecommerce-frontend:latest
- Base: nginx:alpine
- Multi-stage build for size optimization
- SPA routing configured
- Size: ~10-15 MB
```

**Backend Image**
```
docker.io/username/ecommerce-backend:latest
- Base: node:20-slim
- Production dependencies only
- Health checks enabled
- Size: ~150-200 MB
```

### Pulling Built Images Locally

```bash
# Login to Docker Hub
docker login

# Pull images
docker pull username/ecommerce-frontend:latest
docker pull username/ecommerce-backend:latest

# Run with docker-compose
docker-compose up -d
```

### Docker Compose with Registry Images

Update `docker-compose.yml` to use registry images:

```yaml
frontend:
  image: username/ecommerce-frontend:latest
  # instead of: build: ./frontend

backend:
  image: username/ecommerce-backend:latest
  # instead of: build: ./backend

mongodb:
  image: mongo:7.0
```

---

## Running Locally

### Install Dependencies

```bash
# Frontend
cd frontend
npm install
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event @vitest/ui jsdom eslint-plugin-react eslint-plugin-react-hooks prettier --legacy-peer-deps

# Backend
cd ../backend
npm install
npm install --save-dev jest supertest mongodb-memory-server eslint prettier

cd ..
```

### Run Tests Locally

```bash
# Frontend tests
cd frontend
npm test

# Backend tests
cd ../backend
npm test
```

### Run Linting

```bash
# Frontend
cd frontend
npm run lint
npm run format:check

# Backend
cd ../backend
npm run lint
npm run format:check
```

### Fix Formatting Issues

```bash
# Frontend
cd frontend
npm run format

# Backend
cd ../backend
npm run format
```

### Run Docker Compose

```bash
docker-compose up --build
```

---

## Troubleshooting

### GitHub Actions Issues

#### Tests failing on GitHub but passing locally

**Possible causes:**
- Node version mismatch
- Environment variables not set
- MongoDB not running (backend tests)
- Different file permissions

**Solution:**
```bash
# Test with exact GitHub node versions locally
nvm install 18.0.0
nvm use 18.0.0
npm test

nvm install 20.0.0
nvm use 20.0.0
npm test
```

#### Docker build failing

**Check logs:**
1. Go to GitHub Actions tab
2. Click on failing workflow run
3. Expand job logs

**Common issues:**
- Missing Dockerfile
- Dependencies not installing
- Environment variables missing
- Docker context path incorrect

#### Secrets not accessible

**Fix:**
1. Verify secrets are added to repo settings
2. Check secret names match workflow (case-sensitive)
3. Secrets must be created per repo (not per organization by default)

### Docker Issues

#### Docker Hub authentication fails

**Fix:**
```bash
# Verify credentials
docker login
# username: your-docker-hub-username
# password: your-access-token (NOT password)

# If using secret, verify token is valid
# Generate new token if needed
```

#### Image push fails with 403

**Causes:**
- Invalid Docker credentials
- Docker username/token mismatch
- Token permissions too limited

**Fix:**
1. Generate new access token
2. Update GitHub Secrets
3. Re-run workflow

### Test Issues

#### Tests timeout

**Backend tests:**
```javascript
// Increase timeout in jest.config.js
testTimeout: 30000  // 30 seconds
```

**Frontend tests:**
```javascript
// Increase timeout in vitest.config.js
test: {
  hookTimeout: 30000
}
```

#### MongoDB connection fails

**Ensure:**
- MongoDB service is running (for local testing)
- Connection string is correct
- Authentication credentials match

```javascript
// For GitHub Actions, use MongoMemoryServer
// Already configured in tests/setup.js
```

#### Linting errors

**View errors:**
```bash
npm run lint
```

**Fix automatically:**
```bash
npm run format
```

#### Coverage threshold not met

**Options:**
1. Write more tests
2. Lower threshold in config

```javascript
// vitest.config.js or jest.config.js
coverage: {
  lines: 70,
  functions: 70,
  branches: 70,
  statements: 70,
}
```

---

## Monitoring & Best Practices

### Monitor Pipeline Health

1. **GitHub Actions Page**
   - https://github.com/your-repo/actions
   - Check workflow runs
   - View logs and artifacts

2. **Codecov**
   - Coverage trends
   - Failed tests summary
   - Pull request comments

### Best Practices

1. **Keep Tests Fast**
   - Aim for < 5 minutes total CI time
   - Use parallelization (matrix strategy)
   - Mock external services

2. **Meaningful Test Names**
   - Describe what is being tested
   - Example: "should login with valid credentials"

3. **Coverage Goals**
   - Aim for 80%+ coverage
   - Focus on critical paths
   - Don't chase 100%

4. **Code Quality**
   - Run linting before committing
   - Use pre-commit hooks
   - Review ESLint/Prettier configs

5. **Security**
   - Never commit secrets
   - Use GitHub Secrets
   - Rotate access tokens periodically
   - Use least-privilege permissions

### Pre-commit Setup (Optional)

Install husky for local validation:

```bash
# Frontend
cd frontend
npm install --save-dev husky lint-staged
npx husky install
npx husky add .husky/pre-commit "npm run lint && npm run format:check"

# Backend
cd ../backend
npm install --save-dev husky lint-staged
npx husky install
npx husky add .husky/pre-commit "npm run lint && npm run format:check"
```

---

## Success Checklist

- [ ] GitHub Secrets configured (DOCKER_USERNAME, DOCKER_PASSWORD)
- [ ] CI workflow triggers on push/PR
- [ ] Frontend tests passing
- [ ] Backend tests passing
- [ ] Docker images building successfully
- [ ] Images pushing to Docker Hub
- [ ] ESLint passing
- [ ] Prettier formatting correct
- [ ] Coverage thresholds met
- [ ] Docker Compose with registry images working

---

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docker GitHub Action](https://github.com/docker/build-push-action)
- [Vitest Documentation](https://vitest.dev/)
- [Jest Documentation](https://jestjs.io/)
- [Docker Hub](https://hub.docker.com/)
- [Codecov](https://codecov.io/)

---

**CI/CD setup complete! 🎉**

Your MERN application now has production-ready continuous integration and deployment.
