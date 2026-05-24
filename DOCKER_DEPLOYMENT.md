# Complete Dockerized MERN eCommerce Application

## 🚀 Quick Start

```bash
# Navigate to project root
cd ecommerce

# Start all services (builds if needed)
docker compose up --build

# Application is ready at:
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
# MongoDB: localhost:27017
```

**Stop services:**
```bash
docker compose down
```

---

## 📋 What's Included

### Docker Infrastructure
- ✅ **backend/Dockerfile** - Production-ready Node.js backend
- ✅ **frontend/Dockerfile** - Multi-stage React build
- ✅ **docker-compose.yml** - Complete orchestration with 4 services
- ✅ **nginx.conf** - Reverse proxy & load balancing
- ✅ **frontend/.dockerignore** - Optimized build context
- ✅ **backend/.dockerignore** - Optimized build context
- ✅ **Environment files** - Docker-specific configuration

### Services

#### 1. **Frontend** (React + Vite)
- Runs on port 3000
- Multi-stage build (reduces image size)
- Live reload during development via volumes
- Health checks enabled
- Serves static assets with caching

#### 2. **Backend** (Node.js + Express)
- Runs on port 5000
- Production dependencies only
- dumb-init for proper signal handling
- Health check endpoint at `/api/health`
- CORS configured for frontend communication

#### 3. **MongoDB**
- Runs on port 27017
- Authentication enabled (admin/password)
- Persistent volumes for data storage
- Health checks enabled
- Automatic initialization

#### 4. **Nginx** (Optional)
- Runs on port 80
- Reverse proxy to frontend & backend
- Rate limiting on API endpoints
- Security headers configured
- Gzip compression enabled
- Ready for SSL/HTTPS

---

## 🏗️ Project Structure

```
ecommerce/
├── backend/
│   ├── Dockerfile              # Backend container image
│   ├── .dockerignore           # Docker build optimizations
│   ├── package.json
│   ├── server.js
│   ├── seed.js
│   ├── .env.docker             # Environment variables for Docker
│   └── ... (models, routes, controllers)
│
├── frontend/
│   ├── Dockerfile              # Frontend container image
│   ├── .dockerignore           # Docker build optimizations
│   ├── package.json
│   ├── vite.config.js
│   ├── .env.docker             # Environment variables for Docker
│   └── ... (src, public, components)
│
├── docker-compose.yml          # Main orchestration file
├── .env.docker                 # Root-level environment variables
├── nginx.conf                  # Nginx configuration
├── DOCKER_GUIDE.md             # Complete Docker commands reference
└── README.md                   # This file
```

---

## 🔧 Configuration

### Environment Variables

All environment variables are defined in `.env.docker`:

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

# Frontend
VITE_API_URL=http://localhost:5000
VITE_API_TIMEOUT=10000
```

**Change these for production!**

### Customizing Environment

```bash
# Use custom env file
docker compose --env-file .env.production up --build

# Override specific variable
docker compose -e NODE_ENV=development up
```

---

## 📦 Docker Compose Services

### Service: mongodb
- **Image:** mongo:7.0-alpine
- **Port:** 27017
- **Volumes:** Named volumes for persistence
- **Health Check:** MongoDB ping command
- **Auto-restart:** Unless manually stopped

### Service: backend
- **Build:** ./backend/Dockerfile
- **Port:** 5000
- **Depends On:** MongoDB (waits for health check)
- **Environment:** All backend config variables
- **Volumes:** Live reload support during development
- **Health Check:** HTTP endpoint at /api/health

### Service: frontend
- **Build:** ./frontend/Dockerfile
- **Port:** 3000
- **Depends On:** Backend service
- **Environment:** VITE configuration
- **Volumes:** Live reload support during development
- **Health Check:** HTTP endpoint with wget

### Service: nginx
- **Image:** nginx:alpine
- **Ports:** 80 (HTTP), 443 (HTTPS ready)
- **Volume:** nginx.conf configuration
- **Features:**
  - Reverse proxy to frontend
  - API routing to backend
  - Rate limiting
  - Security headers
  - Gzip compression
  - Static asset caching

---

## 🌐 Networking

All containers communicate via a custom bridge network: `ecommerce-network`

### Internal Service Names (Docker DNS)
- Backend: `http://backend:5000`
- Frontend: `http://frontend:3000`
- MongoDB: `mongodb://admin:password@mongodb:27017`

### From Host Machine
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`
- MongoDB: `localhost:27017`
- Nginx: `http://localhost`

---

## 💾 Persistent Storage

### MongoDB Data
```yaml
volumes:
  mongodb_data:      # Stores MongoDB data
  mongodb_config:    # Stores MongoDB configuration
```

Data persists between container restarts:
```bash
docker compose down    # Data persists
docker compose up      # Data is restored

docker compose down -v # Data is deleted
```

---

## ✅ Health Checks

Each service includes health checks:

```bash
# View health status
docker compose ps

# Example output:
# SERVICE       STATUS              
# mongodb       Up X min (healthy)
# backend       Up X min (healthy)
# frontend      Up X min (healthy)
```

Health check endpoints:
- Backend: `GET http://localhost:5000/api/health`
- Frontend: `GET http://localhost:3000`
- MongoDB: Internal ping command
- Nginx: `GET http://localhost/health`

---

## 🛠️ Common Tasks

### View Logs
```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f mongodb

# Last 100 lines
docker compose logs --tail=100
```

### Access Container Shell
```bash
# Backend shell
docker compose exec backend sh

# Frontend shell
docker compose exec frontend sh

# MongoDB shell
docker compose exec mongodb mongosh -u admin -p password
```

