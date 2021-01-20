import React, { useState, useEffect } from "react";
import Layout from "../../../core/Layout/Layout";
import { isAuthenticated } from "../../../helpers/authenticate";
import { Link } from "react-router-dom";
import { fetchAdminOrders } from "../../../api";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const { user, token } = isAuthenticated();

  const loadOrders = async () => {
    try {
      const response = await fetchAdminOrders(user._id, token);
      if (response) {
        setOrders(response.body);
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const showOrdersLength = (orders) => {
    if (orders.length > 0) {
      return (
        <h1 className="text-danger display-2">Total orders: {orders.length}</h1>
      );
    } else {
      return <h1 className="text-danger">No orders</h1>;
    }
  };

  const renderOrders = (orders) => {
    return orders.map((order, index) => {
      return (
        <div
          className="mt-5"
          key={`${order._id}-${index}`}
          style={{ borderBottom: "5px solid indigo" }}
        >
          <h2 className="mb-5">
            <span className="bg-primary">Order ID: {order._id}</span>
          </h2>

          <ul className="list-group mb-2">
            <li className="list-group-item">Status: {order.status}</li>
            <li className="list-group-item">
              Transaction ID: {order.transaction_id}
            </li>
            <li className="list-group-item">Amount: {order.amount}</li>
            <li className="list-group-item">Ordered by: {order.user.name}</li>
            <li className="list-group-item">
              Ordered on: {moment(order.createdAt).fromNow()}
            </li>
            <li className="list-group-item">
              Delivery address: {order.address}
            </li>
          </ul>

          <h3 className="mt-4 mb-4 font-italic">
            Total products in the order: {order.products.length}
          </h3>
        </div>
      );
    });
  };

  return (
    <Layout
      title="Orders"
      description={`Good day ${user.name}, you can manage your orders here`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showOrdersLength(orders)}
          {renderOrders(orders)}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
