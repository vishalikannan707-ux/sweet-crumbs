'use client'

import Link from 'next/link'
import Image from 'next/image'
import { products } from '@/lib/productsData'

export default function BestSellers() {
  const bestSellers = products.filter(p => p.rating >= 4.8).slice(0, 4)

  return (
    <div className="section">
      <div className="sec-head">
        <div className="sec-tag">Most Loved</div>
        <h2>Our Best Sellers</h2>
        <div className="divider"></div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {bestSellers.map((product) => (
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
                <span className="text-muted text-[11px] ml-1">({product.reviews || 120})</span>
              </div>
              <div className="text-xs text-muted leading-[1.55] mb-3 min-h-[36px]">
                {product.description}
              </div>
              <div className="flex items-center justify-between">
                <div className="font-display text-[22px] font-bold text-brown">
                  ₹{product.price}
                  {product.oldPrice && (
                    <small className="text-[13px] font-sans text-muted line-through ml-1">
                      ₹{product.oldPrice}
                    </small>
                  )}
                </div>
                <button className="bg-brown text-white border-none w-[34px] h-[34px] rounded-full text-[20px] flex items-center justify-center cursor-pointer transition-all duration-200 font-light hover:bg-accent hover:scale-110">
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-10">
        <Link href="/shop" className="btn-hero-primary inline-block">
          View All Products →
        </Link>
      </div>
    </div>
  )
}
