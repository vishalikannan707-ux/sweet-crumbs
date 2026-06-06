'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useOrderStore, Order } from '@/lib/store'
import { useAuthStore } from '@/lib/store'

export default function DashboardPage() {
  const { orders } = useOrderStore()
  const { user, logout } = useAuthStore()
  const [activeTab, setActiveTab] = useState('orders')
  const [justPlaced, setJustPlaced] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      if (params.get('placed') === 'true') {
        setJustPlaced(true)
        window.history.replaceState({}, '', '/dashboard?tab=orders')
      }
    }
  }, [])

  return (
    <div className="section min-h-[calc(100vh-64px)]">
      {justPlaced && (
        <div className="bg-[#e8f5e9] border border-[#a5d6a7] p-5 rounded-[12px] mb-8 flex items-center gap-4 animate-[popIn_0.4s_ease]">
          <div className="text-[32px]">🎉</div>
          <div>
            <div className="font-display text-[18px] font-bold text-green mb-1">Order Placed Successfully!</div>
            <div className="text-sm text-dark">Thank you! Your order has been confirmed. We will prepare it right away.</div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8 items-start">
        {/* Sidebar */}
        <div className="bg-white border border-border rounded-[18px] py-5 sticky top-20">
          <div className="px-5 pb-5 border-b border-border mb-4 text-center">
            <div className="w-[64px] h-[64px] rounded-full bg-warm text-[24px] font-bold text-brown flex items-center justify-center mx-auto mb-3">
              {user?.name?.[0]?.toUpperCase() || 'P'}
            </div>
            <div className="font-display text-lg font-bold text-dark">{user?.name || 'Priya Sharma'}</div>
            <div className="text-xs text-muted">{user?.email || 'priya@example.com'}</div>
          </div>
          
          <div className="flex flex-col">
            <button 
              onClick={() => setActiveTab('orders')}
              className={`text-left px-5 py-3 text-sm font-semibold cursor-pointer border-l-4 transition-colors ${activeTab === 'orders' ? 'border-brown text-brown bg-[#7C4A2D0A]' : 'border-transparent text-muted hover:text-dark hover:bg-cream'}`}
            >
              📦 My Orders
            </button>
            <button 
              onClick={() => setActiveTab('profile')}
              className={`text-left px-5 py-3 text-sm font-semibold cursor-pointer border-l-4 transition-colors ${activeTab === 'profile' ? 'border-brown text-brown bg-[#7C4A2D0A]' : 'border-transparent text-muted hover:text-dark hover:bg-cream'}`}
            >
              👤 Profile Settings
            </button>
            <button 
              onClick={() => { logout(); window.location.href = '/login' }}
              className="text-left px-5 py-3 text-sm font-semibold cursor-pointer border-l-4 border-transparent text-red hover:bg-[#FFEBEE]"
            >
              🚪 Logout
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div>
          {activeTab === 'orders' && (
            <div>
              <h2 className="font-display text-[26px] font-bold text-brown mb-5">Recent Orders</h2>
              
              {orders.length === 0 ? (
                <div className="bg-white border border-border rounded-[18px] p-10 text-center text-muted">
                  <div className="text-[48px] mb-2">🛍️</div>
                  <div className="text-base mb-4">You haven't placed any orders yet.</div>
                  <Link href="/shop" className="btn-hero-primary inline-block">Order Now</Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map(order => (
                    <div key={order.id} className="bg-white border border-border rounded-[18px] p-5">
                      <div className="flex flex-wrap justify-between items-center pb-4 border-b border-border mb-4">
                        <div>
                          <div className="font-semibold text-[13px] text-muted uppercase tracking-[0.5px] mb-1">Order #{order.id}</div>
                          <div className="text-xs font-semibold text-dark">
                            {new Date(order.placedAt).toLocaleDateString('en-IN', {
                              day: 'numeric', month: 'short', year: 'numeric'
                            })}
                          </div>
                        </div>
                        <div className="bg-[#e8f5e9] text-green text-xs font-bold py-1.5 px-3 rounded-full border border-[#a5d6a7]">
                          {order.status}
                        </div>
                        <div className="font-display text-[20px] font-bold text-brown">
                          ₹{order.total}
                        </div>
                      </div>
                      
                      <div className="flex gap-4 overflow-x-auto pb-2">
                        {order.items.map(item => (
                          <div key={item.id} className="flex items-center gap-3 shrink-0 border border-border rounded-xl p-2.5 pr-4 min-w-[200px]">
                            <div className="w-[42px] h-[42px] rounded-lg overflow-hidden relative bg-warm shrink-0">
                              <Image src={item.image} alt={item.name} fill className="object-cover" />
                            </div>
                            <div>
                              <div className="font-display text-[15px] font-semibold text-dark leading-tight">{item.name}</div>
                              <div className="text-[11px] text-muted mt-0.5">Qty: {item.quantity}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'profile' && (
            <div className="bg-white border border-border rounded-[18px] p-8">
              <h2 className="font-display text-[24px] font-bold text-brown mb-6">Profile Settings</h2>
              <div className="max-w-[400px]">
                <div className="mb-4">
                  <label className="block text-[13px] font-semibold text-brown mb-1.5">Full Name</label>
                  <input type="text" className="w-full p-3 border-[1.5px] border-border rounded-xl text-sm bg-cream text-text" value={user?.name || ''} readOnly />
                </div>
                <div className="mb-6">
                  <label className="block text-[13px] font-semibold text-brown mb-1.5">Email Address</label>
                  <input type="email" className="w-full p-3 border-[1.5px] border-border rounded-xl text-sm bg-cream text-text opacity-70" value={user?.email || ''} readOnly />
                </div>
                <button className="bg-gradient-to-br from-brown to-accent text-white border-none py-3 px-6 rounded-full text-sm font-bold cursor-pointer">
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
