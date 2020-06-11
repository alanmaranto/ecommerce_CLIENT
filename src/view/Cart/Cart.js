import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../../core/Layout/Layout";
import ProductCard from "../Dashboard/Product";
import { getCart } from "../../helpers/cart";

const Cart = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getCart());
  }, []);

  const showItems = (items) => {
    return (
      <div>
        <h2>Your cart has {`${items.length}`} items</h2>
        <hr />
        {items.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    );
  };

  const notItemsMessage = () => (
    <h2>
      Your cart is empty.
      <br />
      <Link to="/shop">Continue shopping</Link>
    </h2>
  );

  return (
    <Layout
      title="Shopping Cart"
      description="Manage your cart items. Add remove checkout or continue shopping"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-6">
          {items.length > 0 ? showItems(items) : notItemsMessage()}
        </div>
        <div className="col-6">
          <p>Show checkout options/shipping address/total/update quantity</p>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
