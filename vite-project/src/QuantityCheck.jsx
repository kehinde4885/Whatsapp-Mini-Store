import { useContext } from "react";
import { CartContext } from "./CartContext";

function Quantitycheck(props) {
  const { product, index } = props;

  const [cart, updateCart] = useContext(CartContext);

  return (
    <>
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
    </>
  );

  function handleClick(e) {
    let quantity = product.toBuy;
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
    //console.log(quantity);
  }
}

export { Quantitycheck };
