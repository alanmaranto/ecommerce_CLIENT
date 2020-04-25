import React, { useState, useEffect } from "react";
import Layout from "../../core/Layout/Layout";
import ProductCard from '../Dashboard/Product';
import { fetchProducts, fetchProduct } from "../../api";

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);

  const getProduct = async (productId) => {
    try {
      const product = await fetchProduct(productId);
      setProduct(product);
    } catch (error) {
      setError(error);
      throw new Error(error);
    }
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    getProduct(productId);
  }, [props]);
  return (
    <Layout
      title={product && product.name}
      description={
        product && product.description && product.description.substring(0, 100)
      }
      className="container-fluid"
    >
      <div className="row">

        {product && product.description && <ProductCard product={product} showViewProductButton={false} />}
      </div>
    </Layout>
  );
};

export default Product;
