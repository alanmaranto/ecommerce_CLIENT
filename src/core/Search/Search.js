import React, { useState, useEffect } from "react";

// import ProductCard from "./Product";
import SearchForm from "./SearchForm";
import { fetchCategories } from "../../api";

const initialState = {
  categories: [],
  category: "",
  search: "",
  results: [],
  searched: false,
};

const Search = () => {
  const [data, setData] = useState(initialState);

  const { categories, category, search, results, searched } = data;

  const getCategories = async () => {
    try {
      const categories = await fetchCategories();
      setData({ categories });
    } catch (error) {
      throw new Error("Error fetching");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const searchSubmit = () => {};

  const onChange = () => {};

  return (
    <div className="row">
      <div className="container mb-3">
        <SearchForm
          categories={categories}
          searchSubmit={searchSubmit}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default Search;
