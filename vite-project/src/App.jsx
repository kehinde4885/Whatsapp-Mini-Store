import { useEffect, useReducer, useState } from "react";
import { createClient } from "pexels";

// const client = createClient('NhQ3Heel0eOQqHZQvZXU842KfyfAg0ANSjOn40jMCuvD9zlbk8yXvYCV')

// client.photos.show({ id: 15663377 }).then(photo => {console.log ( image = photo.src.medium)});

//reducer function
function reducer(state, action) {
  if (action.type === "Initialise") {
    console.log(action)
    return action.array
  }
}


function App() {
  const [items, changeItems] = useState([]);
  const [view, changeView] = useReducer(reducer, []);

  useEffect(() => {
    fetch("http://localhost:3000/items")
      .then((res) => res.json())
      .then((data) => changeItems(data));
  }, []);

  useEffect(()=> {
    changeView({type:'Initialise', array: items});
    console.log('Here')
  },[items])

  
  return (
    <div className="App">
      <h1 className="text-2xl">Whastapp Vendor Store</h1>
      <h2>PRODUCTS LIST</h2>
      
      <div>
        <label htmlFor="sort">Sort</label>
        <select onChange={(e)=>handleSort(e)} name="sort" id="sort">
          <option value=""></option>
          <option value="Newly Added">Newly Added</option>
          <option value="Price">Price</option>
        </select>
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
    console.log(e)

   
  }
}

export default App;
