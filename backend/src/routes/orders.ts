// @ts-nocheck
import express from 'express'
import { body, validationResult } from 'express-validator'
import Order from '../models/Order'
import { authMiddleware, adminMiddleware } from '../middleware/auth'

const router = express.Router()

// Get user's orders
router.get('/my-orders', authMiddleware, async (req: any, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate(
      'items.product'
    )
    res.json({ success: true, data: orders })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

// Get all orders (Admin only)
router.get('/', authMiddleware, adminMiddleware, async (req: any, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email phone')
      .populate('items.product')
    res.json({ success: true, data: orders })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

// Get order by ID
router.get('/:id', authMiddleware, async (req: any, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      'items.product'
    )
    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }
    res.json({ success: true, data: order })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

// Create order
router.post(
  '/',
  authMiddleware,
  [
    body('items').isArray({ min: 1 }).withMessage('Items array is required'),
    body('total').isFloat({ min: 0 }).withMessage('Valid total is required'),
    body('deliveryAddress').notEmpty().withMessage('Delivery address is required'),
    body('phone').notEmpty().withMessage('Phone number is required'),
  ],
  async (req: any, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const order = new Order({
        user: req.user.id,
        ...req.body,
      })
      await order.save()
      res.status(201).json({ success: true, data: order })
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  }
)

// Update order status (Admin only)
router.put(
  '/:id',
  authMiddleware,
  adminMiddleware,
  [
    body('status')
      .isIn(['Pending', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'])
      .withMessage('Invalid status'),
  ],
  async (req: any, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const order = await Order.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true }
      )
      if (!order) {
        return res.status(404).json({ message: 'Order not found' })
      }
      res.json({ success: true, data: order })
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  }
)

export default router

