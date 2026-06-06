# Quick Start Guide

Get the Sweet Crumbs Bakery website up and running in minutes!

## 🚀 Option 1: Quick Start with Docker (Recommended)

### Prerequisites
- Docker installed: https://www.docker.com/products/docker-desktop
- Docker Compose installed (included with Docker Desktop)

### Commands
```bash
# Navigate to project root
cd bakery

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Access Points
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Health: http://localhost:5000/api/health
- MongoDB: mongodb://localhost:27017/sweet-crumbs

Done! The website is running locally.

---

## 💻 Option 2: Manual Development Setup

### Prerequisites
- Node.js 18+ (Download: https://nodejs.org)
- MongoDB (Download: https://www.mongodb.com/try/download/community)
- Git (Download: https://git-scm.com)

### Step 1: Start MongoDB

**Windows (if installed):**
```bash
mongod
```

**macOS (with Homebrew):**
```bash
brew services start mongodb-community
```

**Linux (with systemd):**
```bash
sudo systemctl start mongod
```

Or use MongoDB Atlas (cloud):
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string

### Step 2: Start Backend

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cat > .env << EOF
PORT=5000
MONGODB_URI=mongodb://localhost:27017/sweet-crumbs
JWT_SECRET=super_secret_key_change_in_production
JWT_EXPIRE=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
EOF

# Start development server
npm run dev
```

Wait for: `✓ MongoDB connected successfully`
Backend ready at: `http://localhost:5000`

### Step 3: Start Frontend

```bash
cd frontend

# Install dependencies
npm install

# Create environment file
echo 'NEXT_PUBLIC_API_URL=http://localhost:5000/api' > .env.local

# Start development server
npm run dev
```

Frontend ready at: `http://localhost:3000`

---

## 🗄️ Step 4: Seed Database (Optional)

Populate with sample products:

```bash
cd backend

# Install seed dependencies
npm install

# Run seed script
npx ts-node src/seed.ts
```

You should see: `✓ Inserted 12 products`

---

## 📝 First Steps After Setup

### 1. Create Test Account

Go to http://localhost:3000/register

Enter:
- Name: Test User
- Email: test@example.com
- Password: password123

### 2. Browse Products

Visit http://localhost:3000#products

### 3. Create Admin Account (Optional)

For admin features, modify MongoDB:

```bash
# Open MongoDB shell
mongosh

# Use database
use sweet-crumbs

# Find your test user and update
db.users.updateOne(
  { email: "test@example.com" },
  { $set: { isAdmin: true } }
)
```

Or use admin endpoints:
- Admin Dashboard: http://localhost:3000/admin
- Default admin email: admin@sweetcrumbs.com (if you created one)

### 4. Test API

```bash
# Get all products
curl http://localhost:5000/api/products

# Check API health
curl http://localhost:5000/api/health
```

---

## 🛠️ Common Commands

### Frontend Commands
```bash
cd frontend

# Development
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Lint code
npm run lint
```

### Backend Commands
```bash
cd backend

# Development with auto-reload
npm run dev

# Build TypeScript
npm run build

# Run built version
npm start

# Seed database
npx ts-node src/seed.ts
```

---

## 🔧 Environment Variables

### Frontend (.env.local)
```
# API URL
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Backend (.env)
```
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/sweet-crumbs

# Authentication
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d

# CORS
FRONTEND_URL=http://localhost:3000
```

---

## 🌐 Project Structure

```
bakery/
├── frontend/          # Next.js Frontend
│   ├── app/          # Pages
│   ├── components/   # React components
│   ├── lib/          # Utilities
│   ├── styles/       # CSS
│   └── public/       # Static files
│
└── backend/          # Express.js Backend
    ├── src/
    │   ├── models/   # Database models
    │   ├── routes/   # API routes
    │   ├── middleware/ # Express middleware
    │   └── server.ts # Main server
```

---

## 🚨 Troubleshooting

### "Cannot connect to MongoDB"
```bash
# Check if MongoDB is running
mongosh

# If not running, start it:
# Windows: mongod
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

### "API connection refused"
```bash
# Check backend is running
curl http://localhost:5000/api/health

# Check port is not in use (macOS/Linux)
lsof -i :5000

# Or Windows
netstat -ano | findstr :5000
```

### "Port 3000 already in use"
```bash
# Find process using port (macOS/Linux)
lsof -i :3000

# Kill process
kill -9 <PID>

# Or use different port
PORT=3001 npm run dev
```

### "Module not found" errors
```bash
# Clear and reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### "Build fails"
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall and rebuild
npm install
npm run build
```

---

## 📚 Learning Resources

### Frontend
- Next.js: https://nextjs.org/docs
- React: https://react.dev
- Tailwind CSS: https://tailwindcss.com
- Framer Motion: https://www.framer.com/motion

### Backend
- Express.js: https://expressjs.com
- Mongoose: https://mongoosejs.com
- JWT: https://jwt.io
- TypeScript: https://www.typescriptlang.org

### Database
- MongoDB: https://docs.mongodb.com
- MongoDB Atlas: https://docs.atlas.mongodb.com

---

## 🚀 Next Steps

### Local Development Complete? Try:

1. **Add Products**: Visit admin dashboard
2. **Place Order**: Add items to cart and checkout
3. **View Orders**: Check user dashboard
4. **Contact Form**: Submit a message
5. **Customize**: Edit colors, fonts, content

### Ready to Deploy? See:
- [DEPLOYMENT.md](./DEPLOYMENT.md)
- [README.md](./README.md)

---

## 💡 Tips

- **Hot Reload**: Changes auto-update in browser
- **API Testing**: Use Postman or curl
- **Database GUI**: Use MongoDB Compass (https://www.mongodb.com/products/compass)
- **Browser DevTools**: F12 for debugging
- **VS Code Extension**: Install "REST Client" for API testing

---

## ❓ Need Help?

1. Check logs: `docker-compose logs`
2. Read documentation
3. Review error messages carefully
4. Test in isolation (frontend/backend separately)
5. Clear cache and reinstall dependencies

---

**Happy developing! 🥐🍰** 

For production deployment, see [DEPLOYMENT.md](./DEPLOYMENT.md)
