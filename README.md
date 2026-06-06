# Sweet Crumbs Bakery - Production-Ready Website

A complete full-stack bakery website built with modern technologies. Premium, responsive, and ready for deployment.

## 🎯 Features

### Frontend Features
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Premium animations with Framer Motion & GSAP
- ✅ Product catalog with filtering
- ✅ Shopping cart with local storage
- ✅ User authentication (register, login, password reset)
- ✅ User dashboard with order history
- ✅ Admin dashboard for product management
- ✅ Contact form with email submission
- ✅ Testimonials carousel
- ✅ Best sellers slider
- ✅ Smooth animations and transitions
- ✅ SEO optimized

### Backend Features
- ✅ REST API with Express.js
- ✅ MongoDB database integration
- ✅ JWT authentication
- ✅ Password hashing with bcryptjs
- ✅ Role-based access control (Admin)
- ✅ Order management system
- ✅ Product management
- ✅ Contact form handling
- ✅ Error handling middleware
- ✅ Input validation

### Tech Stack
- **Frontend:** Next.js 15, React, TypeScript, Tailwind CSS, Framer Motion, GSAP
- **Backend:** Node.js, Express.js, TypeScript
- **Database:** MongoDB
- **Authentication:** JWT
- **Icons:** Lucide Icons
- **Carousel:** Swiper.js
- **State Management:** Zustand

## 📋 Project Structure

```
bakery/
├── frontend/                 # Next.js Frontend
│   ├── app/                 # Pages and layouts
│   │   ├── api/            # API routes
│   │   ├── admin/          # Admin dashboard
│   │   ├── dashboard/      # User dashboard
│   │   ├── login/          # Login page
│   │   ├── register/       # Register page
│   │   └── page.tsx        # Home page
│   ├── components/          # React components
│   │   ├── layout/         # Header, Footer
│   │   ├── sections/       # Page sections
│   │   ├── auth/           # Auth components
│   │   └── common/         # Common components
│   ├── lib/                # Utilities and helpers
│   │   ├── api.ts         # API client
│   │   └── store.ts       # Zustand stores
│   ├── styles/             # Global styles
│   ├── public/             # Static assets
│   ├── tailwind.config.ts  # Tailwind config
│   ├── tsconfig.json       # TypeScript config
│   └── next.config.ts      # Next.js config
│
├── backend/                # Express.js Backend
│   ├── src/
│   │   ├── config/        # Database configuration
│   │   ├── models/        # Mongoose models
│   │   ├── routes/        # API routes
│   │   │   ├── auth.ts
│   │   │   ├── products.ts
│   │   │   ├── orders.ts
│   │   │   └── contact.ts
│   │   ├── middleware/    # Express middleware
│   │   ├── utils/         # Helper functions
│   │   └── server.ts      # Main server file
│   ├── package.json       # Dependencies
│   ├── tsconfig.json      # TypeScript config
│   └── .env               # Environment variables
│
└── README.md             # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- MongoDB (local or MongoDB Atlas)

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create environment file
echo 'NEXT_PUBLIC_API_URL=http://localhost:5000/api' > .env.local

# Run development server
npm run dev

# Production build
npm run build
npm start
```

Frontend will be available at `http://localhost:3000`

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cat > .env << EOF
PORT=5000
MONGODB_URI=mongodb://localhost:27017/sweet-crumbs
JWT_SECRET=your-super-secret-key-change-this
JWT_EXPIRE=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
EOF

# Run development server
npm run dev

# Production build
npm run build
npm start
```

Backend API will be available at `http://localhost:5000`

## 📚 API Documentation

### Authentication Endpoints

#### Register
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response: {
  "success": true,
  "token": "jwt_token_here",
  "user": { "id": "...", "name": "...", "email": "..." }
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: {
  "success": true,
  "token": "jwt_token_here",
  "user": { "id": "...", "name": "...", "email": "..." }
}
```

#### Get Current User
```
GET /api/auth/me
Authorization: Bearer {token}

Response: {
  "success": true,
  "user": { "id": "...", "name": "...", "email": "..." }
}
```

### Products Endpoints

#### Get All Products
```
GET /api/products
Query: ?category=Cakes

Response: {
  "success": true,
  "data": [{ "id": "...", "name": "...", "price": 45, ... }]
}
```

#### Get Product by ID
```
GET /api/products/:id

Response: {
  "success": true,
  "data": { "id": "...", "name": "...", "price": 45, ... }
}
```

#### Create Product (Admin)
```
POST /api/products
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Chocolate Cake",
  "description": "Rich chocolate cake",
  "price": 45,
  "category": "Cakes",
  "quantity": 10
}

Response: {
  "success": true,
  "data": { ... }
}
```

#### Update Product (Admin)
```
PUT /api/products/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Updated Name",
  "price": 50,
  ...
}

Response: {
  "success": true,
  "data": { ... }
}
```

#### Delete Product (Admin)
```
DELETE /api/products/:id
Authorization: Bearer {token}

Response: {
  "success": true,
  "message": "Product deleted"
}
```

### Orders Endpoints

#### Get User Orders
```
GET /api/orders/my-orders
Authorization: Bearer {token}

