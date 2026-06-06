'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { useState } from 'react'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <section id="contact" className="py-24 bg-cream">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-accent-orange font-semibold mb-2">GET IN TOUCH</p>
          <h2 className="font-display text-5xl font-bold text-dark-chocolate mb-4">
            Contact Us
          </h2>
          <p className="text-xl text-dark-chocolate opacity-70">
            We'd love to hear from you. Send us a message!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Phone */}
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-lg bg-accent-orange flex items-center justify-center text-white flex-shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-dark-chocolate mb-1">
                  Phone
                </h4>
                <p className="text-dark-chocolate opacity-70">(555) 123-4567</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-lg bg-accent-orange flex items-center justify-center text-white flex-shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-dark-chocolate mb-1">Email</h4>
                <p className="text-dark-chocolate opacity-70">
                  hello@sweetcrumbs.com
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-lg bg-accent-orange flex items-center justify-center text-white flex-shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-dark-chocolate mb-1">
                  Location
                </h4>
                <p className="text-dark-chocolate opacity-70">
                  123 Baker Street, Bakery City, BC 12345
                </p>
              </div>
            </div>

            {/* Hours */}
            <div className="card-luxury">
              <h4 className="font-semibold text-dark-chocolate mb-3">Hours</h4>
              <div className="space-y-2 text-sm text-dark-chocolate opacity-70">
                <p>Mon - Fri: 7:00 AM - 8:00 PM</p>
                <p>Sat: 8:00 AM - 9:00 PM</p>
                <p>Sun: 8:00 AM - 6:00 PM</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2 card-luxury"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-dark-chocolate mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-warm-beige focus:outline-none focus:border-accent-orange bg-white"
                  placeholder="Your name"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-dark-chocolate mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-warm-beige focus:outline-none focus:border-accent-orange bg-white"
                  placeholder="your@email.com"
                  required
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-semibold text-dark-chocolate mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-warm-beige focus:outline-none focus:border-accent-orange bg-white"
                  placeholder="How can we help?"
                  required
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-dark-chocolate mb-2">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-warm-beige focus:outline-none focus:border-accent-orange bg-white resize-none"
                  rows={5}
                  placeholder="Tell us more..."
                  required
                />
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full btn-primary flex items-center justify-center gap-2 group"
              >
                Send Message
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
