import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignUp from "../components/user/Signup";
import SignIn from "../components/user/Signin";
import Dashboard from "../view/Dashboard/Dashboard";
import PrivateRoute from './PrivateRoute';
import UserDashboard from '../components/user/UserDashboard/UserDashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/signup" exact component={SignUp} />
        <PrivateRoute path="/dashboard" exact component={UserDashboard} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
