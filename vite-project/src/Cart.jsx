import { initial } from "lodash";
import { useState } from "react";
import { CartItem } from "./CartItem";
import { Quantitycheck } from "./QuantityCheck";

import { useContext } from "react";
import { CartContext } from "./CartContext";

function Cart() {
  const [cart, updateCart] = useContext(CartContext);

  return (
    <div className="relative">
      <h1>YOUR CART ITEMS : {cart.length}</h1>
      <div className="grid grid-cols-2">
        {cart.map((product, index) => (
          <CartItem key={product.id} product={product}>
            <Quantitycheck product={product} index={index} />
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

      <div
        id="modal"
        className="invisible w-full h-full grid place-items-center bg-transparent absolute top-0"
      >
        
        <div className="w-1/2 relative border-2 border-blue-800 bg-white">
          <h1>YOUR BAG</h1>
          {cart.map((product)=>(
            <div key={product.id} className="flex justify-around items-center my-4">
            <p className="basis-1/2">{product.item}</p>
            <img
              className="w-10"
              src="https://images.pexels.com/photos/15663377/pexels-photo-15663377.jpeg?auto=compress&cs=tinysrgb&h=350"
              alt=""
            />
            <p>{product.toBuy}</p>
          </div>
          ))}
          <div className="flex justify-between">
            <p>Total : ${getTotalAmount()}</p>
            <button onClick={handlePurchase} className="bg-green-500 p-2">Contact Seller</button>
          </div>
          <button onClick={handleProceed} className="absolute top-0 right-0">Close</button>
        </div>
      </div>
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
    modal.classList.toggle('invisible')
  }

  function handlePurchase(){
    console.log('ogog')

  }
}

export { Cart };
