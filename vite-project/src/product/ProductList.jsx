import { useEffect, useId, useReducer, useState, useContext } from "react";
import _ from "lodash";
import { createClient } from "pexels";
import { Link , useRouteMatch} from "react-router-dom";

import { CartContext } from "../cart/CartContext";
import { filtering, sorting, searching } from "../../functions";
import FilterInstructions from "../FilterInstructions";
import Button from "../Button";

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

  const id = useId();

  let match = useRouteMatch()
  

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
                  <img className="w-[280px] h-[350px] object-cover" src={item.url} />
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
