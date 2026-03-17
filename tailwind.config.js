// 139 BPM = 0.432s per beat | Spacefuji palette
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        space: {
          50: '#F0EEF8',
          100: '#DDD8F0',
          200: '#B8AFE0',
          300: '#9183CC',
          400: '#7A6ABF',
          500: '#5C4D99',
          600: '#463A75',
          700: '#332A57',
          800: '#1E1833',
          900: '#110E20',
          950: '#08060F',
        },
        glow: '#C9A0FF',
        'glow-warm': '#E8B86D',
        nebula: '#7B5EA7',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'eq-1': 'eq 0.432s ease-in-out infinite',
        'eq-2': 'eq 0.432s ease-in-out 0.108s infinite',
        'eq-3': 'eq 0.432s ease-in-out 0.216s infinite',
        'eq-4': 'eq 0.432s ease-in-out 0.054s infinite',
        'eq-5': 'eq 0.432s ease-in-out 0.270s infinite',
        'float': 'float 6s ease-in-out infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
      },
      keyframes: {
        eq: {
          '0%, 100%': { height: '3px' },
          '50%': { height: '16px' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
