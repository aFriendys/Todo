import React from 'react';
import './Filters.css';

function Filters({ changeFilter }) {
  return (
    <div className="filters">
      <input
        type="radio"
        name="filter"
        onChange={changeFilter}
        id="filter_all"
        className="filter-checkbox"
        // eslint-disable-next-line react/no-unknown-property
        defaultChecked
      />
      <label htmlFor="filter_all" className="filter-label">
        All
      </label>
      <input type="radio" name="filter" onChange={changeFilter} id="filter_active" className="filter-checkbox" />
      <label htmlFor="filter_active" className="filter-label">
        Active
      </label>
      <input type="radio" name="filter" onChange={changeFilter} id="filter_completed" className="filter-checkbox" />
      <label htmlFor="filter_completed" className="filter-label">
        Completed
      </label>
    </div>
  );
}

export default Filters;
