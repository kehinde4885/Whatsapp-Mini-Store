import ProductPage from "./ProductPage";
import { ProductsList } from "./ProductList";

import { Switch, Route } from "react-router-dom";

export default function Products() {
  return (
    <Switch>
      <Route path="/products/:id">
        <ProductPage />
      </Route>
      <Route path="/products">
        <ProductsList />
      </Route>
    </Switch>
  );
}
