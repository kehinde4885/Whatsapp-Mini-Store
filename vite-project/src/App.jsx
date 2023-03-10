import { useEffect, useReducer, useState } from "react";
import { createClient } from "pexels";
import { mergeSort } from "../functions";
import _, { filter } from "lodash";

// const client = createClient('NhQ3Heel0eOQqHZQvZXU842KfyfAg0ANSjOn40jMCuvD9zlbk8yXvYCV')

// client.photos.show({ id: 15663377 }).then(photo => {console.log ( image = photo.src.medium)});

//reducer function
function reducer(state, action) {
  if (action.type === "Initialise") {
    console.log(action)
    return action.array;
  } else if (action.type === "Sorting") {
    const { sortBy, array } = action;
    switch (sortBy) {
      case "price":
        let arr = mergeSort(array, sortBy);
        return arr;
        break;

      case "Newly Added":
        let newArr = [...array];
        _.reverse(newArr);
        return newArr;

      default:
        return array;
        break;
    }
  } else if (action.type === "Filtering") {
    const { filterBy, array } = action;
    return array.filter((item, index, defaultArray) =>
      filterBy ? item.type === filterBy : item
    );
  } else if (action.type === "FS") {
    const { filterBy, sortBy, array } = action;
    function sorted() {
      switch (sortBy) {
        case "price":
          let arr = mergeSort(array, sortBy);
          return arr;

        case "Newly Added":
          let newArr = [...array];
          _.reverse(newArr);
          return newArr;

        default:
          return array;
      }
    }

    let sortedArray = sorted();

    return sortedArray.filter((item) =>
      filterBy ? item.type === filterBy : item
    );
  }else if (action.type === 'Searching'){
    const {searchBy, array} = action

    let searchResults = array.filter((item) =>
      item.item.toLowerCase().startsWith(searchBy.toLowerCase())
    );
    console.log(searchResults);
    return searchResults;

    
  }
}

function App() {
  const [items, changeItems] = useState([]);
  const [view, changeView] = useReducer(reducer, []);
  const [sort, changeSort] = useState("");
  const [filter, changeFilter] = useState("");

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
            <option value="">None</option>
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
            <option value="">Nil</option>
            <option value="Full Body">Full Body</option>
            <option value="Lower Body">Lower Body</option>
            <option value="Accessories">Accessories</option>
            <option value="Footwear">Footwear</option>
          </select>
        </div>
        <div>
          <label htmlFor="search">Search</label>
          <input onChange={(e)=>handleSearch(e)} type="text" name="" id="search" />
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
    console.log(value);
    if(filter){
      //Filtering is ON
      changeView({ type: "FS", filterBy: filter, sortBy: value, array: items });
    }else{
      changeView({ type: "Sorting", sortBy: value, array: items });
    }
    changeSort(value);
  }

  function handleFilter(e) {
    const { value } = e.target;
    //console.log(value);
    if (sort) {
      //Sorting is ON
      changeView({ type: "FS", filterBy: value, sortBy: sort, array: items });
    } else {
      changeView({ type: "Filtering", filterBy: value, array: items });
    }
    changeFilter(value);
  }

  function handleSearch(e){
    const {value} = e.target
    if(value){
      //Searching
      changeView({type:'Searching',searchBy: value , array: view})
    }else {
      //Searching OFF
      if(filter && sort){
        changeView({ type: "FS", filterBy: filter, sortBy: sort, array: items })
      }else if (filter){
        changeView({ type: "Filtering", filterBy: filter, array: items });
      }else if(sort){
        changeView({ type: "Sorting", sortBy: sort, array: items });
      }else{
        changeView({ type: "Initialise", array: items });
      }

    }

  }
}

export default App;
