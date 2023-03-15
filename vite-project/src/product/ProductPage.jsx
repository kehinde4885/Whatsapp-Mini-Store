import { Quantitycheck } from "../QuantityCheck";
import { useContext } from "react";
import { CartContext } from "../cart/CartContext";
import { useState } from "react";

export default function ProductPage(props) {
  const [cart, updateCart, itemInCart, addToCart, removeFromCart] =
    useContext(CartContext);

  const { items } = props;

  const [item, updateItem] = useState(items[0]);

  //let item = items[0];

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
