Render Deployment Guide
======================

This file explains how to connect your GitHub repository to Render, enable auto-deploy on push (Render's GitHub integration), and keep GitHub Actions for tests only.

1) Prerequisites
- A Render account (https://render.com)
- Admin access to the GitHub repository
- MongoDB Atlas cluster (recommended) or another managed DB

2) Prepare your repo (already done)
- `backend/` contains a Dockerfile that reads `process.env.PORT || 5000`.
- `frontend/` contains either a Dockerfile or can be deployed as a Static Site (Vite build output in `dist`).
- All secrets are provided via environment variables (not committed).

3) Connect GitHub repository to Render
- Log into Render and click "New" → choose "Web Service" (backend) or "Static Site" (frontend).
- Click "Connect a repo" and authorize Render to access your GitHub account.
- Select your repository and branch (`main`).

4) Backend service setup (Web Service)
- If using Dockerfile: choose the Docker option and Render will build the container.
- If using Node runtime: set Build Command `npm ci && npm run build` and Start Command `node server.js`.
- Set the Health Check Path to `/api/health`.

5) Frontend service setup (Static Site recommended)
- New → Static Site → select repo/branch.
- Build Command: `npm ci && npm run build`
- Publish Directory: `dist`
- Set `VITE_API_URL` environment variable to point to your backend (e.g., `https://your-backend.onrender.com`).

6) Environment variables (Render Dashboard)
- In each service, under Settings → Environment → Add the variables:
  - `MONGODB_URI` (Atlas connection string)
  - `JWT_SECRET`
  - `NODE_ENV=production`
  - `VITE_API_URL` (frontend build-time)

7) Enable Auto-Deploy
- When creating the service, leave "Auto-Deploy" enabled so Render builds on push.

8) Keep GitHub Actions for tests only
- This repo now includes a tests-only workflow at `.github/workflows/tests.yml` that runs on push/PR to `main`.
- The existing Docker build workflow `.github/workflows/docker.yml` has been disabled for automatic runs; it can be manually run from the Actions UI if needed.

9) Useful Render docs
- Render Web Services: https://render.com/docs/deploy-web-service
- Static Sites on Render: https://render.com/docs/static-sites
- Render API (trigger deploys): https://render.com/docs/api

10) After connecting
- Push to `main`. Render will receive the push and build the service(s).
- Monitor build logs in Render Dashboard → Service → Events.

If you want, I can also: add a short `deploy-check` script or a small smoke-test job in the tests workflow to call your backend health endpoint after tests pass. Tell me if you want that added.
