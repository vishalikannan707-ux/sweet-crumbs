# Deployment Guide

This guide covers deploying the Sweet Crumbs Bakery website to production.

## Prerequisites

- Git account (GitHub, GitLab, or Bitbucket)
- MongoDB Atlas account (for database hosting)
- Deployment platform account (Vercel, Render, or Railway)
- Domain name (optional)

## Option 1: Deploy with Docker

### Local Docker Setup

```bash
# Build and run with docker-compose
docker-compose up -d

# Check services
docker-compose ps

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend
```

Frontend: http://localhost:3000
Backend: http://localhost:5000

## Option 2: Deploy Frontend to Vercel

### Step 1: Prepare Repository

```bash
cd frontend
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/sweet-crumbs-frontend.git
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to https://vercel.com
2. Sign up/login with GitHub account
3. Click "Import Project"
4. Select your GitHub repository
5. Configure project:
   - Framework: Next.js
   - Root Directory: ./frontend
6. Add environment variables:
   ```
   NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
   ```
7. Click "Deploy"

Your site will be live at `your-project.vercel.app`

### Step 3: Connect Custom Domain (Optional)

1. In Vercel dashboard, go to Settings → Domains
2. Add your custom domain
3. Update DNS records with provider

## Option 3: Deploy Backend to Render

### Step 1: Prepare Repository

```bash
cd backend
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/sweet-crumbs-backend.git
git push -u origin main
```

### Step 2: Deploy on Render

1. Go to https://render.com
2. Sign up/login with GitHub
3. Click "New" → "Web Service"
4. Connect GitHub repository
5. Configure:
   - Name: sweet-crumbs-api
   - Environment: Node
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Region: Choose closest to users
6. Add environment variables:
   ```
   MONGODB_URI=your_atlas_uri
   JWT_SECRET=your_secret_key
   JWT_EXPIRE=7d
   NODE_ENV=production
   FRONTEND_URL=https://yourdomain.com
   ```
7. Click "Create Web Service"

Backend will be live at `sweet-crumbs-api.onrender.com`

### Step 3: Connect MongoDB

1. Go to https://www.mongodb.com/cloud/atlas
2. Create account or login
3. Create new project
4. Click "Build a Database"
5. Choose "M0 Free" tier
6. Select region
7. Add database user with strong password
8. Get connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/sweet-crumbs?retryWrites=true&w=majority
   ```
9. Update `MONGODB_URI` on Render

## Option 4: Deploy Backend to Railway

### Step 1: Prepare Repository

Same as Render above.

### Step 2: Deploy on Railway

1. Go to https://railway.app
2. Sign up with GitHub
3. Create new project
4. Click "Deploy from GitHub repo"
5. Select your backend repository
6. Configure:
   - Service name: sweet-crumbs-api
   - Build command: `npm install && npm run build`
   - Start command: `npm start`
7. Add environment variables (same as Render)
8. Click "Deploy"

### Step 3: Connect MongoDB

1. In Railway dashboard, click "Add"
2. Select "MongoDB"
3. Get connection string from Railway
4. Update environment variables

## Environment Variables

### Frontend (.env.local)

```
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
```

### Backend (.env)

```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sweet-crumbs
JWT_SECRET=generate_a_strong_random_string
JWT_EXPIRE=7d
NODE_ENV=production
FRONTEND_URL=https://yourdomain.com
```

## Database Setup

### MongoDB Atlas Setup

1. Visit https://www.mongodb.com/cloud/atlas
2. Create new cluster:
   - Choose M0 Free tier
   - Select region
3. Create database user:
   - Username: `bakery_user`
   - Password: (strong password)
4. Get connection string:
   - Click "Connect"
   - Choose "Drivers"
   - Copy connection string
5. Replace `<username>`, `<password>`, `<cluster-name>`

### Seed Database

```bash
# Install dependencies
cd backend
npm install

# Run seed script
npx ts-node src/seed.ts
```

This will populate MongoDB with sample products.

## Domain Setup

### Update Frontend Domain

In Vercel:
1. Settings → Domains
2. Add your domain
3. Follow DNS instructions

### Update Backend Domain

For Render/Railway, they provide subdomain or you can add custom domain.

Update `FRONTEND_URL` in backend `.env` to match your frontend domain.

## Health Checks

### Frontend Health

```bash
# Check if site loads
curl https://yourdomain.com

# Check performance
curl -I https://yourdomain.com
```

### Backend Health

```bash
# Check API health
curl https://api.yourdomain.com/api/health
```

Response should be:
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T12:00:00Z"
}
```

## Monitoring

### Frontend (Vercel)

- Analytics dashboard
- Performance metrics
- Error logs

### Backend (Render/Railway)

- Logs viewer
- Metrics dashboard
- Auto-scaling settings

### MongoDB (Atlas)

- Performance monitoring
- Backup & recovery
- Access logs

## SSL/HTTPS

Both Vercel and Render automatically provide SSL certificates.

For custom domains:
- Vercel: Automatic via Let's Encrypt
- Render: Automatic
- Railway: Automatic

## Performance Optimization

### Frontend

1. Enable image optimization in Vercel
2. Use edge caching
3. Enable gzip compression
4. Optimize bundle size

### Backend

1. Enable connection pooling
2. Add caching headers
3. Use compression middleware (already enabled)
4. Monitor database queries

## Troubleshooting

### Frontend not connecting to backend

1. Check `NEXT_PUBLIC_API_URL` is correct
2. Verify backend URL is accessible
3. Check CORS settings in backend
4. Review browser console for errors

### Database connection failed

1. Check `MONGODB_URI` is correct
2. Verify IP whitelist in MongoDB Atlas
3. Check username/password are correct
4. Ensure database exists

### Build failures

```bash
# Frontend
- Clear `.next` folder
- Reinstall node_modules
- Check Node version: node --version

# Backend
- Clear dist folder
- Reinstall node_modules
- Check TypeScript compilation
```

### Slow performance

1. Check database query performance
2. Enable database indexes
3. Use CDN for static assets
4. Optimize images
5. Monitor API response times

## Backup & Recovery

### MongoDB Backup

1. In MongoDB Atlas, go to Backup
2. Configure automatic daily backups
3. Set retention policy

### Code Backup

Repositories are automatically backed up on GitHub.

## SSL Certificate

Certificates are automatically managed by:
- Vercel (Let's Encrypt)
- Render (Let's Encrypt)
- Railway (Let's Encrypt)

## Rate Limiting

To prevent abuse, consider adding rate limiting:

```typescript
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
})

app.use('/api/', limiter)
```

## Security Best Practices

1. ✅ Use strong JWT secret
2. ✅ Enable HTTPS everywhere
3. ✅ Set secure cookie flags
4. ✅ Validate all inputs
5. ✅ Use environment variables for secrets
6. ✅ Keep dependencies updated
7. ✅ Regular security audits
8. ✅ Monitor for suspicious activity

## Support

For deployment issues:
- Check Vercel/Render/Railway documentation
- Review MongoDB Atlas support
- Check application logs
- Test locally before deploying

---

**Successfully deployed! 🚀** 🥐
