import React, { useState, useEffect } from "react";

// import ProductCard from "./Product";
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

  const { categories, category, search, results, searched } = data

  const getCategories = async () => {
    try {
      const categories = await fetchCategories();
      console.log(categories);
      setData({ categories: categories });
    } catch (error) {
      throw new Error("Error fetching");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div>
      <h2>Search Bar {JSON.stringify(categories)}</h2>
    </div>
  );
};

export default Search;
