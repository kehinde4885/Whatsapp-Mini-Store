import { useContext } from "react";
import { CartContext } from "./CartContext.jsx";
import _ from "lodash";
import React from "react";

function CartItem(props) {
  const { product, children } = props;

  const [cart, updateCart] = useContext(CartContext);

  return (
    <div>
      <div className="flex my-8 space-x-4">
        <div className="w-20">
          <img className="object-contain" src={product.url}></img>
        </div>
        <div>
          <h1>{product.item}</h1>
          <p>${product.price}</p>
          {children}
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );

  function handleDelete() {
    let array = [...cart];

    _.pull(array, product);

    updateCart(array);
  }
}

export { CartItem };
