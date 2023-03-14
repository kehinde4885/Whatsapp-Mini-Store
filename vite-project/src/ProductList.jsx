import { useEffect, useReducer, useState } from "react";
import { useContext } from "react";
import _ from "lodash";
import { createClient } from "pexels";
import { CartContext } from "./CartContext";


import { filtering, sorting, searching } from "../functions";
import FilterInstructions from "./FilterInstructions";
// const client = createClient('NhQ3Heel0eOQqHZQvZXU842KfyfAg0ANSjOn40jMCuvD9zlbk8yXvYCV')

// client.photos.show({ id: 15663377 }).then(photo => {console.log ( image = photo.src.medium)});

//reducer function
// I wonder if the complex states can be done using
//Promises or async await.//

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

function ProductsList() {
  const [items, changeItems] = useState([]);
  const [view, changeView] = useReducer(reducer, []);
  const [sort, changeSort] = useState("None");
  const [filter, changeFilter] = useState("None");
  const [search, changeSearch] = useState("");

  const [cart, updateCart] = useContext(CartContext);

  console.log(cart);

  useEffect(() => {
    fetch("http://localhost:3000/items")
      .then((res) => res.json())
      .then((data) => changeItems(data));
  }, []);

  useEffect(() => {
    changeView({ type: "Initialise", array: items });
    // console.log('Here')
  }, [items]);

  return (
    <div className="App">
      <h1 className="text-2xl">Whastapp Vendor Store</h1>
      <h2>PRODUCTS LIST</h2>
      <FilterInstructions
        handleSort={handleSort}
        handleFilter={handleFilter}
        handleSearch={handleSearch}
        sort={sort}
        filter={filter}
        search={search}
      />

      <div>
        {view.map((item) => {
          return (
            <div key={item.id}>
              <img className="w-1/4" src={item.url} />
              <p className="">{item.item}</p>
              <p>${item.price}</p>

              {itemInCart(item) ? (
                <button onClick={() => removeFromCart(item)}>
                  Remove from Cart
                </button>
              ) : (
                <button onClick={() => addToCart(item)}>Add to Cart</button>
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

  function addToCart(item) {
    updateCart((oldCart) => {
      return [...oldCart, item];
    });
  }

  function removeFromCart(item) {
    let array = [...cart];

    _.pull(array, item);

    updateCart(array);
  }

  function itemInCart(item) {
    let cartIds = [];
    cart.forEach((element) => cartIds.push(element.id));
    let bool = cartIds.includes(item.id);

    return bool;
  }
}

export { ProductsList };
