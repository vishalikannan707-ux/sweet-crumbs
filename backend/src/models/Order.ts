import mongoose, { Schema, Document } from 'mongoose'

export interface IOrder extends Document {
  user: mongoose.Schema.Types.ObjectId
  items: Array<{
    product: mongoose.Schema.Types.ObjectId
    name: string
    price: number
    quantity: number
  }>
  total: number
  status: 'Pending' | 'Preparing' | 'Out for Delivery' | 'Delivered' | 'Cancelled'
  deliveryAddress: string
  phone: string
  notes?: string
  createdAt: Date
  updatedAt: Date
}

const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [
      {
        product: mongoose.Schema.Types.ObjectId,
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
    deliveryAddress: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    notes: String,
  },
  { timestamps: true }
)

export default mongoose.model<IOrder>('Order', orderSchema)
