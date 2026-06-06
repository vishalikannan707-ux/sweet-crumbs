'use client'

import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

const features = [
  'Premium quality ingredients',
  'Handcrafted with love',
  'Fresh baked daily',
  'Sustainable packaging',
]

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-cream to-warm-beige">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-accent-orange font-semibold mb-2">OUR STORY</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-dark-chocolate mb-6">
              Crafted with Passion Since 2009
            </h2>
            <p className="text-lg text-dark-chocolate opacity-80 mb-6">
              Founded in 2009, Sweet Crumbs Bakery started with a simple dream:
              to create the most delicious, premium baked goods using only the
              finest ingredients.
            </p>
            <p className="text-lg text-dark-chocolate opacity-80 mb-8">
              Every pastry, cake, and cookie is handcrafted by our expert
              bakers with attention to detail and a passion for excellence. We
              believe in quality over quantity, using fresh, sustainable
              ingredients in every creation.
            </p>

            {/* Features */}
            <div className="space-y-4">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="w-6 h-6 text-accent-orange flex-shrink-0" />
                  <span className="text-dark-chocolate font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="hidden lg:block"
          >
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-warm-beige to-soft-brown h-96 flex items-center justify-center text-9xl">
              👩‍🍳
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
        >
          {[
            { number: '10,000+', label: 'Happy Customers', icon: '😊' },
            { number: '500+', label: 'Recipes Perfected', icon: '📖' },
            { number: '15', label: 'Years of Excellence', icon: '🏆' },
          ].map((stat, idx) => (
            <div key={idx} className="text-center card-luxury">
              <p className="text-5xl mb-3">{stat.icon}</p>
              <p className="font-display text-3xl font-bold text-accent-orange mb-2">
                {stat.number}
              </p>
              <p className="text-dark-chocolate opacity-70">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
