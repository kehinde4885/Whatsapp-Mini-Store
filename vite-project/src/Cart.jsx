import { initial } from "lodash";
import { useState } from "react";
import { CartItem } from "./CartItem";
import { Quantitycheck } from "./QuantityCheck";

import { useContext } from "react";
import { CartContext } from "./CartContext";


function Cart() {
  
  const [cart,updateCart] = useContext(CartContext)
  
  return (
    <div>
      <h1>YOUR CART ITEMS : {cart.length}</h1>
      {cart.map((product,index) => (
        <CartItem key={product.id} product={product} >
            <Quantitycheck product={product} index={index}/>
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
