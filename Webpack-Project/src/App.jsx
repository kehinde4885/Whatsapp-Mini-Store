import { useState } from "react";

import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";

import _ from "lodash";

import { createApi } from "unsplash-js";

import { CartContext } from "./CartContext";
import Products from "./Products";
import { Cart } from "./Cart";
import Header from "./Header";

const unsplash = createApi({
  accessKey: "",
});

function App() {
  const [cart, updateCart] = useState([]);

  return (
    <CartContext.Provider
      value={[cart, updateCart, itemInCart, addToCart, removeFromCart]}
    >
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="cart" element={<Cart />} />

          <Route path="/*" element={<Products/>} />
        </Routes>
      </BrowserRouter>
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

    let array = [...cart];

    let toDelete = array.find((elem) => elem.id === item.id);

    _.pull(array, toDelete);

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
