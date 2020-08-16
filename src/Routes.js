import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home/Home";
import NotFound from "./containers/NotFound/NotFound"
import Login from "./containers/Login/Login";
import SignUp from "./containers/SignUp/SignUp";
import Cart from "./containers/Cart/Cart"

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/login">
        <Login/>
      </Route>
      <Route exact path="/signup">
        <SignUp />
      </Route>
      <Route exact path="/Cart">
        <Cart />
      </Route>
    
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}