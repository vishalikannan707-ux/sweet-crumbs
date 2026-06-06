// @ts-nocheck
import express from 'express'
import { body, validationResult } from 'express-validator'
import Product from '../models/Product'
import { authMiddleware, adminMiddleware } from '../middleware/auth'

const router = express.Router()

// Get all products
router.get('/', async (req, res) => {
  try {
    const { category } = req.query
    const filter = category ? { category } : {}
    const products = await Product.find(filter)
    res.json({ success: true, data: products })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.json({ success: true, data: product })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

// Create product (Admin only)
router.post(
  '/',
  authMiddleware,
  adminMiddleware,
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('price').isFloat({ min: 0 }).withMessage('Valid price is required'),
    body('category').isIn(['Cakes', 'Pastries', 'Cookies', 'Donuts', 'Cupcakes']).withMessage('Invalid category'),
  ],
  async (req: any, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const product = new Product(req.body)
      await product.save()
      res.status(201).json({ success: true, data: product })
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  }
)

// Update product (Admin only)
router.put(
  '/:id',
  authMiddleware,
  adminMiddleware,
  async (req: any, res) => {
    try {
      const product = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      )
      if (!product) {
        return res.status(404).json({ message: 'Product not found' })
      }
      res.json({ success: true, data: product })
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  }
)

// Delete product (Admin only)
router.delete(
  '/:id',
  authMiddleware,
  adminMiddleware,
  async (req: any, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id)
      if (!product) {
        return res.status(404).json({ message: 'Product not found' })
      }
      res.json({ success: true, message: 'Product deleted' })
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  }
)

export default router

