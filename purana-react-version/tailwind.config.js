/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        midnight: {
          DEFAULT: '#1a0b10',
          900: '#220d14',
          800: '#2e1119',
          700: '#3d1622',
        },
        charcoal: '#2a1116',
        rose: '#e39a86',
        blush: '#f6cfae',
        gold: '#e6b878',
        cream: '#f8efe2',
        lilac: '#d9a9a0',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        script: ['"Great Vibes"', 'cursive'],
      },
      letterSpacing: {
        widest2: '0.34em',
      },
      transitionTimingFunction: {
        soft: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'float-slow': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -18px, 0)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) rotate(-2deg)' },
          '50%': { transform: 'translate3d(10px, -22px, 0) rotate(3deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.55', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.06)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        equalize: {
          '0%, 100%': { transform: 'scaleY(0.28)' },
          '50%': { transform: 'scaleY(1)' },
        },
        'petal-drift': {
          '0%': { transform: 'translate3d(0,-10%,0) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '0.55' },
          '90%': { opacity: '0.35' },
          '100%': { transform: 'translate3d(-40px,110vh,0) rotate(220deg)', opacity: '0' },
        },
      },
      animation: {
        'float-slow': 'float-slow 9s ease-in-out infinite',
        drift: 'drift 14s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 5s ease-in-out infinite',
        shimmer: 'shimmer 8s linear infinite',
        'petal-drift': 'petal-drift 22s linear infinite',
      },
    },
  },
  plugins: [],
}
