'use client'

import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark text-white pt-20 pb-6 px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-[1100px] mx-auto border-b border-white/10 pb-12">
        {/* Brand */}
        <div>
          <div className="font-display text-[26px] font-bold text-gold mb-4">
            🥐 Sweet Crumbs
          </div>
          <p className="text-sm text-white/70 leading-[1.6] mb-6">
            Baking smiles every day since 2018. Handcrafted with love in Chennai.
          </p>
          <div className="flex gap-3">
            <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-sm text-white transition-all hover:bg-gold hover:-translate-y-1">Fb</a>
            <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-sm text-white transition-all hover:bg-gold hover:-translate-y-1">Ig</a>
            <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-sm text-white transition-all hover:bg-gold hover:-translate-y-1">Tw</a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display text-[18px] font-bold text-white mb-5">Quick Links</h4>
          <div className="flex flex-col gap-3 text-sm text-white/70">
            <Link href="/shop" className="hover:text-gold transition-colors">Shop</Link>
            <Link href="/about" className="hover:text-gold transition-colors">About Us</Link>
            <Link href="/contact" className="hover:text-gold transition-colors">Contact</Link>
            <Link href="/dashboard" className="hover:text-gold transition-colors">Track Order</Link>
          </div>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-display text-[18px] font-bold text-white mb-5">Information</h4>
          <div className="flex flex-col gap-3 text-sm text-white/70">
            <Link href="#" className="hover:text-gold transition-colors">FAQ</Link>
            <Link href="#" className="hover:text-gold transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-gold transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-gold transition-colors">Refund Policy</Link>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-display text-[18px] font-bold text-white mb-5">Newsletter</h4>
          <p className="text-sm text-white/70 leading-[1.6] mb-4">
            Subscribe for exclusive offers and updates.
          </p>
          <div className="flex bg-white/5 border border-white/10 rounded-full overflow-hidden p-1">
            <input
              type="email"
              placeholder="Your email address"
              className="bg-transparent border-none text-white text-sm px-3 flex-1 outline-none placeholder-white/50 min-w-0"
            />
            <button className="bg-gold text-dark w-[38px] h-[38px] rounded-full flex items-center justify-center border-none cursor-pointer font-bold shrink-0 transition-colors hover:bg-white">
              →
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto text-center pt-6 text-[13px] text-white/50">
        &copy; {currentYear} Sweet Crumbs. All rights reserved. | Handcrafted in Chennai.
      </div>
    </footer>
  )
}
