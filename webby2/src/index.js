import React from "react";
import * as ReactDOM from "react-dom";

import App from "./App.jsx";
import "./index.css";

//import App from "./Router";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// let object = {
//   damon: 'salvatore',
//   stefan: 'salvatore'
// }

// let object2 = {
//   ...object,
//   bonnie: 'bennet'
// }

// console.log(object)
// console.log(object2)

//import Test from './Test.jsx'

// let root = createRoot(document.getElementById("root"))

// root.render(
//       <Test/>
//   );

// // function Test(){
//     return (
//         <h1>Testign</h1>
//     )

// }
