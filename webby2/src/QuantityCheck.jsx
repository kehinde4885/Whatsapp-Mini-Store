import { useContext } from "react";
import React from "react";
import { CartContext } from "./CartContext.jsx";


function Quantitycheck(props) {
  const { product, index, page, updateItem } = props;

  const [cart, updateCart] = useContext(CartContext);

  return (
    <div>
      <p>Quantity : {product.toBuy}</p>
      <div className="flex space-x-4">
        <button
          onClick={(e) => handleClick(e)}
          data-type="1"
          className="border-2 border-green-500 p-2"
        >
          +
        </button>
        <button
          disabled={product.toBuy === 1}
          onClick={(e) => handleClick(e)}
          data-type=""
          className="disabled:opacity-40 border-2 border-red-500 p-2"
        >
          -
        </button>
      </div>
    </div>
  );

  function handleClick(e) {
    let quantity = product.toBuy;
    switch (page) {
      case "ProductPage":
        console.log(page);
        if (e.target.dataset.type) {
          quantity++;
          updateItem((oldItem) => ({ ...oldItem, toBuy: quantity }));
        } else {
          quantity--;
          updateItem((oldItem) => ({ ...oldItem, toBuy: quantity }));
        }

        break;

      case "CartPage":
        console.log(page);

        if (e.target.dataset.type) {
          quantity++;
          let array = [...cart];

          array[index].toBuy = quantity;

          updateCart(array);
        } else {
          quantity--;
          let array = [...cart];

          array[index].toBuy = quantity;

          updateCart(array);
        }

        break;

      default:
        break;
    }
    //console.log(quantity);
  }
}

export { Quantitycheck };
