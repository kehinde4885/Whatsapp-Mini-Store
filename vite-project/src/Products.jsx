import ProductPage from "./ProductPage";
import { ProductsList } from "./ProductList";

import { Switch, Route, useRouteMatch } from "react-router-dom";

export default function Products() {
  let match = useRouteMatch();

  return (
    <Switch>
      <Route path='/product/:id'>
        <ProductPage />
      </Route>
      <Route path={`${match.path}`}>
        <ProductsList />
      </Route>
    </Switch>
  );
}
