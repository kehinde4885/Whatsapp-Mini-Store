import Products from "./product//Products";
import { Cart } from "./cart/Cart";
import Header from "./Header";
import { useState } from "react";
import _ from "lodash";

import { CartContext } from "./cart/CartContext";

function App() {
  const [cart, updateCart] = useState([]);

  console.log(cart);

  return (
    <CartContext.Provider
      value={[cart, updateCart, itemInCart, addToCart, removeFromCart]}
    >
      <Header />
      <Products />
      <Cart />
    </CartContext.Provider>
  );

  function itemInCart(item) {
    let cartIds = [];
    cart.forEach((element) => cartIds.push(element.id));
    let bool = cartIds.includes(item.id);

    return bool;
  }

  function removeFromCart(item) {
    console.log("remove");
    console.log(item);
    console.log(cart);
    let array = [...cart];

    _.pull(array, item);

    updateCart(array);
  }

  function addToCart(item) {
    console.log("adding");
    updateCart((oldCart) => {
      return [...oldCart, item];
    });
  }
}

export default App;
