import React from "react";
import { fetchCategories } from "../../api";
import "./style.css";

const SearchForm = ({ categories, searchSubmit, onChange }) => (
  <form onSubmit={searchSubmit}>
    <span className="input-group-text">
      <div className="input-group input-group-lg">
        <div className="input-group-prepend">
          <select className="btn mr-2" onChange={onChange("category")}>
            <option value="All">Pick Category</option>
            {categories.map((categorie, index) => (
              <option key={index} value={categorie._id}>
                {categorie.name}
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
);

export default SearchForm;
