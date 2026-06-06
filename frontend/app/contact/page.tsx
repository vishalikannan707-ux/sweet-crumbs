'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('Message sent successfully! We will get back to you soon.')
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <div className="section">
      <div className="sec-head">
        <div className="sec-tag">Reach Out</div>
        <h2>Get in Touch</h2>
        <div className="divider"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mt-10">
        <div>
          <h3 className="font-display text-[30px] font-bold text-brown mb-3">We'd Love to Hear From You</h3>
          <p className="text-sm text-muted leading-[1.75] mb-6">
            Whether you're planning a custom cake, have a question about an order, or just want to say hello — our team is here for you.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 bg-warm rounded-full flex items-center justify-center text-lg shrink-0">📍</div>
              <div>
                <div className="text-sm font-semibold text-dark">14, Anna Salai</div>
                <div className="text-[13px] text-muted">Chennai, Tamil Nadu 600002</div>
              </div>
            </div>
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 bg-warm rounded-full flex items-center justify-center text-lg shrink-0">📞</div>
              <div>
                <div className="text-sm font-semibold text-dark">+91 98765 43210</div>
                <div className="text-[13px] text-muted">Mon–Sat, 8 AM – 8 PM</div>
              </div>
            </div>
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 bg-warm rounded-full flex items-center justify-center text-lg shrink-0">✉️</div>
              <div>
                <div className="text-sm font-semibold text-dark">hello@sweetcrumbs.in</div>
                <div className="text-[13px] text-muted">We reply within 24 hours</div>
              </div>
            </div>
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 bg-warm rounded-full flex items-center justify-center text-lg shrink-0">🕐</div>
              <div>
                <div className="text-sm font-semibold text-dark">Opening Hours</div>
                <div className="text-[13px] text-muted">Daily: 7:00 AM – 9:00 PM</div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white border border-border rounded-2xl p-8">
          <h3 className="font-display text-[22px] font-bold text-brown mb-5">Send a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[13px] font-semibold text-brown mb-1.5">Your Name</label>
              <input 
                type="text" 
                required 
                className="w-full p-3 border-2 border-border rounded-xl text-sm bg-cream text-text focus:border-accent focus:outline-none transition-colors" 
                placeholder="John Doe"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-brown mb-1.5">Email Address</label>
              <input 
                type="email" 
                required 
                className="w-full p-3 border-2 border-border rounded-xl text-sm bg-cream text-text focus:border-accent focus:outline-none transition-colors" 
                placeholder="john@example.com"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-brown mb-1.5">Message</label>
              <textarea 
                required 
                className="w-full p-3 border-2 border-border rounded-xl text-sm bg-cream text-text focus:border-accent focus:outline-none transition-colors min-h-[110px] resize-y" 
                placeholder="How can we help you?"
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
              ></textarea>
            </div>
            <button type="submit" className="w-full bg-gradient-to-br from-brown to-accent text-white border-none py-3.5 rounded-full text-[15px] font-bold cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(124,74,45,0.3)]">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
