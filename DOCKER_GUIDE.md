# Docker & Docker Compose Setup Guide

## Overview

This guide provides complete instructions for running the MERN eCommerce application using Docker and Docker Compose.

**Final Result:**
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`
- MongoDB: `localhost:27017`
- Nginx (optional): `http://localhost:80`

---

## Prerequisites

### Required Software
- **Docker Desktop** (includes Docker & Docker Compose)
  - macOS: https://www.docker.com/products/docker-desktop
  - Windows: https://www.docker.com/products/docker-desktop
  - Linux: `sudo apt-get install docker.io docker-compose`

### Verify Installation
```bash
docker --version
docker compose --version
```

---

## Project Structure

```
ecommerce/
├── backend/
│   ├── Dockerfile              # Backend container image
│   ├── .dockerignore          # Files to exclude from Docker build
│   ├── package.json
│   ├── server.js
│   ├── .env.docker            # Docker-specific env vars
│   └── ... (other backend files)
│
├── frontend/
│   ├── Dockerfile             # Frontend container image
│   ├── .dockerignore          # Files to exclude from Docker build
│   ├── package.json
│   ├── vite.config.js
│   ├── .env.docker            # Docker-specific env vars
│   └── ... (other frontend files)
│
├── docker-compose.yml         # Docker Compose orchestration
├── .env.docker               # Root environment variables
├── nginx.conf                # Nginx reverse proxy configuration
└── README.md
```

---

## Quick Start (5 minutes)

### Option 1: Development Mode (with volumes for live reload)

```bash
# 1. Clone/navigate to project root
cd ecommerce

# 2. Build and start all services
docker compose up --build

# 3. Access the application
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
# MongoDB: localhost:27017

# 4. Stop all services
docker compose down
```

### Option 2: Production Mode

```bash
# 1. Set production environment
set NODE_ENV=production

# 2. Build and start all services
docker compose -f docker-compose.yml up --build -d

# 3. View logs
docker compose logs -f

# 4. Stop services
docker compose down
```

---

## Detailed Docker Commands

### Starting Services

#### Build and Start (Fresh Build)
```bash
docker compose up --build
```

#### Build and Start in Background
```bash
docker compose up --build -d
```

#### Start without Building (if images already exist)
```bash
docker compose up
```

#### Restart Services
```bash
docker compose restart
```

---

### Stopping Services

#### Stop All Services (keeps containers)
```bash
docker compose stop
```

#### Stop All and Remove Containers
```bash
docker compose down
```

#### Stop Specific Service
```bash
docker compose stop backend
docker compose stop frontend
docker compose stop mongodb
```

---

### Viewing Logs

#### View All Logs
```bash
docker compose logs
```

#### View Logs in Real-time
```bash
docker compose logs -f
```

#### View Specific Service Logs
```bash
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f mongodb
```

#### View Last 100 Lines
```bash
docker compose logs --tail=100
```

---

### Image & Container Management

#### List Running Containers
```bash
docker compose ps
```

#### List All Containers (including stopped)
```bash
docker ps -a
```

#### Remove Containers
```bash
docker compose down
```

#### Remove Containers and Volumes
```bash
docker compose down -v
```

#### Remove Images
```bash
docker compose down --rmi all
```

#### Remove Specific Image
```bash
docker rmi ecommerce-frontend:latest
docker rmi ecommerce-backend:latest
```

#### Remove Dangling Images
```bash
docker image prune -a
```

---

### Debugging & Inspection

#### Execute Command in Container
```bash
# Connect to backend
docker compose exec backend sh

# Connect to frontend
docker compose exec frontend sh

# Connect to MongoDB
docker compose exec mongodb mongosh -u admin -p password
```

#### View Container Details
```bash
docker compose logs mongodb --tail=50
```

#### Inspect Network
```bash
docker network ls
docker network inspect ecommerce_ecommerce-network
```

#### Check Container Health
```bash
docker compose ps
# Look at STATUS column for healthy/unhealthy
```

---

### Building Individual Images

#### Build Frontend Image Only
```bash
docker build -f frontend/Dockerfile -t ecommerce-frontend:latest ./frontend
```

#### Build Backend Image Only
```bash
docker build -f backend/Dockerfile -t ecommerce-backend:latest ./backend
```

#### Build with Custom Tag
```bash
docker build -f frontend/Dockerfile -t myregistry/ecommerce-frontend:v1.0 ./frontend
```

---

### Pushing to Docker Registry

#### Login to Docker Hub
```bash
docker login
```

