import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Auth API calls
export const authAPI = {
  register: (data: { name: string; email: string; password: string }) =>
    apiClient.post('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    apiClient.post('/auth/login', data),
  logout: () => apiClient.post('/auth/logout'),
  forgotPassword: (email: string) =>
    apiClient.post('/auth/forgot-password', { email }),
}

// Products API calls
export const productsAPI = {
  getAll: () => apiClient.get('/products'),
  getById: (id: string) => apiClient.get(`/products/${id}`),
  create: (data: any) => apiClient.post('/products', data),
  update: (id: string, data: any) => apiClient.put(`/products/${id}`, data),
  delete: (id: string) => apiClient.delete(`/products/${id}`),
}

// Orders API calls
export const ordersAPI = {
  getAll: () => apiClient.get('/orders'),
  getById: (id: string) => apiClient.get(`/orders/${id}`),
  create: (data: any) => apiClient.post('/orders', data),
  update: (id: string, data: any) => apiClient.put(`/orders/${id}`, data),
  getUserOrders: () => apiClient.get('/orders/my-orders'),
}

// Contact API calls
export const contactAPI = {
  submit: (data: { name: string; email: string; subject: string; message: string }) =>
    apiClient.post('/contact', data),
}
