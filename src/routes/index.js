import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignUp from "../components/user/Signup";
import SignIn from "../components/user/Signin";
import Dashboard from "../view/Dashboard/Dashboard";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/signup" exact component={SignUp} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
