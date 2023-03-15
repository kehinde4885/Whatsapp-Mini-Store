import { initial } from "lodash";
import { useState } from "react";
import { useContext } from "react";
import { CartContext } from "./CartContext";

import { CartItem } from "./CartItem";
import { Quantitycheck } from "../QuantityCheck";
import CartModal from "./CartModal";

function Cart() {
  const [cart, updateCart] = useContext(CartContext);

  return (
    <div className="relative">
      <h1>YOUR CART ITEMS : {cart.length}</h1>
      <div className="grid grid-cols-2">
        {cart.map((product, index) => (
          <CartItem key={product.id} product={product}>
            <Quantitycheck product={product} index={index} page="CartPage" />
          </CartItem>
        ))}
      </div>
      <p>Total: ${getTotalAmount()}</p>
      <button
        onClick={handleProceed}
        className="border border-blue-700 text-white bg-blue-500"
      >
        Proceed
      </button>

      <CartModal
        cart={cart}
        getTotalAmount={getTotalAmount}
        handleProceed={handleProceed}
      />
    </div>
  );

  function getTotalAmount() {
    let initialValue = 0;
    let totalValue = cart.reduce(function (acc, current) {
      return acc + current.price * current.toBuy;
    }, 0);

    return totalValue;
  }

  function handleProceed() {
    let modal = document.getElementById("modal");
    modal.classList.toggle("invisible");
  }
}

export { Cart };
