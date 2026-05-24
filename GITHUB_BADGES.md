# GitHub Actions Status Badges

Add these badges to your README.md to display CI/CD pipeline status:

## Markdown Code

### CI Pipeline Badge
```markdown
[![CI/CD Pipeline](https://github.com/YOUR_USERNAME/YOUR_REPO/actions/workflows/ci.yml/badge.svg)](https://github.com/YOUR_USERNAME/YOUR_REPO/actions/workflows/ci.yml)
```

### Docker Build Badge
```markdown
[![Docker Build](https://github.com/YOUR_USERNAME/YOUR_REPO/actions/workflows/docker.yml/badge.svg)](https://github.com/YOUR_USERNAME/YOUR_REPO/actions/workflows/docker.yml)
```

### Combined Badges
```markdown
[![CI/CD Pipeline](https://github.com/YOUR_USERNAME/YOUR_REPO/actions/workflows/ci.yml/badge.svg)](https://github.com/YOUR_USERNAME/YOUR_REPO/actions/workflows/ci.yml)
[![Docker Build](https://github.com/YOUR_USERNAME/YOUR_REPO/actions/workflows/docker.yml/badge.svg)](https://github.com/YOUR_USERNAME/YOUR_REPO/actions/workflows/docker.yml)
```

## Add to README

Replace `YOUR_USERNAME` and `YOUR_REPO` with your actual GitHub username and repository name.

Example:
```markdown
# eCommerce MERN Application

[![CI/CD Pipeline](https://github.com/kharshavardhan/ecommerce/actions/workflows/ci.yml/badge.svg)](https://github.com/kharshavardhan/ecommerce/actions/workflows/ci.yml)
[![Docker Build](https://github.com/kharshavardhan/ecommerce/actions/workflows/docker.yml/badge.svg)](https://github.com/kharshavardhan/ecommerce/actions/workflows/docker.yml)

Complete MERN stack eCommerce application with automated CI/CD pipeline...
```

## Badge Options

### Different Styles

#### Flat Style (default)
```
https://github.com/USERNAME/REPO/actions/workflows/WORKFLOW.yml/badge.svg
```

#### Flat Square
```
https://github.com/USERNAME/REPO/actions/workflows/WORKFLOW.yml/badge.svg?style=flat-square
```

#### Plastic
```
https://github.com/USERNAME/REPO/actions/workflows/WORKFLOW.yml/badge.svg?style=plastic
```

#### For-the-Badge
```
https://github.com/USERNAME/REPO/actions/workflows/WORKFLOW.yml/badge.svg?style=for-the-badge
```

## Codecov Coverage Badge

If using Codecov for coverage reports:

```markdown
[![codecov](https://codecov.io/gh/YOUR_USERNAME/YOUR_REPO/branch/main/graph/badge.svg)](https://codecov.io/gh/YOUR_USERNAME/YOUR_REPO)
```

## Docker Hub Badge

For Docker images on Docker Hub:

```markdown
[![Docker Image](https://img.shields.io/docker/v/YOUR_USERNAME/ecommerce-frontend?label=Frontend&style=flat-square)](https://hub.docker.com/r/YOUR_USERNAME/ecommerce-frontend)
[![Docker Image](https://img.shields.io/docker/v/YOUR_USERNAME/ecommerce-backend?label=Backend&style=flat-square)](https://hub.docker.com/r/YOUR_USERNAME/ecommerce-backend)
```

## Full README Example

```markdown
# eCommerce MERN Application

![GitHub Workflow Status](https://github.com/YOUR_USERNAME/ecommerce/actions/workflows/ci.yml/badge.svg)
[![codecov](https://codecov.io/gh/YOUR_USERNAME/ecommerce/branch/main/graph/badge.svg)](https://codecov.io/gh/YOUR_USERNAME/ecommerce)
[![Docker Hub](https://img.shields.io/badge/Docker-Frontend%20%7C%20Backend-blue?logo=docker)](https://hub.docker.com/r/YOUR_USERNAME)

## 🚀 Quick Start

### With Docker Compose
```bash
docker-compose up --build
```

### Local Development
```bash
# Frontend
cd frontend
npm install
npm run dev

# Backend
cd backend
npm install
npm run dev
```

## 🧪 Testing

### Frontend
```bash
cd frontend
npm test              # Run tests
npm test -- --ui     # With UI
npm test -- --coverage  # With coverage
```

### Backend
```bash
cd backend
npm test              # Run tests
npm test -- --coverage  # With coverage
```

## 📦 CI/CD Pipeline

- ✅ Automated tests on every push/PR
- ✅ ESLint code quality checks
- ✅ Prettier code formatting
- ✅ Docker image building
- ✅ Docker Hub image pushing
- ✅ Coverage reporting

See [CICD_COMPLETE_SUMMARY.md](CICD_COMPLETE_SUMMARY.md) for details.

## 📚 Documentation

- [Docker Setup](DOCKER_DEPLOYMENT.md)
- [CI/CD Guide](CI_CD_SETUP_GUIDE.md)
- [Quick Start](CICD_QUICK_START.md)
- [API Documentation](BACKEND_API.md)

---

Built with Node.js, React, MongoDB, and Express
```

## View Status

Once you push code:

1. Go to `https://github.com/YOUR_USERNAME/YOUR_REPO/actions`
2. Badges will show current workflow status
3. Click badge to see detailed logs

## Notes

- Badges automatically update based on latest workflow run
- Only shows status for default branch (main)
- Click badge to navigate to Actions page
- Different badge styles available via shield.io

---

**Your CI/CD pipeline status is now visible to everyone! 🎉**
