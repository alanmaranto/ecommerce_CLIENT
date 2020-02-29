import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignUp from "../components/user/Signup";
import SignIn from "../components/user/Signin";
import Dashboard from "../view/Dashboard/Dashboard";
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';
import UserDashboard from '../components/user/UserDashboard/UserDashboard';
import AdminDashboard from '../components/user/AdminDashboard/AdminDashboard';
import AddCategory from '../components/admin/Category/AddCategory';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/signup" exact component={SignUp} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/create/category" exact component={AddCategory} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
