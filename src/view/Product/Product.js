import React, { useState, useEffect } from "react";
import Layout from "../../core/Layout/Layout";
import ProductCard from "./Product";
import { fetchProducts, fetchProduct } from "../../api";

const Product = (props) => {
    const [product, setProduct] = useState({})
    const [error, setError] = useState(false)
  
    const getProduct = async productId => {
        try {
            const product = await fetchProduct(productId);
            setProduct(product)
        } catch (error) {
            setError(error)
            throw new Error(error)
        }
    }
  
    useEffect(() => {
    //   const { match: { params }} = this.props;
      const productId = props.match.params.productId;
      getProduct(productId)
    }, [])
  return (
    <Layout
      title="Dashboard"
      description=" Node React E-Commerce"
      className="container-fluid"
    >
      <h2 className="mb-4">Single Product</h2>
      <div className="row">
          {JSON.stringify(product)}
      </div>
    </Layout>
  );
};

export default Product;
