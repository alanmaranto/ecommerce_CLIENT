import React from "react";

const Checkbox = ({ categories }) => {
  return categories.map((categorie, index) => (
    <li key={index} className="list-unstyled">
      <input type="checkbox" className="form-check-input" />
      <label className="form-check-label">{categorie.name}</label>
    </li>
  ));
};

export default Checkbox;
