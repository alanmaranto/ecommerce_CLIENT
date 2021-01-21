import React, { useState, useEffect } from "react";
import Layout from "../../../core/Layout/Layout";
import { isAuthenticated } from "../../../helpers/authenticate";
import { Link } from "react-router-dom";
import { fetchAdminOrders, getStatusValues } from "../../../api";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [statusValues, setStatusValues] = useState([]);

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

  const loadStatusValues = async () => {
    try {
      const response = await getStatusValues(user._id, token);
      if (response) {
        setStatusValues(response.body);
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    loadOrders();
    loadStatusValues();
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

  const showInput = (key, value) => {
    return (
      <div className="input-group mb-2 mr-sm 2">
        <div className="input-group-prepend">
          <div className="input-group-text">{key}</div>
          <input type="text" className="form-control" readOnly value={value} />
        </div>
      </div>
    );
  };

  const renderProducts = (products) => {
    return products.map((product, index) => {
      return (
        <div
          className="mb-4"
          key={`${product._id}-${index}`}
          style={{ padding: 20, border: "1px solid indigo" }}
        >
          {showInput("Product name", product.name)}
          {showInput("Product price", product.price)}
          {showInput("Product total", product.total)}
          {showInput("Product id", product._id)}
        </div>
      );
    });
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
            <li className="list-group-item">{showStatus(order)}</li>
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
          {renderProducts(order.products)}
        </div>
      );
    });
  };

  const handleStatusValues = (event, orderId) => {
    // ypdate status value
  };

  const showStatus = (order) => {
    return (
      <div className="form-group">
        <h3 className="mark mb-4">Status: {order.status}</h3>
        <select
          className="form-control"
          onChange={(e) => handleStatusValues(e, order._id)}
        >
          <option value="">Update Status</option>
          {statusValues.map((status, index) => (
            <option value={status} key={`${status}-${index}`}>
              {status}
            </option>
          ))}
        </select>
      </div>
    );
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
