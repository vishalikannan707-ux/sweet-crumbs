'use client'

import { useState } from 'react'
import Link from 'next/link'
import { authAPI } from '@/lib/api'
import { useAuthStore } from '@/lib/store'

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const setUser = useAuthStore((state) => state.setUser)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      setLoading(true)
      const response = await authAPI.register(formData)
      setUser(response.data.user, response.data.token)
      window.location.href = '/dashboard'
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-8 bg-gradient-to-br from-cream to-warm">
      <div className="bg-white border border-border rounded-[24px] p-11 w-full max-w-[430px] shadow-[0_8px_40px_rgba(44,26,14,0.1)]">
        <h2 className="font-display text-[34px] font-bold text-brown mb-1.5 text-center">Join Us 🍰</h2>
        <p className="text-sm text-muted text-center mb-8">Create your Sweet Crumbs account</p>
        
        {error && (
          <div className="bg-[#FEE8E8] border border-[#f5c6c6] text-red p-3 rounded-[10px] text-[13px] mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4.5">
            <label className="block text-[13px] font-semibold text-brown mb-1.5">Full Name</label>
            <input 
              type="text" 
              required
              placeholder="Your full name"
              className="w-full p-3 border-[1.5px] border-border rounded-xl text-sm bg-cream text-text outline-none transition-colors focus:border-accent"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="mb-4.5">
            <label className="block text-[13px] font-semibold text-brown mb-1.5">Email Address</label>
            <input 
              type="email" 
              required
              placeholder="you@example.com"
              className="w-full p-3 border-[1.5px] border-border rounded-xl text-sm bg-cream text-text outline-none transition-colors focus:border-accent"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div className="mb-4.5">
            <label className="block text-[13px] font-semibold text-brown mb-1.5">Password</label>
            <input 
              type="password" 
              required
              placeholder="Min 6 characters"
              className="w-full p-3 border-[1.5px] border-border rounded-xl text-sm bg-cream text-text outline-none transition-colors focus:border-accent"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-br from-brown to-accent text-white border-none py-3.5 rounded-[28px] text-[15px] font-bold cursor-pointer mt-2 transition-all duration-250 tracking-[0.3px] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(124,74,45,0.3)] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        
        <div className="text-center mt-5 text-[13px] text-muted">
          Already have an account? <Link href="/login" className="text-brown font-semibold underline">Sign in</Link>
        </div>
      </div>
    </div>
  )
}
