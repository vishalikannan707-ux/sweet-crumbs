'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useCartStore, useOrderStore } from '@/lib/store'
import { toast } from 'react-hot-toast'

type PaymentMethod = 'gpay' | 'upi' | 'cod'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, clearCart } = useCartStore()
  const { placeOrder } = useOrderStore()

  const [paymentMethod, setPaymentMethod] = useState<'gpay' | 'upi' | 'cod'>('gpay')
  const [placing, setPlacing] = useState(false)
  const [form, setForm] = useState({
    street: '',
    city: '',
    pincode: '',
    phone: '',
    notes: '',
  })

  // Show success overlay state
  const [showSuccess, setShowSuccess] = useState(false)

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0)
  const deliveryFee = subtotal > 999 ? 0 : 49
  const total = subtotal + deliveryFee

  if (items.length === 0 && !showSuccess) {
    return (
      <div className="section text-center py-20 text-muted">
        <span className="text-[64px] mb-4 block">🛒</span>
        <h3 className="text-[26px] font-display font-bold text-brown mb-3">Your cart is empty</h3>
        <Link href="/shop" className="btn-hero-primary inline-block mt-4">Browse Products</Link>
      </div>
    )
  }

  const handlePlaceOrder = async () => {
    if (!form.street || !form.city || !form.pincode || !form.phone) {
      toast.error('Please fill in all required delivery details')
      return
    }

    setPlacing(true)

    // Simulate API delay
    await new Promise((r) => setTimeout(r, 1000))

    placeOrder({
      items,
      subtotal,
      deliveryFee,
      total,
      paymentMethod,
      address: {
        name: 'User', // Would come from auth ideally
        ...form
      },
    })

    clearCart()
    setPlacing(false)
    setShowSuccess(true)
  }

  const finishOrder = () => {
    router.push('/dashboard')
  }

  const inputClass = "w-full p-3 border-[1.5px] border-border rounded-xl text-sm bg-cream text-text focus:border-accent outline-none transition-colors"

  return (
    <>
      {showSuccess && (
        <div className="fixed inset-0 bg-black/70 z-[500] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-12 text-center max-w-[400px] w-[90%] animate-[popIn_0.4s_ease]">
            <div className="text-[72px] mb-4">🎉</div>
            <h2 className="text-[30px] font-display font-bold text-green mb-2">Order Placed!</h2>
            <p className="text-muted text-sm mb-6">Your order has been placed successfully. We'll prepare it fresh for you!</p>
            <button
              onClick={finishOrder}
              className="bg-gradient-to-br from-brown to-accent text-white border-none py-3.5 px-7 rounded-full text-sm font-bold cursor-pointer w-full"
            >
              View My Orders
            </button>
          </div>
        </div>
      )}

      <div className="section">
        <div className="sec-head">
          <div className="sec-tag">Almost There</div>
          <h2>Complete Your Order</h2>
          <div className="divider"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">
          <div>
            {/* Delivery Details */}
            <div className="bg-white border border-border rounded-[18px] p-[22px] mb-5">
              <h3 className="font-display text-xl font-bold text-brown mb-5 pb-2.5 border-b border-border">
                📍 Delivery Details
              </h3>

              <div className="bg-gradient-to-br from-[#e8f5e9] to-[#c8e6c9] rounded-xl h-[120px] flex items-center justify-center mb-3.5 text-[36px] border border-[#a5d6a7]">
                📍
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-[13px] font-semibold text-brown mb-1.5">Full Delivery Address *</label>
                  <input type="text" className={inputClass} placeholder="House/Flat No, Street, Area" value={form.street} onChange={e => setForm({ ...form, street: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[13px] font-semibold text-brown mb-1.5">City *</label>
                    <input type="text" className={inputClass} placeholder="Chennai" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-brown mb-1.5">PIN Code *</label>
                    <input type="text" className={inputClass} placeholder="600001" maxLength={6} value={form.pincode} onChange={e => setForm({ ...form, pincode: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-brown mb-1.5">Mobile Number *</label>
                  <input type="tel" className={inputClass} placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-brown mb-1.5">Delivery Notes (optional)</label>
                  <input type="text" className={inputClass} placeholder="e.g. Ring doorbell twice..." value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white border border-border rounded-[18px] p-[22px] mb-5">
              <h3 className="font-display text-xl font-bold text-brown mb-5 pb-2.5 border-b border-border">
                💳 Payment Method
              </h3>

              <div className="flex flex-col gap-2.5">
                <label className={`border-2 rounded-xl p-3.5 cursor-pointer flex items-center gap-3.5 transition-all duration-200 ${paymentMethod === 'gpay' ? 'border-brown bg-[#7C4A2D0A]' : 'border-border'}`}>
                  <input type="radio" name="payment" value="gpay" checked={paymentMethod === 'gpay'} onChange={() => setPaymentMethod('gpay')} className="accent-brown w-[18px] h-[18px] cursor-pointer" />
                  <div className="text-[28px] shrink-0"><span className="bg-gradient-to-br from-[#4285F4] to-[#34A853] text-white text-xs font-bold py-1 px-2.5 rounded-md tracking-[0.5px]">GPay</span></div>
                  <div>
                    <div className="font-semibold text-sm text-dark">Google Pay (UPI)</div>
                    <div className="text-xs text-muted">Pay instantly via UPI — safe & secure</div>
                  </div>
                </label>

                <label className={`border-2 rounded-xl p-3.5 cursor-pointer flex items-center gap-3.5 transition-all duration-200 ${paymentMethod === 'upi' ? 'border-brown bg-[#7C4A2D0A]' : 'border-border'}`}>
                  <input type="radio" name="payment" value="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} className="accent-brown w-[18px] h-[18px] cursor-pointer" />
                  <div className="text-[28px] shrink-0">📱</div>
                  <div>
                    <div className="font-semibold text-sm text-dark">Other UPI / PhonePe / Paytm</div>
                    <div className="text-xs text-muted">Pay via any UPI app</div>
                  </div>
                </label>

                <label className={`border-2 rounded-xl p-3.5 cursor-pointer flex items-center gap-3.5 transition-all duration-200 ${paymentMethod === 'cod' ? 'border-brown bg-[#7C4A2D0A]' : 'border-border'}`}>
                  <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="accent-brown w-[18px] h-[18px] cursor-pointer" />
                  <div className="text-[28px] shrink-0"><span className="bg-warm text-brown text-xs font-bold py-1 px-2.5 rounded-md">COD</span></div>
                  <div>
                    <div className="font-semibold text-sm text-dark">Cash on Delivery</div>
                    <div className="text-xs text-muted">Pay in cash when your order arrives</div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white border border-border rounded-[18px] p-[22px] sticky top-20">
              <h3 className="font-display text-[24px] font-bold text-dark mb-5">Order Summary</h3>

              <div className="max-h-[220px] overflow-y-auto pr-2 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 py-2.5 border-b border-border last:border-0">
                    <div className="w-11 h-11 rounded-[10px] overflow-hidden shrink-0 bg-warm relative">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div>
                      <div className="font-display text-[15px] font-semibold text-dark leading-tight">{item.name}</div>
                      <div className="text-xs text-muted">Qty: {item.quantity}</div>
                    </div>
                    <div className="ml-auto font-semibold text-sm text-brown">
                      ₹{item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3.5">
                <div className="flex justify-between text-sm text-muted mb-2">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm text-muted mb-2">
                  <span>Delivery</span>
                  <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
                </div>
                <div className="flex justify-between font-display text-[22px] font-bold text-dark border-t border-border pt-3.5 mt-1.5">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={placing}
                className="w-full bg-gradient-to-br from-brown to-accent text-white border-none p-4 rounded-full text-base font-bold cursor-pointer mt-3.5 transition-all duration-250 tracking-[0.4px] hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(124,74,45,0.35)] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {placing ? 'Processing...' : '🎉 Place Order'}
              </button>

              <Link href="/cart" className="block text-center w-full bg-transparent border border-border p-2.5 rounded-full mt-2.5 cursor-pointer text-[13px] text-muted hover:bg-warm">
                ← Back to Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
