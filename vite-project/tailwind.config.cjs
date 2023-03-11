/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/App.jsx','./src/Cart.jsx'],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
