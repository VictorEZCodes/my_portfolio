// 139 BPM = 0.432s per beat
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        warm: {
          50: '#FDF8F0',
          100: '#F5E6D0',
          200: '#E8CBA0',
          300: '#D4A853',
          400: '#C48B2C',
          500: '#A06B1B',
          600: '#7A5014',
          700: '#5C3D1A',
          800: '#3D2812',
          900: '#1F1409',
          950: '#0F0A04',
        },
        accent: '#E07B39',
        glow: '#D4A853',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        // EQ bars — each offset by ~half a beat for staggered bounce
        'eq-1': 'eq 0.432s ease-in-out infinite',
        'eq-2': 'eq 0.432s ease-in-out 0.108s infinite',
        'eq-3': 'eq 0.432s ease-in-out 0.216s infinite',
        'eq-4': 'eq 0.432s ease-in-out 0.054s infinite',
        'eq-5': 'eq 0.432s ease-in-out 0.270s infinite',
      },
      keyframes: {
        eq: {
          '0%, 100%': { height: '3px' },
          '50%': { height: '16px' },
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