#### Tag Image for Registry
```bash
docker tag ecommerce-frontend:latest username/ecommerce-frontend:v1.0
docker tag ecommerce-backend:latest username/ecommerce-backend:v1.0
```

#### Push to Registry
```bash
docker push username/ecommerce-frontend:v1.0
docker push username/ecommerce-backend:v1.0
```

---

## Environment Variables

### Docker Compose .env File

Create `.env.docker` in the project root:

```bash
# MongoDB
MONGO_ROOT_USER=admin
MONGO_ROOT_PASSWORD=password

# Backend
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://admin:password@mongodb:27017/ecommerce?authSource=admin
JWT_SECRET=your_secret_key_here
BCRYPT_ROUNDS=10
API_URL=http://localhost:5000
CLIENT_URL=http://localhost:3000

# Frontend
VITE_API_URL=http://localhost:5000
VITE_API_TIMEOUT=10000
```

### Using Custom .env File
```bash
docker compose --env-file .env.docker up --build
```

---

## Volume Management

### List Volumes
```bash
docker volume ls
```

### Inspect Volume
```bash
docker volume inspect ecommerce_mongodb_data
```

### Remove Volumes
```bash
docker volume prune
docker volume rm ecommerce_mongodb_data
```

### Backup MongoDB Volume
```bash
docker run --rm \
  -v ecommerce_mongodb_data:/data \
  -v $(pwd):/backup \
  mongo:7.0-alpine \
  tar czf /backup/mongodb_backup.tar.gz /data
```

### Restore MongoDB Volume
```bash
docker run --rm \
  -v ecommerce_mongodb_data:/data \
  -v $(pwd):/backup \
  mongo:7.0-alpine \
  tar xzf /backup/mongodb_backup.tar.gz -C /
```

---

## Network Configuration

### View Docker Networks
```bash
docker network ls
```

### Inspect Network
```bash
docker network inspect ecommerce_ecommerce-network
```

### Connected Services (Internal DNS)
- **Backend:** `http://backend:5000` (from frontend)
- **Frontend:** `http://frontend:3000` (from nginx)
- **MongoDB:** `mongodb://admin:password@mongodb:27017` (from backend)

---

## Database Management

### Access MongoDB Shell
```bash
docker compose exec mongodb mongosh -u admin -p password
```

### MongoDB Commands
```javascript
// Connect to database
use ecommerce

// Show collections
show collections

// View users
db.users.find()

// View products
db.products.find()

// Clear collections
db.users.deleteMany({})
db.products.deleteMany({})

// Seed data (if seed script available)
// Run from backend container: node seed.js
```

### Backup Database
```bash
docker compose exec mongodb mongodump -u admin -p password --authenticationDatabase admin -o /backup
```

### Restore Database
```bash
docker compose exec mongodb mongorestore -u admin -p password --authenticationDatabase admin /backup
```

---

## Testing Health

### Health Check Endpoints

#### Backend Health
```bash
curl http://localhost:5000/api/health
```

#### Frontend Health
```bash
curl http://localhost:3000
```

#### Check All Service Status
```bash
docker compose ps
```

---

## Common Issues & Solutions

### Issue 1: Port Already in Use

**Error:** `address already in use :::5000`

**Solution:**
```bash
# Linux/macOS - Kill process using port
lsof -i :5000
kill -9 <PID>

# Windows - Kill process
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or use different ports in docker-compose.yml
# Change "5000:5000" to "5001:5000"
```

### Issue 2: MongoDB Connection Failed

**Error:** `Cannot connect to MongoDB`

**Solution:**
```bash
# Check if MongoDB container is running
docker compose ps

# Check MongoDB logs
docker compose logs mongodb

# Verify connection string in .env
# Should be: mongodb://admin:password@mongodb:27017/ecommerce?authSource=admin
```

### Issue 3: Container Won't Start

**Error:** Container exits immediately

**Solution:**
```bash
# Check logs
docker compose logs backend

# Rebuild without cache
docker compose build --no-cache

# Start again
docker compose up --build
```

### Issue 4: Frontend Can't Connect to Backend

**Error:** `Failed to fetch from API`

**Solution:**
```bash
# Verify VITE_API_URL is set correctly
# In frontend/.env.docker or docker-compose.yml
# Should be: VITE_API_URL=http://localhost:5000

# Verify backend is running
docker compose logs backend

# Restart frontend
docker compose restart frontend
```

### Issue 5: Volumes Not Persisting

**Error:** Data lost after container restart

