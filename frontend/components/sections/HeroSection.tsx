'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function HeroSection() {
  const heroCards = [
    { name: 'Almond Croissant', price: '₹180', rating: '4.9★', img: 'https://images.unsplash.com/photo-1555507036-ab1e4006aa07?w=150&q=80' },
    { name: 'Chocolate Truffle', price: '₹950', rating: '5.0★', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=150&q=80' },
    { name: 'Blueberry Tart', price: '₹220', rating: '4.8★', img: 'https://images.unsplash.com/photo-1519869325930-281384150729?w=150&q=80' },
  ]

  return (
    <div className="relative min-h-[580px] flex items-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center brightness-[0.45]"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1400&q=80')" }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#2C1A0E]/85 via-[#7C4A2D]/60 to-[#C8854A]/30"></div>
      
      <div className="relative z-10 max-w-[1100px] mx-auto px-8 py-16 grid grid-cols-1 md:grid-cols-[1fr_400px] gap-12 items-center w-full">
        <div className="text-white">
          <div className="inline-block bg-[#D4A055]/25 border border-[#D4A055]/50 text-gold text-xs font-semibold tracking-[1.5px] uppercase px-3.5 py-1.5 rounded-full mb-5">
            ✨ Freshly Baked Daily
          </div>
          <h1 className="text-[40px] sm:text-[56px] font-bold leading-[1.08] mb-5 shadow-black/30 drop-shadow-lg font-display">
            Baked with <em className="text-gold italic not-italic">Love</em>,<br />Crafted for You
          </h1>
          <p className="text-white/80 text-base leading-[1.75] mb-8 max-w-[440px]">
            Premium artisan baked goods made fresh every morning in Chennai. From rich chocolate cakes to flaky almond croissants — every bite is a celebration.
          </p>
          <div className="flex flex-wrap gap-3 mb-10">
            <Link href="/shop" className="btn-hero-primary">Explore Our Menu →</Link>
            <Link href="/about" className="btn-hero-secondary">Our Story</Link>
          </div>
          <div className="flex gap-10">
            <div>
              <div className="font-display text-[30px] font-bold text-gold">12+</div>
              <div className="text-xs text-white/60 mt-0.5">Signature Items</div>
            </div>
            <div>
              <div className="font-display text-[30px] font-bold text-gold">500+</div>
              <div className="text-xs text-white/60 mt-0.5">Happy Customers</div>
            </div>
            <div>
              <div className="font-display text-[30px] font-bold text-gold">4.9★</div>
              <div className="text-xs text-white/60 mt-0.5">Avg. Rating</div>
            </div>
          </div>
        </div>
        
        <div className="hidden md:flex flex-col gap-3.5">
          {heroCards.map((card, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3.5 flex items-center gap-3.5 transition-transform duration-200 hover:-translate-x-1">
              <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-white/10 relative">
                <Image src={card.img} alt={card.name} fill className="object-cover" sizes="56px" />
              </div>
              <div>
                <div className="font-display text-[15px] text-white font-semibold">{card.name}</div>
                <div className="text-[13px] text-gold font-semibold">{card.price}</div>
                <div className="text-[11px] text-white/60 mt-[1px]">{card.rating}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
