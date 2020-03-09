import React, { useState, useEffect } from "react";
import Layout from "../../core/Layout/Layout";
import { fetchCategories } from "../../api";
import Checkbox from "./Checkbox";

const Shop = () => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] }
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);

  // load categories
  const init = () => {
    fetchCategories().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const onFilters = (filters, filterBy) => {
    // console.log("Shop", filters, filterBy);
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters
    setMyFilters(newFilters)
  };

  return (
    <Layout
      title="Shop Page"
      description="Search and find books of your choice"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-4">
          <h4>Filter by categories</h4>
          <ul>
            <Checkbox
              categories={categories}
              onFilters={filters => onFilters(filters, "category")}
            />
          </ul>
        </div>
        <div className="col-8">
          {JSON.stringify(myFilters)}
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
