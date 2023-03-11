import { initial } from "lodash";
import { useState } from "react";
import { CartItem } from "./CartItem";
import { Quantitycheck } from "./QuantityCheck";

import { useContext } from "react";
import { CartContext } from "./CartContext";


function Cart(props) {
  const { handleCart } = props;

  const cart = useContext(CartContext)
  
  return (
    <div>
      <h1>YOUR CART ITEMS</h1>
      {cart.map((product) => (
        <CartItem key={product.id} product={product} >
            <Quantitycheck product={product} handleCart={handleCart}/>
        </CartItem>
      ))}
      <p>Total: ${getTotalAmount()}</p>
    </div>
  );

  function getTotalAmount() {
    let initialValue = 0;
    let totalValue = cart.reduce(function (acc, current) {
      return acc + current.price * current.toBuy;
    }, 0);

    return totalValue;
  }
}

export { Cart };
