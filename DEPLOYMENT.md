# UZXIAtreatr — Production Deployment Guide

This document provides step-by-step instructions for deploying the **UZXIAtreatr** platform.

---

## 1. Static & SPA Deployment (Vercel / Netlify / GitHub Pages)

UZXIAtreatr is built using native ES Modules / Vite standards with an offline-resilient service architecture. It can be deployed instantly as a static frontend application.

### Option A: Deploying to Vercel
1. Connect your GitHub repository to [Vercel](https://vercel.com).
2. Set Build Command: `npm run build` (or leave default for static HTML/Vite).
3. Set Output Directory: `dist` or `./`.
4. Environment Variables:
   - `VITE_API_URL`: `https://your-api-domain.com/api`
   - `VITE_APP_NAME`: `UZXIAtreatr`
5. Click **Deploy**.

### Option B: Deploying to Netlify
1. Log into [Netlify](https://netlify.com) and click **Add new site**.
2. Select repository and set Publish Directory to `./` or `dist`.
3. Add environment variables from `.env.example`.
4. Click **Deploy Site**.

---

## 2. Backend API & PostgreSQL Database Deployment (Node.js / Express / Prisma)

The `server/` directory contains the Node.js Express API and Prisma ORM configuration.

### Prerequisites
- Node.js (v18+)
- PostgreSQL Database URL (`DATABASE_URL=postgresql://user:password@localhost:5432/uzxia_db`)

### Steps for Railway / Render / DigitalOcean
1. Navigate to the `server/` folder:
   ```bash
   cd server
   npm install
   ```
2. Set Production Environment Variables:
   ```env
   PORT=5000
   DATABASE_URL=postgresql://db_user:db_password@host.railway.app:5432/uzxia
   JWT_SECRET=your_production_secure_jwt_secret_key_here
   ```
3. Run Database Migrations:
   ```bash
   npx prisma migrate deploy
   ```
4. Start Production Server:
   ```bash
   npm start
   ```

---

## 3. Security Checklist Before Launch
- [x] No private API keys hardcoded in frontend source files.
- [x] `.env` files added to `.gitignore`.
- [x] CORS origins restricted to approved production domain in `server/src/server.js`.
- [x] Accessible focus indicators, keyboard traps, and `prefers-reduced-motion` compliance verified.
- [x] All routes, modals, search filters, quiz engines, and AI Mentor panel tested cleanly with zero console errors.
