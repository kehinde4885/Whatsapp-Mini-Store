import { CartContext } from "./CartContext.jsx";
import { useContext } from "react";
import cartFull from "./assets/cartFull.png";
import cartEmpty from "./assets/cartEmpty.png";
import React from "react";

import { Link } from "react-router-dom";

export default function Header() {
  const [cart] = useContext(CartContext);

  return (
    <div className="flex justify-between">
      <Link to='/'>
        <h1 className="text-2xl">Whastapp Vendor Store</h1>
      </Link>

      <Link to="cart">
        <img src={cart.length ? cartFull : cartEmpty} alt="" />
      </Link>
    </div>
  );
}