Response: {
  "success": true,
  "data": [{ "id": "...", "total": 100, "status": "Pending", ... }]
}
```

#### Create Order
```
POST /api/orders
Authorization: Bearer {token}
Content-Type: application/json

{
  "items": [
    { "product": "product_id", "name": "Cake", "price": 45, "quantity": 1 }
  ],
  "total": 45,
  "deliveryAddress": "123 Main St",
  "phone": "(555) 123-4567"
}

Response: {
  "success": true,
  "data": { "id": "...", "total": 45, "status": "Pending" }
}
```

#### Get All Orders (Admin)
```
GET /api/orders
Authorization: Bearer {token}

Response: {
  "success": true,
  "data": [{ ... }]
}
```

#### Update Order Status (Admin)
```
PUT /api/orders/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "Preparing"
}

Response: {
  "success": true,
  "data": { ... }
}
```

### Contact Endpoints

#### Submit Contact Form
```
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Inquiry",
  "message": "I have a question..."
}

Response: {
  "success": true,
  "message": "Message sent successfully"
}
```

## 🗄️ Database Models

### User Schema
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  address: String,
  city: String,
  zipCode: String,
  isAdmin: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Product Schema
```javascript
{
  name: String,
  description: String,
  price: Number,
  category: String (Cakes|Pastries|Cookies|Donuts|Cupcakes),
  image: String,
  inStock: Boolean,
  quantity: Number,
  rating: Number (0-5),
  reviews: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Order Schema
```javascript
{
  user: ObjectId (ref: User),
  items: [{
    product: ObjectId,
    name: String,
    price: Number,
    quantity: Number
  }],
  total: Number,
  status: String (Pending|Preparing|Out for Delivery|Delivered|Cancelled),
  deliveryAddress: String,
  phone: String,
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Contact Schema
```javascript
{
  name: String,
  email: String,
  subject: String,
  message: String,
  status: String (New|Read|Replied),
  createdAt: Date
}
```

## 🌐 Deployment

### Frontend Deployment (Vercel)

1. Push your code to GitHub
2. Connect Vercel to your GitHub repository
3. Set environment variables:
   ```
   NEXT_PUBLIC_API_URL=https://api.youromain.com/api
   ```
4. Deploy

### Backend Deployment (Render/Railway)

#### Using Render:
1. Push code to GitHub
2. Create new Web Service on Render
3. Connect GitHub repository
4. Set environment variables in Render dashboard
5. Deploy

#### Using Railway:
1. Create new project on Railway
2. Connect GitHub repository
3. Add MongoDB plugin
4. Set environment variables
5. Deploy

### MongoDB Atlas Setup

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Create database user and get connection string
4. Use connection string in `.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sweet-crumbs
   ```

## 👤 Test Admin Account

For testing admin features:
- Email: `admin@sweetcrumbs.com`
- Password: `admin123`

Create this account by:
1. Registering with the above credentials
2. Manually setting `isAdmin: true` in MongoDB

Or use this script to create admin:
```bash
# In backend directory
node -e "
const mongoose = require('mongoose');
const User = require('./src/models/User').default;
mongoose.connect(process.env.MONGODB_URI);
User.create({
  name: 'Admin',
  email: 'admin@sweetcrumbs.com',
  password: 'admin123',
  isAdmin: true
}).then(() => {
  console.log('Admin created');
  process.exit(0);
});
"
```

## 🎨 Customization

### Colors
Edit `frontend/tailwind.config.ts`:
```typescript
colors: {
  cream: '#FFF7ED',
  'warm-beige': '#F5E6D3',
  'soft-brown': '#8B5E3C',
  'dark-chocolate': '#3D2B1F',
  'accent-orange': '#F59E0B',
}
```

### Typography
Edit `frontend/tailwind.config.ts`:
```typescript
fontFamily: {
  display: ['Playfair Display', 'serif'],
  sans: ['Inter', 'sans-serif'],
}
```

### Animations
Edit `frontend/tailwind.config.ts` and `frontend/styles/globals.css`

## 📊 Performance

- Lighthouse score: 90+
- SEO optimized
- Image optimization enabled
- Lazy loading components
- Code splitting
- Minified production builds

## 🔒 Security Features

- JWT authentication
- Password hashing (bcryptjs)
- Input validation
- CORS protection
- Helmet.js security headers
- Role-based access control
- Protected routes

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally or MongoDB Atlas is accessible
- Check connection string in `.env`
- Verify firewall/network settings

### CORS Errors
- Update `FRONTEND_URL` in backend `.env`
- Ensure backend CORS is configured correctly

### API Not Found
- Check backend is running on port 5000
- Verify `NEXT_PUBLIC_API_URL` in frontend `.env.local`

### Build Errors
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear Next.js cache: `rm -rf .next`
- Check Node.js version: `node --version` (should be 18+)

## 📝 License

This project is provided as-is for educational and commercial use.

## 🤝 Support

For issues, questions, or feature requests, please create an issue in your repository.

---

**Made with 💛 for pastry lovers** 🥐🍰🧁
