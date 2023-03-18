import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";

import { CartContext } from "./CartContext";
import { Quantitycheck } from "./QuantityCheck";
import Button from "./Button";

export default function ProductPage() {
  const [cart, updateCart, itemInCart, addToCart, removeFromCart] =
    useContext(CartContext);

  let location = useLocation();

  let product = location.state;

  const [item, updateItem] = useState(product);

  return (
    <div className="flex">
      <div className="basis-1/2">
        <img src={item.url} alt="" />
        <h1 className="text-5xl">{item.item}</h1>
      </div>
      <div className="flex flex-col justify-around items-start basis-1/2">
        <p>{item.desc}</p>
        <Quantitycheck
          product={item}
          updateItem={updateItem}
          page="ProductPage"
        />
        {itemInCart(item) ? (
          <Button bool={false} func={removeFromCart} item={item} />
        ) : (
          <Button bool={true} func={addToCart} item={item} />
        )}
      </div>
    </div>
  );
}
