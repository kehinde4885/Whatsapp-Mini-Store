import { useEffect, useReducer, useState } from "react";
import { createClient } from "pexels";
import { filtering, sorting, searching } from "../functions";

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
    console.log(action);

    let sortedArray = sorting(array, sortBy);
    let  filtered = filtering(sortedArray, filterBy);
    return searching(filtered, searchBy);
  }
}

function ProductsList() {
  const [items, changeItems] = useState([]);
  const [view, changeView] = useReducer(reducer, []);
  const [sort, changeSort] = useState("None");
  const [filter, changeFilter] = useState("None");
  const [search, changeSearch] = useState("");

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
      <div className="flex space-x-8">
        <div>
          <label htmlFor="sort">Sort</label>
          <select
            value={sort}
            onChange={(e) => handleSort(e)}
            name="sort"
            id="sort"
          >
            <option value="None">None</option>
            <option value="Newly Added">Newly Added</option>
            <option value="price">Price</option>
          </select>
        </div>
        <div>
          <label htmlFor="filter">Filter</label>
          <select
            value={filter}
            onChange={(e) => handleFilter(e)}
            name="filter"
            id="filter"
          >
            <option value="None">None</option>
            <option value="Full Body">Full Body</option>
            <option value="Lower Body">Lower Body</option>
            <option value="Accessories">Accessories</option>
            <option value="Footwear">Footwear</option>
          </select>
        </div>
        <div>
          <label htmlFor="search">Search</label>
          <input
            value={search}
            onChange={(e) => handleSearch(e)}
            type="text"
            name=""
            id="search"
          />
        </div>
      </div>

      <div>
        {view.map((item) => {
          return (
            <div key={item.id}>
              <img className="w-1/4" src={item.url} />
              <p className="">{item.item}</p>
              <p>${item.price}</p>
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
