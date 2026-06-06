import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="section">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
        <div className="rounded-3xl overflow-hidden h-[380px] relative">
          <Image 
            src="https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=700&q=80" 
            alt="Bakery kitchen" 
            fill 
            className="object-cover"
          />
        </div>
        <div>
          <div className="sec-tag">Our Story</div>
          <h2 className="font-display text-[40px] text-brown mb-4 leading-tight font-bold">Crafted with Passion Since 2018</h2>
          <p className="text-[15px] text-muted leading-[1.75] mb-4">
            Sweet Crumbs was born from a simple belief: every great moment deserves a great treat. Founded in Chennai by a family of passionate bakers, we blend traditional recipes with modern techniques.
          </p>
          <p className="text-[15px] text-muted leading-[1.75] mb-4">
            Every item on our menu is baked fresh each morning using locally sourced ingredients — from finest Belgian chocolate to organic vanilla pods. Quality is never compromised.
          </p>
          <div className="grid grid-cols-2 gap-3 mt-6">
            <div className="bg-warm rounded-2xl p-4 text-center">
              <div className="font-display text-[32px] font-bold text-brown">6+</div>
              <div className="text-xs text-muted">Years of Baking</div>
            </div>
            <div className="bg-warm rounded-2xl p-4 text-center">
              <div className="font-display text-[32px] font-bold text-brown">500+</div>
              <div className="text-xs text-muted">Happy Customers</div>
            </div>
            <div className="bg-warm rounded-2xl p-4 text-center">
              <div className="font-display text-[32px] font-bold text-brown">12</div>
              <div className="text-xs text-muted">Signature Products</div>
            </div>
            <div className="bg-warm rounded-2xl p-4 text-center">
              <div className="font-display text-[32px] font-bold text-brown">4.9★</div>
              <div className="text-xs text-muted">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
