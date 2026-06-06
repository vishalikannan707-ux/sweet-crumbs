import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Product from './models/Product'
import User from './models/User'

dotenv.config()

const sampleProducts = [
  {
    name: 'Chocolate Delight Cake',
    description: 'Rich chocolate cake with layers of ganache and premium cocoa',
    price: 45,
    category: 'Cakes',
    quantity: 20,
    rating: 4.8,
    reviews: 156,
  },
  {
    name: 'Vanilla Croissant',
    description: 'Buttery, flaky French-style croissant with vanilla cream',
    price: 8,
    category: 'Pastries',
    quantity: 50,
    rating: 4.9,
    reviews: 203,
  },
  {
    name: 'Chocolate Chip Cookie',
    description: 'Classic chocolate chip cookie with premium Belgium chocolate',
    price: 5,
    category: 'Cookies',
    quantity: 100,
    rating: 4.7,
    reviews: 312,
  },
  {
    name: 'Glazed Donut',
    description: 'Perfectly glazed, soft donut with smooth vanilla glaze',
    price: 6,
    category: 'Donuts',
    quantity: 80,
    rating: 4.6,
    reviews: 148,
  },
  {
    name: 'Strawberry Cupcake',
    description: 'Fresh strawberry with premium cream frosting',
    price: 7,
    category: 'Cupcakes',
    quantity: 40,
    rating: 4.8,
    reviews: 189,
  },
  {
    name: 'Tiramisu Cake',
    description: 'Traditional Italian tiramisu with mascarpone cream',
    price: 50,
    category: 'Cakes',
    quantity: 15,
    rating: 4.9,
    reviews: 234,
  },
  {
    name: 'Apple Pie',
    description: 'Homemade apple pie with cinnamon and caramel drizzle',
    price: 35,
    category: 'Cakes',
    quantity: 20,
    rating: 4.7,
    reviews: 167,
  },
  {
    name: 'Almond Croissant',
    description: 'Crispy croissant with roasted almonds and honey glaze',
    price: 9,
    category: 'Pastries',
    quantity: 45,
    rating: 4.8,
    reviews: 145,
  },
  {
    name: 'Double Chocolate Brownie',
    description: 'Fudgy double chocolate brownie with chocolate chunks',
    price: 6,
    category: 'Cookies',
    quantity: 60,
    rating: 4.9,
    reviews: 287,
  },
  {
    name: 'Glazed Maple Donut',
    description: 'Premium maple glazed donut with crispy exterior',
    price: 7,
    category: 'Donuts',
    quantity: 70,
    rating: 4.7,
    reviews: 156,
  },
  {
    name: 'Vanilla Cupcake with Sprinkles',
    description: 'Classic vanilla cupcake with colorful sprinkles',
    price: 6,
    category: 'Cupcakes',
    quantity: 100,
    rating: 4.6,
    reviews: 198,
  },
  {
    name: 'Red Velvet Cake',
    description: 'Elegant red velvet cake with cream cheese frosting',
    price: 48,
    category: 'Cakes',
    quantity: 18,
    rating: 4.8,
    reviews: 210,
  },
]

const seedDatabase = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sweet-crumbs'
    await mongoose.connect(mongoURI)
    console.log('✓ Connected to MongoDB')

    // Clear existing products
    await Product.deleteMany({})
    console.log('✓ Cleared existing products')

    // Insert sample products
    const result = await Product.insertMany(sampleProducts)
    console.log(`✓ Inserted ${result.length} products`)

    console.log('✓ Database seeding completed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('✗ Seeding failed:', error)
    process.exit(1)
  }
}

seedDatabase()
