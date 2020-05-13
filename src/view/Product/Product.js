import React, { useState, useEffect } from "react";
import Layout from "../../core/Layout/Layout";
import ProductCard from "../Dashboard/Product";
import { fetchProduct, listProductRelated } from "../../api";

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProducts] = useState([]);
  const [error, setError] = useState(false);

  const getProduct = async (productId) => {
    try {
      const product = await fetchProduct(productId);
      setProduct(product);
      // fetch related products
      const relatedProduct = await listProductRelated(product._id);
      setRelatedProducts(relatedProduct);
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
        <div className="col-8">
          {product && product.description && (
            <ProductCard product={product} showViewProductButton={false} />
          )}
        </div>
        <div className="col-4">
          <h4>Related Products</h4>
          {relatedProduct.map((product, index) => (
            <div className="mb-3">
              <ProductCard key={index} product={product} />
            </div>
          ) )}
        </div>
        {product && product.description && (
          <ProductCard product={product} showViewProductButton={false} />
        )}
      </div>
    </Layout>
  );
};

export default Product;
