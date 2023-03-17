import { useEffect, useId, useReducer, useState, useContext } from "react";
import _ from "lodash";
import { createClient } from "pexels";
import { Link, useRouteMatch } from "react-router-dom";

import { CartContext } from "../cart/CartContext";
import { filtering, sorting, searching } from "../../functions";
import FilterInstructions from "../FilterInstructions";
import Button from "../Button";

//reducer function
// I wonder if the complex states can be done using
//Promises or async await.//

//Storing Shop Items in Array for Prototype Deployment
let arrayitems = [
  {
    item: "Louis Vuiton Bag",
    quantity: 300,
    price: 500,
    type: "Accessories",
    id: "d4a81a02-ab0b-405c-b761-69291d5e929c",
    url: "https://images.unsplash.com/photo-1583623733237-4d5764a9dc82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MTg5Nzl8MHwxfGFsbHx8fHx8fHx8fDE2NzkwMDMwOTc&ixlib=rb-4.0.3&q=80&w=400",
    toBuy: 1,
    desc: "Introducing our Women's Faux Leather Tote Bag - the perfect accessory for the modern woman. This stylish and functional tote bag is made from high-quality faux leather, ensuring durability and longevity. The sleek and minimalist design makes it suitable for a variety of occasions, from work to weekend outings.",
  },
  {
    item: "Shoes",
    quantity: 4,
    price: 3,
    type: "Footwear",
    id: "f8469cde-f7c2-4f20-b881-60c9b14a6689",
    url: "https://images.unsplash.com/photo-1560343090-f0409e92791a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MTg5Nzl8MHwxfGFsbHx8fHx8fHx8fDE2NzkwMDM2MTc&ixlib=rb-4.0.3&q=80&w=400",
    toBuy: 1,
    desc: "Introducing our Men's Leather Oxford Dress Shoes - the perfect footwear for the modern gentleman. Made from high-quality leather and rubber sole, these dress shoes offer both style and durability. The classic Oxford design features a sleek and sophisticated look, making them suitable for any formal occasion.",
  },
  {
    item: "Sneakers",
    quantity: 5,
    price: 90,
    type: "Footwear",
    id: "6a0c9176-6318-4f54-a0aa-6a23f12aebad",
    url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MTg5Nzl8MHwxfGFsbHx8fHx8fHx8fDE2NzkwMDM0MjY&ixlib=rb-4.0.3&q=80&w=400",
    toBuy: 1,
    desc: "Introducing our Men's Classic White Sneakers - a timeless and versatile addition to your footwear collection. Made from high-quality leather and rubber sole, these sneakers offer both comfort and durability. The classic design features a clean and simple look, making them suitable for both casual and formal occasions.",
  },
  {
    item: "Necklace",
    quantity: 5,
    price: 20,
    type: "Accessories",
    id: "ecbd84e5-563d-4311-b841-c84536138ebd",
    url: "https://images.unsplash.com/photo-1610694955371-d4a3e0ce4b52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MTg5Nzl8MHwxfGFsbHx8fHx8fHx8fDE2NzkwMDM4NjA&ixlib=rb-4.0.3&q=80&w=400",
    toBuy: 1,
    desc: "Introducing our Women's Dainty Layered Necklace - a must-have accessory for every fashion-forward woman. This delicate and elegant necklace features two layers of fine chains, each adorned with a small pendant. The combination of the two layers creates a subtle and sophisticated look that can be worn with any outfit.",
  },
  {
    item: "Trouser",
    quantity: 5,
    price: 200,
    type: "Lower Body",
    id: "412b1290-1619-4791-a7da-3bceb787932e",
    url: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MTg5Nzl8MHwxfGFsbHx8fHx8fHx8fDE2NzkwMDM5Mzc&ixlib=rb-4.0.3&q=80&w=400",
    toBuy: 1,
    desc: "Introducing our Men's Slim-Fit Chino Trousers - the perfect addition to your smart casual wardrobe. Made from high-quality cotton twill, these trousers offer both comfort and durability. The slim-fit design adds a modern touch to the classic chino style, making it suitable for both work and play.",
  },
  {
    item: "Hat",
    quantity: 6,
    price: 15,
    type: "Accessories",
    id: "2a8652ec-c6a2-4318-9bf4-81e679e6586b",
    url: "https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MTg5Nzl8MHwxfGFsbHx8fHx8fHx8fDE2NzkwMDM5ODU&ixlib=rb-4.0.3&q=80&w=400",
    toBuy: 1,
    desc: "Introducing our Women's Wide Brim Dress Hat - a sophisticated and stylish accessory for any formal occasion. Made from high-quality wool felt material, this hat offers both comfort and durability. The wide brim design provides ample shade from the sun, while the elegant bow adds a touch of femininity to the overall look.",
  },
];

function reducer(state, action) {
  if (action.type === "Initialise") {
    //console.log(action)
    return action.array;
  } else if (action.type === "ViewChanges") {
    const { filterBy, sortBy, searchBy, array } = action;

    let sortedArray = sorting(array, sortBy);
    let filtered = filtering(sortedArray, filterBy);
    return searching(filtered, searchBy);
  } else if (action.type === "cartUpdated") {
  }
}

function ProductsList(props) {
  const [items, changeItems] = useState(arrayitems);
  const [view, changeView] = useReducer(reducer, []);
  const [sort, changeSort] = useState("None");
  const [filter, changeFilter] = useState("None");
  const [search, changeSearch] = useState("");

  const id = useId();

  let match = useRouteMatch();

  const [cart, updateCart, itemInCart, addToCart, removeFromCart] =
    useContext(CartContext);

  // useEffect(() => {
  //   fetch("http://localhost:3000/items")
  //     .then((res) => res.json())
  //     .then((data) => changeItems(data));
  // }, []);

  useEffect(() => {
    changeView({ type: "Initialise", array: items });
    // console.log('Here')
  }, [items]);

  return (
    <div className="">
      <h2>PRODUCTS LIST</h2>
      <FilterInstructions
        handleSort={handleSort}
        handleFilter={handleFilter}
        handleSearch={handleSearch}
        sort={sort}
        filter={filter}
        search={search}
      />

      <div className="my-8 grid grid-cols-2 gap-8">
        {view.map((item) => {
          return (
            <div key={item.id} className="w-max">
              <Link
                to={{
                  pathname: `/product/${id}`,
                  state: { item },
                }}
              >
                <div>
                  <img
                    className="w-[280px] h-[350px] object-cover"
                    src={item.url}
                  />
                </div>
              </Link>
              <p className="">{item.item}</p>
              <p>${item.price}</p>

              {itemInCart(item) ? (
                <Button bool={false} func={removeFromCart} item={item} />
              ) : (
                <Button bool={true} func={addToCart} item={item} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  function handleSort(e) {
    const { value } = e.target;
    changeView({
      type: "ViewChanges",
      sortBy: value,
      filterBy: filter,
      searchBy: search,
      array: items,
    });
    changeSort(value);
  }

  function handleFilter(e) {
    const { value } = e.target;
    changeView({
      type: "ViewChanges",
      sortBy: sort,
      filterBy: value,
      searchBy: search,
      array: items,
    });

    changeFilter(value);
  }

  function handleSearch(e) {
    const { value } = e.target;
    changeView({
      type: "ViewChanges",
      sortBy: sort,
      filterBy: filter,
      searchBy: value,
      array: items,
    });

    changeSearch(value);
  }
}

export { ProductsList };
