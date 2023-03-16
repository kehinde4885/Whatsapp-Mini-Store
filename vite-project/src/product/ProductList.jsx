import { useEffect, useId, useReducer, useState , useContext } from "react";
import _ from "lodash";
import { createClient } from "pexels";
import { Link } from "react-router-dom";

import { CartContext } from "../cart/CartContext";
import { filtering, sorting, searching } from "../../functions";
import FilterInstructions from "../FilterInstructions";

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

function ProductsList(props) {
  const [items, changeItems] = useState([]);
  const [view, changeView] = useReducer(reducer, []);
  const [sort, changeSort] = useState("None");
  const [filter, changeFilter] = useState("None");
  const [search, changeSearch] = useState("");

  const id = useId()
  
  const [cart, updateCart, itemInCart, addToCart, removeFromCart] =
    useContext(CartContext);

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

      <div>
        {view.map((item) => {
          return (
            <div key={item.id}>
              <Link
                to={{
                  pathname: `/products/${id}}`,
                  state: {item},
                }}
              >
                <img className="w-1/4" src={item.url} />
              </Link>
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
}

export { ProductsList };
