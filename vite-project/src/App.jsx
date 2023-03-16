import { useState } from "react";

import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";

import _ from "lodash";

import { createApi } from "unsplash-js";

import { CartContext } from "./cart/CartContext";
import Products from "./product//Products";
import { Cart } from "./cart/Cart";
import Header from "./Header";

const unsplash = createApi({
  accessKey: ""
})





function App() {
  const [cart, updateCart] = useState([]);

  return (
    <CartContext.Provider
      value={[cart, updateCart, itemInCart, addToCart, removeFromCart]}
    >
      <Header />
      <Switch>
        <Route  path="/cart">
          <Cart />
        </Route>
        <Route path='/'>
          <Products />
        </Route>
      </Switch>
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

    let toDelete = array.find((elem)=>(elem.id === item.id))

    _.pull(array,toDelete);

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
