/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f3e6',
          100: '#c2e0c2',
          600: '#2ecc71',
          700: '#27ae60'
        }
      }
    },
  },
  plugins: [],
} 