**Solution:**
```bash
# Check volume mounting
docker compose ps

# Verify volumes in docker-compose.yml
# Should have: volumes: - mongodb_data:/data/db

# Check volume exists
docker volume ls | grep mongodb_data

# Don't use: docker compose down -v (removes volumes)
# Use: docker compose down (keeps volumes)
```

---

## Scaling & Performance

### Run Multiple Backend Instances
```bash
docker compose up --scale backend=3
```

### Resource Limits
Add to docker-compose.yml:
```yaml
backend:
  deploy:
    resources:
      limits:
        cpus: '0.5'
        memory: 512M
      reservations:
        cpus: '0.25'
        memory: 256M
```

### Monitor Resource Usage
```bash
docker stats
docker compose stats
```

---

## Production Deployment

### Environment Setup
```bash
# Production .env file
NODE_ENV=production
JWT_SECRET=generate-secure-random-key-here
MONGO_ROOT_PASSWORD=strong-secure-password
CORS_ORIGIN=https://yourdomain.com
```

### Build Production Images
```bash
docker compose -f docker-compose.yml build --no-cache

# With specific version tags
docker build -f backend/Dockerfile -t your-registry/ecommerce-backend:v1.0 ./backend
docker build -f frontend/Dockerfile -t your-registry/ecommerce-frontend:v1.0 ./frontend
```

### Deploy to Production
```bash
# Pull images from registry
docker pull your-registry/ecommerce-backend:v1.0
docker pull your-registry/ecommerce-frontend:v1.0

# Start with production compose file
docker compose -f docker-compose.yml up -d
```

### Enable SSL/HTTPS

Edit `nginx.conf` and uncomment SSL section:
```nginx
server {
    listen 443 ssl http2;
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
}
```

---

## Monitoring & Logging

### View Logs
```bash
# All logs
docker compose logs

# Real-time logs
docker compose logs -f

# Specific service
docker compose logs -f backend

# Last 100 lines
docker compose logs --tail=100
```

### Save Logs to File
```bash
docker compose logs > docker_logs.txt
```

### Monitor Resource Usage
```bash
docker stats
```

---

## Cleanup

### Remove Everything
```bash
# Stop and remove containers
docker compose down

# Remove images
docker image prune -a

# Remove volumes
docker volume prune

# Remove networks
docker network prune
```

### Remove Specific Components
```bash
# Remove MongoDB volume
docker volume rm ecommerce_mongodb_data

# Remove specific service
docker compose rm -v mongodb
```

---

## Docker Best Practices

1. **Use Specific Image Tags**
   ```dockerfile
   FROM node:20-alpine  # ✓ Good
   FROM node:latest     # ✗ Avoid
   ```

2. **Multi-stage Builds**
   - Reduces final image size
   - Keeps production images lean
   - See frontend/Dockerfile for example

3. **Health Checks**
   - Always include HEALTHCHECK
   - Helps Docker manage container lifecycle
   - Enables automatic restarts

4. **Environment Variables**
   - Use .env files for sensitive data
   - Never hardcode secrets
   - Use .dockerignore properly

5. **Volumes**
   - Use named volumes for persistence
   - Don't store data in containers
   - Backup important volumes regularly

6. **Networking**
   - Services communicate via container names
   - Expose only necessary ports
   - Use internal networks when possible

7. **Security**
   - Run containers as non-root (when possible)
   - Scan images for vulnerabilities
   - Keep images updated
   - Use secrets management for production

---

## Troubleshooting Checklist

- [ ] Docker Desktop is running
- [ ] All ports are available (3000, 5000, 27017)
- [ ] .env files are configured correctly
- [ ] MongoDB container is healthy
- [ ] Backend container is running
- [ ] Frontend container is running
- [ ] Network is created
- [ ] Volumes are mounted correctly
- [ ] Logs show no critical errors
- [ ] Can access frontend at http://localhost:3000
- [ ] Can access backend at http://localhost:5000

---

## Additional Resources

- **Docker Docs:** https://docs.docker.com/
- **Docker Compose:** https://docs.docker.com/compose/
- **MongoDB Docker:** https://hub.docker.com/_/mongo
- **Node Alpine:** https://hub.docker.com/_/node

---

## Support

If you encounter issues:

1. Check logs: `docker compose logs`
2. Verify all services: `docker compose ps`
3. Rebuild images: `docker compose build --no-cache`
4. Start fresh: `docker compose down -v && docker compose up --build`

---

**Happy Dockerizing! 🐳🚀**
