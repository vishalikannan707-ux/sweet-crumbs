// @ts-nocheck
import express from 'express'
import { body, validationResult } from 'express-validator'
import Contact from '../models/Contact'

const router = express.Router()

// Submit contact form
router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('subject').trim().notEmpty().withMessage('Subject is required'),
    body('message').trim().notEmpty().withMessage('Message is required'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const contact = new Contact(req.body)
      await contact.save()
      res.status(201).json({ success: true, message: 'Message sent successfully' })
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  }
)

// Get all contacts (Admin only - would need auth middleware)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 })
    res.json({ success: true, data: contacts })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

export default router

