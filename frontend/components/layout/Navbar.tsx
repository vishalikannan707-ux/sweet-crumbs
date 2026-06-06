'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useCartStore } from '@/lib/store'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/shop' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const items = useCartStore((s) => s.items)
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav
        className={`bg-[#FFF9F2]/95 backdrop-blur-md border-b border-border px-8 flex items-center justify-between h-16 sticky top-0 z-[200] transition-shadow duration-300 ${
          mounted && isScrolled ? 'shadow-[0_2px_20px_rgba(44,26,14,0.08)]' : ''
        }`}
      >
        <Link href="/" className="font-display text-2xl font-bold text-brown tracking-[-0.5px]">
          Sweet <span className="text-accent">Crumbs</span>
        </Link>

        <div className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium py-1.5 px-0.5 border-b-2 transition-all duration-200 ${
                mounted && (pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/'))
                  ? 'text-brown border-accent'
                  : 'text-muted border-transparent hover:text-brown hover:border-accent'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/login"
            className="hidden md:inline-flex bg-transparent border border-border py-2 px-4 rounded-full text-[13px] font-medium text-brown transition-all duration-200 hover:bg-warm hover:border-accent"
          >
            Sign In
          </Link>
          <Link
            href="/cart"
            className="bg-brown text-white py-2 px-4 rounded-full text-[13px] font-medium flex items-center gap-2 transition-all duration-200 hover:bg-dark hover:-translate-y-[1px]"
          >
            🛒 Cart{' '}
            <span className="bg-accent text-white rounded-full min-w-[18px] h-[18px] text-[11px] flex items-center justify-center font-semibold">
              {mounted ? cartCount : 0}
            </span>
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden bg-transparent border-none text-[22px] text-brown cursor-pointer"
          >
            {mounted && isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mounted && (
        <div
          className={`md:hidden fixed top-16 left-0 right-0 bg-light border-b border-border p-4 z-[199] flex flex-col gap-1 transition-all duration-300 ${
            isOpen
              ? 'translate-y-0 opacity-100 pointer-events-auto shadow-[0_10px_20px_rgba(0,0,0,0.1)]'
              : '-translate-y-4 opacity-0 pointer-events-none'
          }`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="bg-transparent border-none text-left py-2.5 text-[15px] text-text border-b border-border cursor-pointer font-medium"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/login"
            className="bg-transparent border-none text-left py-2.5 text-[15px] text-brown font-semibold border-b border-border cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            👤 Sign In
          </Link>
        </div>
      )}
    </>
  )
}