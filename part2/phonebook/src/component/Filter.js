import React from "react";

function Filter({ filterName, onFilterChange }) {
  return (
    <div>
      filter shown with:
      <input value={filterName} onChange={onFilterChange} />
    </div>
  );
}

export default Filter;
