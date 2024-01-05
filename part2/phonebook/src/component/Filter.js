import React from 'react';

function Filter({ search, handleSearch }) {
  return (
    <label>
      filter shown with <input onChange={handleSearch} value={search} />
    </label>
  );
}

export default Filter;
