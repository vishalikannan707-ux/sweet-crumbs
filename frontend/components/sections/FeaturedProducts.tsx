'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ProductCard from '@/components/common/ProductCard'
import { products, categories } from '@/lib/productsData'

export default function FeaturedProducts() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredProducts =
    activeCategory === 'All'
      ? products
      : products.filter((p) => p.category === activeCategory)

  return (
    <section
      id="products"
      className="py-24 bg-gradient-to-b from-cream to-warm-beige"
    >
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-accent-orange font-semibold mb-2">OUR COLLECTION</p>
          <h2 className="font-display text-5xl font-bold text-dark-chocolate mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-dark-chocolate opacity-70 max-w-2xl mx-auto">
            Discover our premium selection of freshly baked delicacies
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-accent-orange text-white'
                  : 'bg-white text-dark-chocolate hover:bg-warm-beige'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
