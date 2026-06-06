// @ts-nocheck
import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import User from '../models/User'
import { generateToken } from '../utils/jwt'
import { authMiddleware } from '../middleware/auth'

const router = express.Router()

// Register
router.post(
  '/register',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  async (req: Request, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
        return
      }

      const { name, email, password } = req.body

      // Check if user exists
      const existingUser = await User.findOne({ email })
      if (existingUser) {
        res.status(400).json({ message: 'Email already registered' })
        return
      }

      // Create new user
      const user = new User({ name, email, password })
      await user.save()

      const token = generateToken(user._id.toString())
      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        token,
        user: { id: user._id, name: user.name, email: user.email },
      })
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  }
)

// Login
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req: Request, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
        return
      }

      const { email, password } = req.body

      // Find user and select password field
      const user = await User.findOne({ email }).select('+password')
      if (!user) {
        res.status(401).json({ message: 'Invalid email or password' })
        return
      }

      // Check password
      const isPasswordValid = await user.comparePassword(password)
      if (!isPasswordValid) {
        res.status(401).json({ message: 'Invalid email or password' })
        return
      }

      const token = generateToken(user._id.toString(), user.isAdmin)
      res.json({
        success: true,
        message: 'Logged in successfully',
        token,
        user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin },
      })
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  }
)

// Get current user
router.get('/me', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById((req as any).user.id)
    res.json({ success: true, user })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

// Logout
router.post('/logout', (req: Request, res: Response): void => {
  res.json({ success: true, message: 'Logged out successfully' })
})

export default router

