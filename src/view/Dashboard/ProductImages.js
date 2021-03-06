import React from "react";
import { host } from "../../api";

const ProductsImages = ({ item, url }) => {
  return (
    <div className="product-img">
      <img
        src={`${host}/${url}/photo/${item._id}`}
        alt={item.name}
        className="mb-3"
        style={{ maxHeight: "100%", maxWidth: "100%" }}
      />
    </div>
  );
};

export default ProductsImages;
