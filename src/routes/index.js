import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignUp from "../components/user/Signup";
import SignIn from "../components/user/Signin";
import Dashboard from "../view/Dashboard/Dashboard";
import Menu from '../core/Menu/Menu'

const Routes = () => {
  return (
    <BrowserRouter>
    <Menu />
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/signup" exact component={SignUp} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
