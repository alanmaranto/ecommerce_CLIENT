import React, { useState } from "react";
import Layout from "../../../core/Layout/Layout";
import { isAuthenticated } from "../../../helpers/authenticate";
import { Link } from "react-router-dom";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // destructure user and token info from localstorage
  const { user, token } = isAuthenticated();

  const onChange = e => {
    setError("");
    setName(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // make request to api to create category
  };

  const newCategoryForm = () => (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          className="form-control"
          onChange={onChange}
          value={name}
          autoFocus
        />
      </div>
      <button className="btn btn-outline-primary">Create Category</button>
    </form>
  );

  return (
    <Layout
      title="Add a new category"
      description={`Good day ${name}, ready to add a new category`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">{newCategoryForm()}</div>
      </div>
    </Layout>
  );
};

export default AddCategory;
