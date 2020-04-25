import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignUp from "../components/user/Signup";
import SignIn from "../components/user/Signin";
import Dashboard from "../view/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import UserDashboard from "../components/user/UserDashboard/UserDashboard";
import AdminDashboard from "../components/user/AdminDashboard/AdminDashboard";
import AddCategory from "../components/admin/Category/AddCategory";
import AddProduct from "../components/admin/Product/AddProduct";
import Shop from '../view/Shop/Shop';
import Product from '../view/Product/Product';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/shop" exact component={Shop} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/signup" exact component={SignUp} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/create/category" exact component={AddCategory} />
        <AdminRoute path="/create/product" exact component={AddProduct} />
        <Route path="/product/:productId" exact component={Product} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
