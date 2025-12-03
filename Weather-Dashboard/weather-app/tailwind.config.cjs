/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        'purple-light-start': '#6b7cff',
        'purple-light-end': '#c77bff',
        'blue-dark-start': '#0b2a54',
        'blue-dark-end': '#2b1b4a'
      },
      backgroundImage: {
        'light-gradient': 'linear-gradient(135deg, rgba(107,124,255,0.95) 0%, rgba(199,123,255,0.95) 50%, rgba(142,176,255,0.95) 100%)',
        'dark-gradient': 'linear-gradient(135deg, rgba(9,28,60,1) 0%, rgba(43,27,74,1) 100%)'
      }
    },
  },
  plugins: [],
}
