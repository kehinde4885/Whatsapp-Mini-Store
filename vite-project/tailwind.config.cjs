/** @type {import('tailwindcss').Config} */
module.exports = {
  //The * is Short for all File with a given Extension Type
  content: ['./src/cart/*.jsx','./src/product/*.jsx','./src/*.jsx'],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
