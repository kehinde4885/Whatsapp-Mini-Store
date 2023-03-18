import React from "react";
import ProductPage from "./ProductPage.jsx";
import { ProductsList } from "./ProductList.jsx";

import { Route, Routes } from "react-router-dom";

export default function Products() {
 

  return (
    <Routes>
      <Route path="/:id" element={<ProductPage/>} />

      <Route path="/" element={<ProductsList />} />
    </Routes>
  );
}
