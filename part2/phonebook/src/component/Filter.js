import React from "react";

function Filter({ filterName, onChange }) {
  return (
    <div>
      filter shown with:
      <input value={filterName} onChange={onChange} />
    </div>
  );
}

export default Filter;
