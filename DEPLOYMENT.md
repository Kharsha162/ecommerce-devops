# Deployment Guide

This guide covers deploying the MERN eCommerce application to production environments.

## Pre-Deployment Checklist

- [ ] Environment variables are secure
- [ ] Database is properly configured
- [ ] Frontend is built and optimized
- [ ] Backend is tested in production mode
- [ ] Error logging is configured
- [ ] HTTPS is enabled
- [ ] CORS is properly configured
- [ ] API rate limiting is implemented
- [ ] Database backups are automated
- [ ] Monitoring and alerts are set up

## Backend Deployment

### Option 1: Heroku

#### Prerequisites
- Heroku account
- Heroku CLI installed

#### Steps
```bash
# 1. Create Heroku app
heroku create your-app-name

# 2. Add MongoDB Atlas URI as environment variable
heroku config:set MONGODB_URI=your_mongodb_atlas_uri

# 3. Set other environment variables
heroku config:set JWT_SECRET=your_production_secret
heroku config:set NODE_ENV=production
heroku config:set CLIENT_URL=your_frontend_url

# 4. Deploy
git push heroku main

# 5. Monitor logs
heroku logs --tail
```

### Option 2: AWS EC2

#### Prerequisites
- AWS account
- EC2 instance (Ubuntu recommended)
- Node.js installed on instance

#### Steps
```bash
# 1. Connect to EC2 instance
ssh -i your-key.pem ec2-user@your-instance-ip

# 2. Install Node.js and npm
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 3. Clone repository
git clone your-repo-url
cd backend

# 4. Install dependencies
npm install

# 5. Create .env file with production values
nano .env

# 6. Start with PM2 for process management
npm install -g pm2
pm2 start server.js --name "ecommerce-backend"
pm2 startup
pm2 save

# 7. Setup Nginx as reverse proxy
sudo apt-get install nginx
# Configure /etc/nginx/sites-available/default

# 8. Enable HTTPS with Let's Encrypt
sudo apt-get install certbot python3-certbot-nginx
sudo certbot certonly --nginx -d your-domain.com
```

### Option 3: DigitalOcean

#### Steps
```bash
# 1. Create Droplet (Ubuntu 22.04 LTS)
# 2. SSH into droplet
ssh root@your_droplet_ip

# 3. Setup Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 4. Setup application
git clone your-repo
cd backend
npm install
npm run build

# 5. Use App Platform or manually configure with PM2
npm install -g pm2
pm2 start server.js

# 6. Setup database
# Use DigitalOcean Managed Database service

# 7. Configure firewall
ufw allow 22
ufw allow 80
ufw allow 443
ufw enable
```

---

## Frontend Deployment

### Option 1: Vercel (Recommended for React)

#### Steps
```bash
# 1. Build application
npm run build

# 2. Install Vercel CLI
npm install -g vercel

# 3. Deploy
vercel --prod

# 4. Configure environment variables in Vercel dashboard
# VITE_API_URL=your_backend_url
```

#### Vercel Configuration
Create `vercel.json`:
```json
{
  "env": {
    "VITE_API_URL": "@api_url"
  },
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "index.html"
    }
  ]
}
```

### Option 2: Netlify

#### Steps
```bash
# 1. Build
npm run build

# 2. Install Netlify CLI
npm install -g netlify-cli

# 3. Deploy
netlify deploy --prod --dir=dist

# 4. Set environment variables in Netlify dashboard
```

#### Netlify Configuration
Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  VITE_API_URL = "your_backend_url"
```

### Option 3: GitHub Pages

```bash
# 1. Update vite.config.js with base path
export default {
  base: '/your-repo-name/'
}

# 2. Build
npm run build

# 3. Deploy to gh-pages branch
npm install --save-dev gh-pages

# Add to package.json:
"deploy": "gh-pages -d dist"

npm run deploy
```

### Option 4: AWS S3 + CloudFront

```bash
# 1. Build
npm run build

# 2. Install AWS CLI
npm install -g aws-cli

# 3. Configure AWS credentials
aws configure

# 4. Create S3 bucket
aws s3 mb s3://your-bucket-name

# 5. Upload files
aws s3 sync dist/ s3://your-bucket-name

