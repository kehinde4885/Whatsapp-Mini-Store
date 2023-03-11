import { ProductsList } from "./ProductList";
import { Cart } from "./Cart";
import { useState } from "react";

import { CartContext } from "./CartContext";


let array = [
  {
  item: "Louis Vuiton",
  quantity: 300,
  price: 500,
  type: "Full Body",
  toBuy: 8,
  id: "d4a81a02-ab0b-405c-b761-69291d5e929c",
  url: "https://images.pexels.com/photos/15663377/pexels-photo-15663377.jpeg?auto=compress&cs=tinysrgb&h=350",
},
  {
    item: "Shoes",
    quantity: 4,
    price: 3,
    type: "Footwear",
    toBuy: 1,
    id: "f8469cde-f7c2-4f20-b881-60c9b14a6689",
    url: "https://images.pexels.com/photos/15663377/pexels-photo-15663377.jpeg?auto=compress&cs=tinysrgb&h=350",
  },
  {
    item: "Sneakers",
    quantity: 5,
    price: 90,
    type: "Footwear",
    toBuy: 1,
    id: "6a0c9176-6318-4f54-a0aa-6a23f12aebad",
    url: "https://images.pexels.com/photos/15663377/pexels-photo-15663377.jpeg?auto=compress&cs=tinysrgb&h=350",
  },
  {
    item: "Necklace",
    quantity: 5,
    price: 20,
    type: "Accessories",
    toBuy: 1,
    id: "ecbd84e5-563d-4311-b841-c84536138ebd",
    url: "https://images.pexels.com/photos/15663377/pexels-photo-15663377.jpeg?auto=compress&cs=tinysrgb&h=350",
  },
  {
    item: "Trouser",
    quantity: 5,
    price: 200,
    type: "Lower Body",
    toBuy: 1,
    id: "412b1290-1619-4791-a7da-3bceb787932e",
    url: "https://images.pexels.com/photos/15663377/pexels-photo-15663377.jpeg?auto=compress&cs=tinysrgb&h=350",
  },
  {
    item: "Hat",
    quantity: 6,
    price: 15,
    type: "Accessories",
    toBuy: 1,
    id: "2a8652ec-c6a2-4318-9bf4-81e679e6586b",
    url: "https://images.pexels.com/photos/15663377/pexels-photo-15663377.jpeg?auto=compress&cs=tinysrgb&h=350",
  },
];

function App() {
  const [cart, updateCart] = useState(array);
  
  return (
  
  <CartContext.Provider value={cart}>
    <Cart 
    handleCart={handleCart} />
  </CartContext.Provider>
  );

  function handleCart(product,quantity){
    let array = [...cart]
    
    let index = array.findIndex((element) => element === product)
   
    array[index].toBuy = quantity
    
    updateCart(array)

    
  }
}


export default App;

