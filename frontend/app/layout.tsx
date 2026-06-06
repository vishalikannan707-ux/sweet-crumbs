import type { Metadata } from 'next'
import { DM_Sans, Cormorant_Garamond } from 'next/font/google'
import '@/styles/globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' })
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
})

export const metadata: Metadata = {
  title: 'Sweet Crumbs Bakery - Premium Handcrafted Pastries',
  description:
    'Experience luxury baked goods at Sweet Crumbs Bakery. Freshly baked happiness delivered to your door.',
  keywords:
    'bakery, pastries, cakes, cookies, premium, handcrafted, delivery',
  authors: [{ name: 'Sweet Crumbs Team' }],
  openGraph: {
    title: 'Sweet Crumbs Bakery - Premium Handcrafted Pastries',
    description:
      'Experience luxury baked goods at Sweet Crumbs Bakery.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#FFF7ED" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${dmSans.variable} ${cormorant.variable} flex flex-col min-h-screen bg-cream text-text overflow-x-hidden`}
      >
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
