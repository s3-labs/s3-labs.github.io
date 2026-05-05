module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#32a852',
        blue: {
          50:  '#eefaf1',
          100: '#dff3e6',
          200: '#c8f0cf',
          300: '#9fddb0',
          400: '#6fcf86',
          500: '#32a852',
          600: '#2b8b43',
          700: '#206731',
          800: '#164920',
          900: '#0d2d12'
        }
      },
      backdropBlur: {
        xs: '2px'
      }
    },
  },
  plugins: [],
}
