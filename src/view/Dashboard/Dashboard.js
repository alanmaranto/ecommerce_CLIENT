import React, { useState, useEffect } from "react";
import Layout from "../../core/Layout/Layout";
import Search from "../../core/Search/Search";
import ProductCard from "./Product";
import { fetchProducts } from "../../api";

const Dashboard = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    fetchProducts("sold").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    fetchProducts("createdAt").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  return (
    <Layout
      title="Dashboard"
      description=" Node React E-Commerce"
      className="container-fluid"
    >
      <Search />
      <h2 className="mb-4">New Arrivals</h2>
      <div className="row">
        {productsByArrival.map((product, index) => (
          <div className="col-4 mb-3" key={index}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      <h2 className="mb-4">Best Sellers</h2>
      <div className="row">
        {productsBySell.map((product, index) => (
          <div className="col-4 mb-3" key={index}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Dashboard;
