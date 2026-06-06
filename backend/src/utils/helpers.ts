// Backend utilities
export const generateRandomId = (): string => {
  return Math.random().toString(36).substring(2, 11)
}

// Rate limiter helper
export const rateLimitByIp = (maxRequests: number, windowMs: number) => {
  const requests = new Map<string, number[]>()

  return (ip: string): boolean => {
    const now = Date.now()
    const userRequests = requests.get(ip) || []
    const recentRequests = userRequests.filter((time) => now - time < windowMs)

    if (recentRequests.length >= maxRequests) {
      return false
    }

    recentRequests.push(now)
    requests.set(ip, recentRequests)
    return true
  }
}

// Paginate results
export const paginate = <T>(items: T[], page: number, limit: number) => {
  const start = (page - 1) * limit
  const end = start + limit
  return {
    data: items.slice(start, end),
    total: items.length,
    page,
    pages: Math.ceil(items.length / limit),
  }
}

// Calculate discount
export const calculateDiscount = (original: number, discounted: number): number => {
  return Math.round(((original - discounted) / original) * 100)
}

// Generate order number
export const generateOrderNumber = (): string => {
  return `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`
}