# 6. Setup CloudFront for CDN and HTTPS
# Use AWS Console
```

---

## Database Deployment

### MongoDB Atlas (Recommended)

1. **Create Cluster**
   - Go to https://www.mongodb.com/cloud/atlas
   - Create organization and project
   - Create cluster (free tier available)

2. **Security**
   - Enable network access
   - Create database user
   - Whitelist IPs

3. **Connection**
   - Get connection string
   - Add to backend .env as MONGODB_URI

4. **Backups**
   - Enable automatic backups
   - Configure retention policy

### Self-Hosted MongoDB

```bash
# 1. Install MongoDB
sudo apt-get install -y mongodb-org

# 2. Start service
sudo systemctl start mongod

# 3. Enable on startup
sudo systemctl enable mongod

# 4. Secure with authentication
# Create admin user and database user

# 5. Configure backups
*/2 * * * * mongodump --out /backup/$(date +\%Y\%m\%d_\%H\%M\%S)
```

---

## Environment Variables (Production)

### Backend (.env)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
PORT=5000
NODE_ENV=production
JWT_SECRET=your-very-secure-random-secret-key-here
JWT_EXPIRE=7d
API_URL=https://api.yourdomain.com
CLIENT_URL=https://yourdomain.com
BCRYPT_ROUNDS=10
```

### Frontend (.env.production)
```
VITE_API_URL=https://api.yourdomain.com
VITE_API_TIMEOUT=10000
VITE_APP_NAME=eCommerce
VITE_ENABLE_DARK_MODE=true
```

---

## SSL/HTTPS Setup

### Let's Encrypt with Nginx

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Generate certificate
sudo certbot certonly --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renew
sudo systemctl enable certbot.timer
```

### Configure Nginx

```nginx
server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}
```

---

## Performance Optimization

### Backend
- Enable gzip compression
- Implement caching
- Use CDN for static files
- Add database indexes
- Implement rate limiting
- Use API pagination

### Frontend
- Minimize and optimize bundle
- Lazy load components
- Optimize images
- Enable browser caching
- Use CDN for assets
- Implement service workers

### Database
- Add indexes to frequently queried fields
- Archive old data
- Regular backups
- Monitor query performance

---

## Monitoring & Logging

### PM2 Monitoring
```bash
# Install PM2 Plus
pm2 install pm2-auto-pull
pm2 install pm2-logrotate

# Start monitoring
pm2 monit
```

### Error Tracking
```bash
# Install Sentry
npm install @sentry/node

# Initialize in server.js
import * as Sentry from "@sentry/node";
Sentry.init({ dsn: "your-sentry-dsn" });
```

### Application Logs
```bash
# Install Winston
npm install winston

# Use for logging
import logger from './utils/logger';
logger.info('Application started');
logger.error('Error occurred', error);
```

---

## Troubleshooting

### High Memory Usage
```bash
# Check memory
pm2 monit

# Restart process
pm2 restart app-name
```

### Database Connection Issues
- Check connection string
- Verify IP whitelist in MongoDB Atlas
- Verify database credentials

### Slow API Response
- Check database indexes
- Monitor server resources
- Enable caching
- Optimize queries

### SSL Certificate Issues
```bash
# Check certificate
openssl x509 -in /path/to/cert -text -noout

# Renew certificate
sudo certbot renew
```

---

## Cost Estimation

### Monthly Costs (Estimated)

| Service | Tier | Cost |
|---------|------|------|
| Backend (Heroku) | Hobby | $0-50/mo |
| Backend (AWS EC2) | t2.micro | $9-15/mo |
| Frontend (Vercel) | Pro | Free-20/mo |
| Database (MongoDB Atlas) | Free | $0-99/mo |
| Domain | .com | $10-15/yr |
| CDN (Optional) | CloudFlare | Free-200/mo |

**Total Estimated:** $20-100/month (starting)

---

## Post-Deployment

1. **Test thoroughly**
   - All features
   - Error scenarios
   - Performance
   - Security

2. **Monitor**
   - Set up alerts
   - Check logs daily
   - Monitor uptime
   - Track performance metrics

3. **Maintain**
   - Regular backups
   - Security updates
   - Performance optimization
   - User feedback

4. **Scale**
   - Monitor usage
   - Add caching
   - Upgrade resources
   - Optimize code

---

**Happy Deploying! 🚀**
