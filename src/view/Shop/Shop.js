import React, { useState, useEffect } from "react";
import Layout from "../../core/Layout/Layout";
import { fetchCategories, getFilteredProducts } from "../../api";
import Checkbox from "./Checkbox";
import Radiobox from './RadioBox';
import { prices } from '../../constants/Shop/FixedPrices';

const Shop = () => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] }
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(6); // Limit the request to 6
  const [skip, setSkip] = useState(0);
  const [filteredResults, setFilteredResults] = useState(0);

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

  const loadFilteredResults = newFilters => {
    // console.log(newFilters)
    getFilteredProducts(skip, limit, newFilters).then(data => {
      if (data.error) {
        setError(data.error)
      } else {
        setFilteredResults(data)
      }
    })
  }


  useEffect(() => {
    init();
    loadFilteredResults(skip, limit, myFilters.filters)
  }, []);

  const onFilters = (filters, filterBy) => {
    // console.log("Shop", filters, filterBy);
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    if (filterBy == "price") {
      let priceValues = onPrice(filters)
      newFilters.filters[filterBy] = priceValues;
    }
    loadFilteredResults(myFilters.filters)
    setMyFilters(newFilters)
  };

  const onPrice = value => {
    const data = prices
    let array = []

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array
      }
    }

    return array
  }

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
          <h4>Filter by price range</h4>
          <div>
            <Radiobox
              prices={prices}
              onFilters={filters => onFilters(filters, "price")}
            />
          </div>
        </div>
        <div className="col-8">
          {JSON.stringify(filteredResults)}
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
