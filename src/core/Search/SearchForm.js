import React from "react";
import ProductCard from "../../view/Dashboard/Product";

import "./style.css";

const searchedProducts = (results = []) => {
  return (
    <div className="row">
      {results.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
};

const SearchForm = ({ categories, searchSubmit, onChange, results }) => (
  <div className="row">
    <div className="container mb-3">
      <form onSubmit={searchSubmit}>
        <span className="input-group-text">
          <div className="input-group input-group-lg">
            <div className="input-group-prepend">
              <select className="btn mr-2" onChange={onChange("category")}>
                <option value="All">Pick Category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="search"
              className="form-control"
              onChange={onChange("search")}
              placeholder="Search by name"
            />
          </div>
          <div className="btn input-group-append search-form-input">
            <button className="input-group-text">Search</button>
          </div>
        </span>
      </form>
    </div>
    <div className="container-fluid mb-3">
        {searchedProducts(results)}
    </div>
  </div>
);

export default SearchForm;
