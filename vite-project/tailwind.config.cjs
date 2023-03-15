/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/App.jsx',
  './src/Cart.jsx',
  './src/CartItem.jsx',
  ,'./src/ProductList.jsx',
  ,'./src/Header.jsx',
'./src/ProductPage.jsx'],

  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
