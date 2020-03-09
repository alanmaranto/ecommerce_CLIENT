import React, { useState, useEffect } from "react";

const Checkbox = ({ categories }) => {
  const [checked, setChecked] = useState([]);

  // Return categorie and return another function
  const onToggle = category => () => {
    // return the first index or -1
    const currentCategoryId = checked.indexOf(category);
    const newCheckedCategoryId = [...checked];
    // if currently checked was not already in checked state then push
    // else pull/take off
    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(category);
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1);
    }
    console.log(newCheckedCategoryId);
    setChecked(newCheckedCategoryId);
  };
  return categories.map((category, index) => (
    <li key={index} className="list-unstyled">
      <input
        value={checked.indexOf(category._id === -1)}
        onChange={onToggle(category._id)}
        type="checkbox"
        className="form-check-input"
      />
      <label className="form-check-label">{category.name}</label>
    </li>
  ));
};

export default Checkbox;
