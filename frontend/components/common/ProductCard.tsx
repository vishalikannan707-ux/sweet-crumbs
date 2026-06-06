'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Star, ShoppingCart, Check } from 'lucide-react'
import { useState } from 'react'
import { useCartStore } from '@/lib/store'

interface ProductCardProps {
  product: {
    id: number
    name: string
    price: number
    rating: number
    image: string
    description: string
    category: string
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem)
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <div className="card-luxury group cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white">
      {/* Image */}
      <div className="relative w-full h-52 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Category badge */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-dark-chocolate text-xs font-semibold px-3 py-1 rounded-full shadow">
          {product.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-lg font-bold text-dark-chocolate mb-1 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-dark-chocolate opacity-60 mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${
                i < Math.floor(product.rating)
                  ? 'fill-accent-orange text-accent-orange'
                  : 'text-gray-300'
              }`}
            />
          ))}
          <span className="text-xs text-dark-chocolate opacity-60 ml-1">({product.rating})</span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="font-display text-2xl font-bold text-accent-orange">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleAdd}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                added
                  ? 'bg-green-500 text-white shadow-md'
                  : 'bg-accent-orange text-white hover:bg-accent-orange/90 hover:shadow-premium'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" /> Added!
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" /> Add
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
