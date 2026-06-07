import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  category?: string
}

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  total: number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
              ),
            }
          }
          return { items: [...state.items, item] }
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity } : i
          ),
        })),
      clearCart: () => set({ items: [] }),
      total: 0,
    }),
    {
      name: 'cart-storage',
    }
  )
)

interface AuthStore {
  user: { id: string; name: string; email: string; isAdmin?: boolean } | null
  token: string | null
  setUser: (user: any, token: string) => void
  logout: () => void
  isAuthenticated: boolean
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setUser: (user, token) =>
        set({ user, token, isAuthenticated: true }),
      logout: () =>
        set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
)

// ── Orders store (local, no auth required) ──────────────────────────────────
export interface OrderItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

export interface Order {
  id: string
  items: OrderItem[]
  subtotal: number
  deliveryFee: number
  total: number
  paymentMethod: 'gpay' | 'upi' | 'cod'
  address: {
    name: string
    phone: string
    street: string
    city: string
    pincode: string
  }
  status: 'Confirmed' | 'Preparing' | 'Out for Delivery' | 'Delivered'
  placedAt: string
}

interface OrderStore {
  orders: Order[]
  placeOrder: (order: Omit<Order, 'id' | 'placedAt' | 'status'>) => string
  clearOrders: () => void
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      orders: [],
      placeOrder: (order) => {
        const id = `ORD${Date.now().toString().slice(-8)}`
        const newOrder: Order = {
          ...order,
          id,
          status: 'Confirmed',
          placedAt: new Date().toISOString(),
        }
        set((state) => ({ orders: [newOrder, ...state.orders] }))
        return id
      },
      clearOrders: () => set({ orders: [] }),
    }),
    {
      name: 'orders-storage',
    }
  )
)
