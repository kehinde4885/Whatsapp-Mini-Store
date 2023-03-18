import ProductPage from "./ProductPage";
import { ProductsList } from "./ProductList";

import { Route, Routes } from "react-router-dom";

export default function Products() {
 

  return (
    <Routes>
      <Route path="/:id" element={<ProductPage/>} />

      <Route path="/" element={<ProductsList />} />
    </Routes>
  );
}
