import React from "react";
import ProductCard from "../../view/Dashboard/Product";

import "./style.css";

const searchMessage = (searched, results) => {
    if (searched && results.length > 1) {
        return `Found ${results.length} products`
    }
    if (searched && results.length === 0) {
        return 'No products found'
    }
    if (searched && results.length === 1) {
        return `Found ${results.length} product`
    }
}

const searchedProducts = (results = [], searched) => {
  return (
    <div>
        <h2 className="mt-4 mb-4">
            {searchMessage(searched, results)}
        </h2>
      <div className="row">
        {results.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

const SearchForm = ({ categories, searchSubmit, onChange, results, searched }) => (
  <div className="row">
    <div className="container mb-3">
      <form onSubmit={searchSubmit}>
        <span className="input-group-text">
          <div className="input-group input-group-lg">
            <div className="input-group-prepend">
              <select className="btn mr-2" onChange={onChange("category")}>
                <option value="All">All categories</option>
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
    <div className="container-fluid mb-3">{searchedProducts(results, searched)}</div>
  </div>
);

export default SearchForm;
