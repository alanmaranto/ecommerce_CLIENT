import React, { useState, useEffect, Fragment } from 'react';

const RadioBox = ({ prices, onFilters }) => {
    const [ value, setValue ] = useState(0)

    const onChange = (e) => {
        onFilters(e.target.value)
        setValue(e.target.value)
    }

    return prices.map((price, index) => (
        <div key={index}>
          <input
            value={`${price._id}`}
            onChange={onChange}
            type="radio"
            name={price}
            className="mr-2 ml-4"
          />
          <label className="form-check-label">{price.name}</label>
        </div>
      ));
}
 
export default RadioBox;