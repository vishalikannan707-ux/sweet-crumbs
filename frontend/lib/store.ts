import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const existing = get().items.find((i) => i.id === item.id)
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
            ),
          })
        } else {
          set({ items: [...get().items, item] })
        }
      },
      removeItem: (id) =>
        set({ items: get().items.filter((i) => i.id !== id) }),
      updateQuantity: (id, quantity) =>
        set({
          items: get().items.map((i) =>
            i.id === id ? { ...i, quantity } : i
          ),
        }),
      clearCart: () => set({ items: [] }),
    }),
    { name: 'cart-storage' }
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
      setUser: (user, token) => set({ user, token, isAuthenticated: true }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    { name: 'auth-storage' }
  )
)

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
  paymentMethod: 'gpay' | 'cod'
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
    (set, get) => ({
      orders: [],
      placeOrder: (order) => {
        const id = `ORD${Date.now().toString().slice(-8)}`
        const newOrder: Order = {
          ...order,
          id,
          status: 'Confirmed',
          placedAt: new Date().toISOString(),
        }
        set({ orders: [newOrder, ...get().orders] })
        return id
      },
      clearOrders: () => set({ orders: [] }),
    }),
    { name: 'orders-storage' }
  )
)