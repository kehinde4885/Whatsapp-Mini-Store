import { useContext , useState } from "react";
import { useLocation } from "react-router-dom";

import { CartContext } from "../cart/CartContext";
import { Quantitycheck } from "../QuantityCheck";

export default function ProductPage() {
  const [cart, updateCart, itemInCart, addToCart, removeFromCart] =
    useContext(CartContext);

  let location = useLocation();

  let product = location.state.item

  const [item, updateItem] = useState(product);


  return (
    <div className="flex items-center">
      <div className="basis-1/2">
        <img src={item.url} alt="" />
        <h1 className="text-5xl">{item.item}</h1>
      </div>
      <div className="basis-1/2">
        <p>{item.desc}</p>
        <Quantitycheck
          product={item}
          updateItem={updateItem}
          page="ProductPage"
        />
        {itemInCart(item) ? (
          <button onClick={() => removeFromCart(item)}>Remove from Cart</button>
        ) : (
          <button onClick={() => addToCart(item)}>Add to Cart</button>
        )}
      </div>
    </div>
  );
}
