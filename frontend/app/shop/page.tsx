'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Check } from 'lucide-react'
import { products } from '@/lib/productsData'
import { useCartStore } from '@/lib/store'

const categories = ['All', 'Cakes', 'Pastries', 'Cookies', 'Donuts', 'Cupcakes']

export default function ShopPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [addedIds, setAddedIds] = useState<number[]>([])
  const addItem = useCartStore((s) => s.addItem)

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const handleAdd = (product: typeof products[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    })
    setAddedIds((prev) => [...prev, product.id])
    setTimeout(() => {
      setAddedIds((prev) => prev.filter((id) => id !== product.id))
    }, 1800)
  }

  return (
    <div className="section">
      <div className="sec-head">
        <div className="sec-tag">Fresh Daily</div>
        <h2>Our Bakery Menu</h2>
        <div className="divider"></div>
      </div>

      <div className="flex items-center gap-2.5 bg-white border border-border rounded-full py-2.5 px-5 max-w-[360px] mx-auto mb-7 shadow-[0_4px_24px_rgba(44,26,14,0.1)]">
        <span className="text-muted text-lg">🔍</span>
        <input
          type="text"
          placeholder="Search products..."
          className="border-none bg-transparent outline-none text-sm flex-1 text-text placeholder-muted"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex gap-2 flex-wrap justify-center mb-8">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`border border-border bg-white py-2 px-5 rounded-full text-[13px] font-medium cursor-pointer transition-all duration-200 ${activeCategory === cat
                ? 'bg-brown text-white border-brown'
                : 'text-muted hover:bg-brown hover:text-white hover:border-brown'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const isAdded = addedIds.includes(product.id)
            return (
              <div key={product.id} className="prod-card">
                <div className="prod-img-wrap">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="p-4">
                  <div className="text-[11px] text-accent font-semibold uppercase tracking-[0.8px] mb-1">
                    {product.category}
                  </div>
                  <div className="font-display text-[19px] font-bold text-dark mb-1 leading-[1.2]">
                    {product.name}
                  </div>
                  <div className="text-gold text-xs mb-1.5">
                    {'★'.repeat(Math.floor(product.rating))}
                    <span className="text-muted text-[11px] ml-1">(120)</span>
                  </div>
                  <div className="text-xs text-muted leading-[1.55] mb-3 min-h-[36px]">
                    {product.description}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-display text-[22px] font-bold text-brown">
                      ₹{product.price.toLocaleString('en-IN')}
                    </div>
                    <button
                      onClick={() => handleAdd(product)}
                      className={`text-white border-none w-[34px] h-[34px] rounded-full text-[20px] flex items-center justify-center cursor-pointer transition-all duration-200 font-light ${isAdded
                          ? 'bg-green-500 scale-110'
                          : 'bg-brown hover:bg-accent hover:scale-110'
                        }`}
                    >
                      {isAdded ? '✓' : '+'}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center p-12 text-muted">
          <div className="text-[48px] mb-3">🔍</div>
          <div className="text-base">No products found. Try a different search.</div>
        </div>
      )}
    </div>
  )
}