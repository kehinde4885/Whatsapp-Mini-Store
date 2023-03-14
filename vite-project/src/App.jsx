import { ProductsList } from "./ProductList";
import { Cart } from "./Cart";
import { useState } from "react";

import { CartContext } from "./CartContext";


function App() {
  const [cart, updateCart] = useState([]);

  return (
    <CartContext.Provider value={[cart, updateCart]}>
       <ProductsList />
      <Cart />
     </CartContext.Provider>
  );
}

export default App;
