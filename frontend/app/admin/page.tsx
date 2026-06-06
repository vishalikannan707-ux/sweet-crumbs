'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { productsAPI } from '@/lib/api'
import { useAuthStore } from '@/lib/store'

export default function AdminProductsPage() {
  const { user, logout, isAuthenticated } = useAuthStore()
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
  })

  useEffect(() => {
    if (!isAuthenticated || !user?.isAdmin) {
      window.location.href = '/login'
      return
    }

    const fetchProducts = async () => {
      try {
        const response = await productsAPI.getAll()
        setProducts(response.data.data)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [isAuthenticated, user])

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await productsAPI.create({
        ...formData,
        price: parseFloat(formData.price),
      })
      setProducts([...products, response.data.data])
      setFormData({ name: '', description: '', price: '', category: '' })
      setShowForm(false)
    } catch (error) {
      console.error('Error adding product:', error)
    }
  }

  const handleDeleteProduct = async (id: string) => {
    try {
      await productsAPI.delete(id)
      setProducts(products.filter((p) => p._id !== id))
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  const handleLogout = () => {
    logout()
    window.location.href = '/'
  }

  if (!isAuthenticated || !user?.isAdmin) return null

  return (
    <div className="section min-h-[calc(100vh-64px)]">
      <div className="flex flex-wrap items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-[32px] font-bold text-brown mb-1">Admin Dashboard</h1>
          <p className="text-sm text-muted">Manage Bakery Products</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowForm(!showForm)}
            className="bg-brown text-white py-2 px-5 rounded-full text-[13px] font-semibold transition-colors hover:bg-dark"
          >
            {showForm ? 'Cancel' : '+ Add Product'}
          </button>
          <button 
            onClick={handleLogout}
            className="bg-transparent border border-border text-brown py-2 px-5 rounded-full text-[13px] font-semibold transition-colors hover:bg-warm"
          >
            Logout
          </button>
        </div>
      </div>

      {showForm && (
        <div className="bg-white border border-border rounded-[18px] p-6 mb-8 max-w-[800px]">
          <h2 className="font-display text-xl font-bold text-brown mb-4">Add New Product</h2>
          <form onSubmit={handleAddProduct} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-semibold text-brown mb-1.5">Product Name</label>
                <input 
                  type="text" 
                  value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} 
                  className="w-full p-2.5 border-[1.5px] border-border rounded-xl text-sm outline-none focus:border-accent" required 
                />
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-brown mb-1.5">Category</label>
                <select 
                  value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} 
                  className="w-full p-2.5 border-[1.5px] border-border rounded-xl text-sm outline-none focus:border-accent" required
                >
                  <option value="">Select Category</option>
                  <option value="Cakes">Cakes</option>
                  <option value="Pastries">Pastries</option>
                  <option value="Cookies">Cookies</option>
                  <option value="Bread">Bread</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-brown mb-1.5">Description</label>
              <textarea 
                value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} 
                className="w-full p-2.5 border-[1.5px] border-border rounded-xl text-sm outline-none focus:border-accent min-h-[80px]" required 
              />
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-brown mb-1.5">Price (₹)</label>
              <input 
                type="number" 
                value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} 
                className="w-full p-2.5 border-[1.5px] border-border rounded-xl text-sm outline-none focus:border-accent" required 
              />
            </div>
            <button type="submit" className="bg-accent text-white py-2.5 px-6 rounded-full text-sm font-bold mt-2 hover:bg-brown transition-colors">
              Save Product
            </button>
          </form>
        </div>
      )}

      <div className="bg-white border border-border rounded-[18px] overflow-hidden overflow-x-auto">
        {loading ? (
          <div className="p-10 text-center text-muted">Loading products...</div>
        ) : (
          <table className="w-full border-collapse min-w-[600px]">
            <thead>
              <tr>
                <th className="bg-warm py-3 px-5 text-left text-[13px] font-semibold text-brown border-b border-border">Name</th>
                <th className="bg-warm py-3 px-5 text-left text-[13px] font-semibold text-brown border-b border-border">Category</th>
                <th className="bg-warm py-3 px-5 text-left text-[13px] font-semibold text-brown border-b border-border">Price</th>
                <th className="bg-warm py-3 px-5 text-right text-[13px] font-semibold text-brown border-b border-border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr><td colSpan={4} className="p-8 text-center text-muted">No products found.</td></tr>
              ) : (
                products.map((product) => (
                  <tr key={product._id} className="hover:bg-[#FDF6EC]">
                    <td className="p-4 border-b border-border text-[15px] font-semibold text-dark">{product.name}</td>
                    <td className="p-4 border-b border-border text-sm text-muted">{product.category}</td>
                    <td className="p-4 border-b border-border text-[15px] font-bold text-brown">₹{product.price}</td>
                    <td className="p-4 border-b border-border text-right">
                      <button 
                        onClick={() => handleDeleteProduct(product._id)}
                        className="bg-[#FFEBEE] text-red border border-[#ffcdd2] py-1.5 px-3 rounded-md text-xs font-semibold cursor-pointer hover:bg-red hover:text-white transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
