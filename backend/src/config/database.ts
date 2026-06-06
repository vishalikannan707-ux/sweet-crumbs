import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import Product from '../models/Product'

let mongoServer: MongoMemoryServer | null = null

const seedIfEmpty = async () => {
  try {
    const count = await Product.countDocuments()
    if (count === 0) {
      console.log('Database is empty. Seeding sample products...')
      const sampleProducts = [
        {
          name: 'Chocolate Delight Cake',
          description: 'Rich chocolate cake with layers of ganache and premium cocoa',
          price: 45,
          priceINR: 45 * 84,
          category: 'Cakes',
          quantity: 20,
          rating: 4.8,
          reviews: 156,
          image: '/images/chocolate-cake.jpg'
        },
        {
          name: 'Vanilla Croissant',
          description: 'Buttery, flaky French-style croissant with vanilla cream',
          price: 8,
          priceINR: 8 * 84,
          category: 'Pastries',
          quantity: 50,
          rating: 4.9,
          reviews: 203,
          image: '/images/croissant.jpg'
        },
        {
          name: 'Chocolate Chip Cookie',
          description: 'Classic chocolate chip cookie with premium Belgium chocolate',
          price: 5,
          priceINR: 5 * 84,
          category: 'Cookies',
          quantity: 100,
          rating: 4.7,
          reviews: 312,
          image: '/images/cookie.jpg'
        },
        {
          name: 'Glazed Donut',
          description: 'Perfectly glazed, soft donut with smooth vanilla glaze',
          price: 6,
          priceINR: 6 * 84,
          category: 'Donuts',
          quantity: 80,
          rating: 4.6,
          reviews: 148,
          image: '/images/donut.jpg'
        },
        {
          name: 'Strawberry Cupcake',
          description: 'Fresh strawberry with premium cream frosting',
          price: 7,
          priceINR: 7 * 84,
          category: 'Cupcakes',
          quantity: 40,
          rating: 4.8,
          reviews: 189,
          image: '/images/cupcake.jpg'
        },
        {
          name: 'Tiramisu Cake',
          description: 'Traditional Italian tiramisu with mascarpone cream',
          price: 50,
          priceINR: 50 * 84,
          category: 'Cakes',
          quantity: 15,
          rating: 4.9,
          reviews: 234,
          image: '/images/tiramisu-cake.jpg'
        },
        {
          name: 'Apple Pie',
          description: 'Homemade apple pie with cinnamon and caramel drizzle',
          price: 35,
          priceINR: 35 * 84,
          category: 'Cakes',
          quantity: 20,
          rating: 4.7,
          reviews: 167,
          image: '/images/apple-pie.jpg'
        },
        {
          name: 'Almond Croissant',
          description: 'Crispy croissant with roasted almonds and honey glaze',
          price: 9,
          priceINR: 9 * 84,
          category: 'Pastries',
          quantity: 45,
          rating: 4.8,
          reviews: 145,
          image: '/images/almond-croissant.jpg'
        },
        {
          name: 'Double Chocolate Brownie',
          description: 'Fudgy double chocolate brownie with chocolate chunks',
          price: 6,
          priceINR: 6 * 84,
          category: 'Cookies',
          quantity: 60,
          rating: 4.9,
          reviews: 287,
          image: '/images/double-chocolate-brownie.jpg'
        },
        {
          name: 'Glazed Maple Donut',
          description: 'Premium maple glazed donut with crispy exterior',
          price: 7,
          priceINR: 7 * 84,
          category: 'Donuts',
          quantity: 70,
          rating: 4.7,
          reviews: 156,
          image: '/images/glazed-maple-donut.jpg'
        },
        {
          name: 'Vanilla Cupcake with Sprinkles',
          description: 'Classic vanilla cupcake with colorful sprinkles',
          price: 6,
          priceINR: 6 * 84,
          category: 'Cupcakes',
          quantity: 100,
          rating: 4.6,
          reviews: 198,
          image: '/images/vanilla-cupcake.jpg'
        },
        {
          name: 'Red Velvet Cake',
          description: 'Elegant red velvet cake with cream cheese frosting',
          price: 48,
          priceINR: 48 * 84,
          category: 'Cakes',
          quantity: 18,
          rating: 4.8,
          reviews: 210,
          image: '/images/red-velvet-cake.jpg'
        }
      ]
      await Product.insertMany(sampleProducts)
      console.log('✓ Successfully seeded database with 12 sample products')
    }
  } catch (err) {
    console.error('✗ Failed to seed database:', err)
  }
}

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sweet-crumbs'

    try {
      console.log(`Connecting to MongoDB at ${mongoURI}...`)
      await mongoose.connect(mongoURI, { serverSelectionTimeoutMS: 2500 })
      console.log('✓ Connected to MongoDB successfully')
      await seedIfEmpty()
    } catch (err) {
      console.log('✗ Failed to connect to configured MongoDB. Falling back to in-memory database...')
      
      // Clear mongoose connection state
      await mongoose.disconnect()
      
      mongoServer = await MongoMemoryServer.create()
      const memoryURI = mongoServer.getUri()
      console.log(`✓ Started MongoMemoryServer at ${memoryURI}`)
      
      await mongoose.connect(memoryURI)
      console.log('✓ MongoDB (In-Memory) connected successfully')
      await seedIfEmpty()
    }
  } catch (error) {
    console.error('✗ MongoDB connection failed completely:', error)
    process.exit(1)
  }
}

export default connectDB
