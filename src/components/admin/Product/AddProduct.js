import React, { useState, useEffect } from "react";
import Layout from "../../../core/Layout/Layout";
import { isAuthenticated } from "../../../helpers/authenticate";
import { Link } from "react-router-dom";

import { createProduct, fetchCategories } from "../../../api";

const AddProduct = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
    loading: false,
    error: "",
    createdProduct: "",
    redirectToProfile: false,
    formData: ""
  });

  const { user, token } = isAuthenticated();

  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    // photo,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData
  } = values;

  // load categories and set form data
  const init = () => {
    fetchCategories().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          categories: data,
          formData: new FormData()
        });
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const onChange = name => e => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const onSubmit = e => {
    e.preventDefault();
    setValues({ ...values, error: "", loading: true });

    createProduct(user._id, token, formData).then(data => {
      if (data.error) {
        console.log("dataerror", data.error);
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          photo: "",
          price: "",
          quantity: "",
          loading: false,
          createdProduct: data.name
        });
      }
    });
  };

  const newPostForm = () => (
    <form className="mb-3" onSubmit={onSubmit}>
      <h4>Post Photo</h4>
      <div className="form-group">
        <label className="btn btn-secondary">
          <input
            onChange={onChange("photo")}
            type="file"
            name="photo"
            accept="image/*"
          />
        </label>
      </div>

      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={onChange("name")}
          type="text"
          className="form-control"
          value={name}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Description</label>
        <textarea
          onChange={onChange("description")}
          className="form-control"
          value={description}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Price</label>
        <input
          onChange={onChange("price")}
          type="number"
          className="form-control"
          value={price}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Category</label>
        <select onChange={onChange("category")} className="form-control">
          <option>Please select</option>
          {categories &&
            categories.map((categorie, index) => (
              <option key={index} value={categorie._id}>
                {categorie.name}
              </option>
            ))}
        </select>
      </div>

      <div className="form-group">
        <label className="text-muted">Shipping</label>
        <select onChange={onChange("shipping")} className="form-control">
          <option>Please select</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>

      <div className="form-group">
        <label className="text-muted">Quantity</label>
        <input
          onChange={onChange("quantity")}
          type="number"
          className="form-control"
          value={quantity}
        />
      </div>

      <button className="btn btn-outline-primary">Create Product</button>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h2>{`${createdProduct}`} is created</h2>
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-success">
        <h2>Loading...</h2>
      </div>
    );

  return (
    <Layout
      title="Add a new product"
      description={`Good day ${user.name}, ready to add a new product?`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
            {showLoading()}
            {showSuccess()}
            {showError()}
            {newPostForm()}
            </div>
      </div>
    </Layout>
  );
};

export default AddProduct;
