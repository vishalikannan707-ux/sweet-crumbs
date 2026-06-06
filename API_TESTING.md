# API Testing Guide

Test the Sweet Crumbs Bakery API using these examples.

## 📍 Base URL

Development: `http://localhost:5000/api`
Production: `https://api.yourdomain.com/api`

## 🔐 Authentication

All protected endpoints require JWT token in Authorization header:

```
Authorization: Bearer {your_jwt_token}
```

---

## 🧪 Testing with cURL

### 1. Register User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

Response:
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### 2. Login User

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

Response: (same as register - save token for next requests)

### 3. Get Current User

```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 📦 Products API

### Get All Products

```bash
curl http://localhost:5000/api/products
```

With category filter:
```bash
curl "http://localhost:5000/api/products?category=Cakes"
```

### Get Product by ID

```bash
curl http://localhost:5000/api/products/507f1f77bcf86cd799439011
```

### Create Product (Admin)

```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "New Cake",
    "description": "Delicious new cake",
    "price": 45,
    "category": "Cakes",
    "quantity": 10
  }'
```

### Update Product (Admin)

```bash
curl -X PUT http://localhost:5000/api/products/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "price": 50,
    "quantity": 5
  }'
```

### Delete Product (Admin)

```bash
curl -X DELETE http://localhost:5000/api/products/507f1f77bcf86cd799439011 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🛒 Orders API

### Get My Orders

```bash
curl http://localhost:5000/api/orders/my-orders \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Get All Orders (Admin)

```bash
curl http://localhost:5000/api/orders \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Get Order by ID

```bash
curl http://localhost:5000/api/orders/507f1f77bcf86cd799439011 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Create Order

```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "items": [
      {
        "product": "507f1f77bcf86cd799439011",
        "name": "Chocolate Cake",
        "price": 45,
        "quantity": 1
      },
      {
        "product": "507f1f77bcf86cd799439012",
        "name": "Croissant",
        "price": 8,
        "quantity": 2
      }
    ],
    "total": 61,
    "deliveryAddress": "123 Main St, City, State 12345",
    "phone": "(555) 123-4567",
    "notes": "Please ring doorbell twice"
  }'
```

### Update Order Status (Admin)

```bash
curl -X PUT http://localhost:5000/api/orders/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "status": "Preparing"
  }'
```

Valid statuses:
- `Pending`
- `Preparing`
- `Out for Delivery`
- `Delivered`
- `Cancelled`

---

## 📧 Contact API

### Submit Contact Form

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "subject": "Custom Order Inquiry",
    "message": "I would like to order a custom cake for a special event..."
  }'
```

### Get All Messages (Admin)

```bash
curl http://localhost:5000/api/contact
```

---

## 🧪 Testing with Postman

### Import Collection

Create a new Postman Collection with:

**Base URL:** `{{base_url}}`
**Variable:** `base_url = http://localhost:5000/api`

### Environment Variables

```json
{
  "base_url": "http://localhost:5000/api",
  "token": ""
}
```

### Sample Requests

#### Register
```
POST {{base_url}}/auth/register
Body (JSON):
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "testpass123"
}
```

After registration, copy token to environment.

#### Get Products
```
GET {{base_url}}/products
Headers:
- Authorization: Bearer {{token}}
```

---

## 🧪 Testing with REST Client (VS Code)

Install extension: `REST Client`

Create `test.http`:

```http
### Health Check
GET http://localhost:5000/api/health

### Register
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}

### Login
@token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}

### Get Products
GET http://localhost:5000/api/products

### Get Products by Category
GET http://localhost:5000/api/products?category=Cakes

### Create Product (Admin)
POST http://localhost:5000/api/products
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "name": "Test Cake",
  "description": "Test Description",
  "price": 45,
  "category": "Cakes",
  "quantity": 10
}

### Get Current User
GET http://localhost:5000/api/auth/me
Authorization: Bearer {{token}}

### Create Order
POST http://localhost:5000/api/orders
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "items": [
    {
      "product": "507f1f77bcf86cd799439011",
      "name": "Chocolate Cake",
      "price": 45,
      "quantity": 1
    }
  ],
  "total": 45,
  "deliveryAddress": "123 Main St",
  "phone": "(555) 123-4567"
}

### Get My Orders
GET http://localhost:5000/api/orders/my-orders
Authorization: Bearer {{token}}

### Submit Contact Form
POST http://localhost:5000/api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Inquiry",
  "message": "I have a question..."
}
```

Click "Send Request" above each request to test.

---

## 🔍 Response Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Missing/invalid token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 500 | Server Error - Internal error |

---

## 🚨 Error Handling

### Error Response

```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

### Validation Errors

```json
{
  "errors": [
    {
      "value": "",
      "msg": "Name is required",
      "param": "name",
      "location": "body"
    }
  ]
}
```

---

## 📋 Common Testing Scenarios

### Scenario 1: Complete Order Flow

1. Register user
2. Get products
3. Create order
4. Get my orders
5. Admin updates order status

### Scenario 2: Product Management

1. Login as admin
2. Create product
3. Update product
4. Get all products
5. Delete product

### Scenario 3: Contact Inquiry

1. Submit contact form
2. Admin retrieves messages
3. Admin marks as read

---

## 📊 Test Data

### Test User
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```

### Test Admin
```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "admin123",
  "isAdmin": true
}
```

### Test Product
```json
{
  "name": "Test Cake",
  "description": "Delicious test cake",
  "price": 45,
  "category": "Cakes",
  "quantity": 10
}
```

---

## 🐛 Debugging Tips

1. **Check Token**: Verify token is valid and not expired
2. **Check Headers**: Ensure `Content-Type` and `Authorization` are correct
3. **Check Data**: Validate all required fields are provided
4. **Check Permissions**: Verify user has required permissions (admin)
5. **Check Database**: Verify data exists in MongoDB

---

## 📚 Resources

- cURL Documentation: https://curl.se/docs
- Postman: https://www.postman.com
- REST Client Extension: https://marketplace.visualstudio.com/items?itemName=humao.rest-client
- HTTP Status Codes: https://httpwg.org/specs/rfc9110.html#status.codes

---

**Happy Testing! 🧪** 🥐
