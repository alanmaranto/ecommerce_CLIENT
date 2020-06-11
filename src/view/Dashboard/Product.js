import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import moment from "moment";
import ProductsImages from "./ProductImages";
import { addItem } from "../../helpers/cart";

const Card = ({ product, showViewProductButton = true, showAddToCartButton=true }) => {
  const [redirect, setRedirect] = useState(false);

  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <button className="btn btn-outline-primary mt-2 mb-2">
            View Product
          </button>
        </Link>
      )
    );
  };

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = (showAddToCartButton) => {
    return showAddToCartButton && (
      <button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2">
        Add Product to card
      </button>
    );
  };

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock</span>
    ) : (
      <span className="badge badge-primary badge-pill">Out of stock</span>
    );
  };

  return (
    <div className="card">
      <div className="card-header name">{product.name}</div>
      <div className="card-body">
        {shouldRedirect(redirect)}
        <ProductsImages item={product} url="product" />
        <p className="lead mt-2">{product.description.substring(0, 100)}</p>
        <p className="black-10">{product.price}</p>
        <p className="black-9">
          Category: {product.category && product.category.name}
        </p>
        <p className="black-8">
          Added on {moment(product.createdAt).fromNow()}
        </p>
        {showStock(product.quantity)}
        <br />
        {showViewButton(showViewProductButton)}
        {showAddToCart(showAddToCartButton)}
      </div>
    </div>
  );
};

export default Card;
