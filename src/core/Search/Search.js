import React, { useState, useEffect } from "react";

import ProductCard from "../../view/Dashboard/Product";
import SearchForm from "./SearchForm";
import { fetchCategories, listProductsByQueryParams } from "../../api";

const initialState = {
  categories: [],
  category: "",
  search: "",
  results: [],
  searched: false,
};

const SearchContainer = () => {
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

  const searchData = () => {
    if (search) {
      listProductsByQueryParams({
        search: search || undefined,
        category: category,
      }).then((response) => {
        if (response.error) {
        } else {
          setData({ ...data, results: response, searched: true });
        }
      });
    }
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    searchData();
  };

  const onChange = (name) => (e) => {
    setData({ ...data, [name]: e.target.value, searched: false });
  };

  return (
    <SearchForm
      categories={categories}
      searchSubmit={searchSubmit}
      onChange={onChange}
      results={results}
    />
  );
};

export default SearchContainer;
