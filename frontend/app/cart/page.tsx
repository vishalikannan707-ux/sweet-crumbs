'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCartStore } from '@/lib/store'

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCartStore()

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = subtotal > 999 ? 0 : 49
  const total = subtotal + deliveryFee

  if (items.length === 0) {
    return (
      <div className="section text-center py-20 text-muted">
        <span className="text-[64px] mb-4 block">🛒</span>
        <h3 className="text-[26px] font-display font-bold text-brown mb-3">Your cart is empty</h3>
        <p className="text-sm mb-6">Looks like you haven't added anything yet.</p>
        <Link href="/shop" className="btn-hero-primary inline-block">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="section">
      <div className="sec-head">
        <h2 className="font-display text-[40px] font-bold text-brown">Shopping Cart</h2>
        <div className="divider"></div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">
        <div className="bg-white border border-border rounded-[18px] overflow-hidden overflow-x-auto">
          <table className="w-full border-collapse min-w-[600px]">
            <thead>
              <tr>
                <th className="bg-warm py-[13px] px-4 text-left text-[13px] font-semibold text-brown">Product</th>
                <th className="bg-warm py-[13px] px-4 text-left text-[13px] font-semibold text-brown">Price</th>
                <th className="bg-warm py-[13px] px-4 text-left text-[13px] font-semibold text-brown">Quantity</th>
                <th className="bg-warm py-[13px] px-4 text-left text-[13px] font-semibold text-brown">Subtotal</th>
                <th className="bg-warm py-[13px] px-4 text-left text-[13px] font-semibold text-brown"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="p-4 border-t border-border align-middle">
                    <div className="flex items-center gap-3">
                      <div className="w-[52px] h-[52px] rounded-[10px] overflow-hidden shrink-0 bg-warm relative">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div>
                        <div className="font-display text-base font-bold text-dark">{item.name}</div>
                        <div className="text-xs text-muted">{item.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-t border-border align-middle text-sm">
                    ₹{item.price}
                  </td>
                  <td className="p-4 border-t border-border align-middle">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="bg-warm border border-border w-7 h-7 rounded-full cursor-pointer text-[15px] flex items-center justify-center text-brown transition-colors hover:bg-border"
                      >
                        -
                      </button>
                      <span className="font-semibold min-w-[20px] text-center text-sm">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="bg-warm border border-border w-7 h-7 rounded-full cursor-pointer text-[15px] flex items-center justify-center text-brown transition-colors hover:bg-border"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="p-4 border-t border-border align-middle text-sm font-semibold">
                    ₹{item.price * item.quantity}
                  </td>
                  <td className="p-4 border-t border-border align-middle">
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="bg-transparent border-none text-red cursor-pointer text-xs font-medium py-1 px-2 rounded-md transition-colors hover:bg-red-bg"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="bg-white border border-border rounded-[18px] p-[22px] sticky top-20">
          <h3 className="font-display text-[24px] font-bold text-dark mb-5">Order Summary</h3>
          <div className="flex justify-between text-sm text-muted mb-2.5">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between text-sm text-muted mb-2.5">
            <span>Delivery</span>
            <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
          </div>
          <div className="flex justify-between font-display text-[22px] font-bold text-dark border-t border-border pt-3.5 mt-1.5">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
          
          <Link href="/checkout" className="block text-center w-full bg-gradient-to-br from-brown to-accent text-white border-none p-[15px] rounded-full text-[15px] font-semibold cursor-pointer mt-4 transition-all duration-250 tracking-[0.3px] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(124,74,45,0.3)]">
            Checkout Now
          </Link>
        </div>
      </div>
    </div>
  )
}
