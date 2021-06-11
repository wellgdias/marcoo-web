import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Home from "../pages/Home";
import Product from "../pages/Product";
import Checkout from "../pages/Checkout";
import Payment from "../pages/Payment";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/produto/:path" component={Product} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/payment" component={Payment} />
      <Redirect to="/" />
    </Switch>
  );
}