### Database Operations
```bash
# Connect to MongoDB
docker compose exec mongodb mongosh -u admin -p password

# Inside MongoDB shell:
use ecommerce
db.users.find()          # View users
db.products.find()       # View products
db.users.deleteMany({})  # Clear users
```

### Rebuild Services
```bash
# Rebuild all services
docker compose build --no-cache

# Rebuild specific service
docker compose build --no-cache backend
docker compose build --no-cache frontend

# Then restart
docker compose up
```

### Stop Individual Services
```bash
# Stop backend
docker compose stop backend

# Stop MongoDB
docker compose stop mongodb

# Restart a service
docker compose restart backend
```

---

## 🚀 Production Deployment

### Before Deploying

1. **Change Secrets:**
   ```bash
   # Generate new JWT secret
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   
   # Generate MongoDB password
   openssl rand -base64 32
   ```

2. **Update .env.docker:**
   ```bash
   NODE_ENV=production
   JWT_SECRET=<your-new-secret>
   MONGO_ROOT_PASSWORD=<secure-password>
   CORS_ORIGIN=https://yourdomain.com
   ```

3. **Build Images:**
   ```bash
   docker compose build --no-cache
   ```

4. **Tag & Push to Registry:**
   ```bash
   docker tag ecommerce-backend:latest myregistry/ecommerce-backend:v1.0
   docker tag ecommerce-frontend:latest myregistry/ecommerce-frontend:v1.0
   
   docker push myregistry/ecommerce-backend:v1.0
   docker push myregistry/ecommerce-frontend:v1.0
   ```

### Deployment Steps

```bash
# Pull latest images
docker pull myregistry/ecommerce-backend:v1.0
docker pull myregistry/ecommerce-frontend:v1.0

# Start services in background
docker compose up -d

# View status
docker compose ps

# Check logs
docker compose logs -f
```

### SSL/HTTPS Setup

Edit `nginx.conf` to uncomment and configure SSL:

```nginx
server {
    listen 443 ssl http2;
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    ...
}
```

Place certificates in volumes:
```yaml
volumes:
  - ./ssl/cert.pem:/etc/nginx/ssl/cert.pem:ro
  - ./ssl/key.pem:/etc/nginx/ssl/key.pem:ro
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Linux/macOS
lsof -i :5000
kill -9 <PID>

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### MongoDB Connection Failed
```bash
# Check MongoDB container
docker compose logs mongodb

# Verify connection string
# Should be: mongodb://admin:password@mongodb:27017/ecommerce?authSource=admin
```

### Frontend Can't Connect to Backend
```bash
# Check VITE_API_URL
docker compose logs frontend | grep VITE_API_URL

# Should be: http://localhost:5000 (from host)
# Or: http://backend:5000 (within network)
```

### Container Won't Start
```bash
# Check logs
docker compose logs <service>

# Rebuild without cache
docker compose build --no-cache

# Start with verbose output
docker compose up
```

### Out of Disk Space
```bash
# Clean up Docker
docker system prune -a

# Remove unused volumes
docker volume prune

# Remove unused networks
docker network prune
```

---

## 📚 Reference

See [DOCKER_GUIDE.md](DOCKER_GUIDE.md) for:
- Comprehensive Docker commands
- Advanced troubleshooting
- Volume management
- Database backup/restore
- Network inspection
- Production deployment strategies
- Performance tuning
- Security best practices

---

## 🔐 Security Best Practices

1. **Change default credentials:**
   - MongoDB: Change `MONGO_ROOT_PASSWORD`
   - JWT: Use strong random secret
   - CORS: Restrict to your domain

2. **Use environment variables:**
   - Never hardcode secrets
   - Use `.env` files (added to `.gitignore`)
   - Rotate secrets regularly

3. **Network security:**
   - Expose only necessary ports
   - Use internal networks
   - Enable authentication

4. **Image security:**
   - Scan images for vulnerabilities
   - Keep base images updated
   - Use specific version tags

5. **Container security:**
   - Run as non-root when possible
   - Set resource limits
   - Enable health checks
   - Monitor logs

---

## 📊 Performance Tips

1. **Use Alpine Images:**
   - Smaller image size
   - Faster deployments
   - Lower memory usage

2. **Multi-stage Builds:**
   - Reduces final image size
   - Used in frontend/Dockerfile
   - Separates build and runtime

3. **Caching Strategies:**
   - Docker layer caching
   - Browser cache with nginx
   - MongoDB indexes

4. **Resource Limits:**
   ```yaml
   deploy:
     resources:
       limits:
         cpus: '0.5'
         memory: 512M
   ```

5. **Monitoring:**
   ```bash
   docker stats              # Resource usage
   docker compose logs -f    # Real-time logs
   ```

---

## 🎯 Next Steps

1. **Start Services:**
   ```bash
   docker compose up --build
   ```

2. **Access Application:**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

3. **Test API:**
   ```bash
   curl http://localhost:5000/api/health
   ```

4. **View Logs:**
   ```bash
   docker compose logs -f
   ```

5. **For Production:**
   - See [Production Deployment](#-production-deployment)
   - See [DOCKER_GUIDE.md](DOCKER_GUIDE.md)

---

## 📞 Support

For detailed Docker commands and troubleshooting, see **DOCKER_GUIDE.md**

**Quick Links:**
- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Reference](https://docs.docker.com/compose/)
- [MongoDB Docker Image](https://hub.docker.com/_/mongo)
- [Node Alpine Image](https://hub.docker.com/_/node)

---

**Built with ❤️ | Fully Containerized MERN Stack | Production Ready**
