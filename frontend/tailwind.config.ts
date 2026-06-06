import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FDF6EC',
        warm: '#F5E6D0',
        brown: '#7C4A2D',
        dark: '#2C1A0E',
        accent: '#C8854A',
        gold: '#D4A055',
        light: '#FFF9F2',
        text: '#2C1A0E',
        muted: '#8B6E5A',
        border: '#E8D5BE',
        green: '#2D6A4F',
        red: '#9B2226',
        'green-bg': '#E8F5E9',
        'red-bg': '#FFEBEE',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'serif'],
        sans: ['var(--font-dm-sans)', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'premium': '0 10px 40px rgba(0, 0, 0, 0.1)',
        'luxury': '0 20px 60px rgba(0, 0, 0, 0.15)',
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '24px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}

export default config
