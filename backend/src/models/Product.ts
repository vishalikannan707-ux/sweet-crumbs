import mongoose, { Schema, Document } from 'mongoose'

export interface IProduct extends Document {
  name: string
  description: string
  price: number
  priceINR?: number
  category: string
  image?: string
  inStock: boolean
  quantity: number
  rating: number
  reviews: number
  createdAt: Date
  updatedAt: Date
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Please provide product name'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide product description'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide product price'],
      min: 0,
    },
    priceINR: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      enum: ['Cakes', 'Pastries', 'Cookies', 'Donuts', 'Cupcakes'],
      required: true,
    },
    image: String,
    inStock: {
      type: Boolean,
      default: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
)

export default mongoose.model<IProduct>('Product', productSchema)
