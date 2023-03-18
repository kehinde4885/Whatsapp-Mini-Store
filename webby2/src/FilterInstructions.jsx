import React from "react";

export default function FilterInstructions(props) {
  const { handleFilter, handleSort, handleSearch, sort, filter, search } =
    props;

  return (
    <div className="flex space-x-8">
      <div>
        <label htmlFor="sort">Sort</label>
        <select
          value={sort}
          onChange={(e) => handleSort(e)}
          name="sort"
          id="sort"
        >
          <option value="None">None</option>
          <option value="Newly Added">Newly Added</option>
          <option value="price">Price</option>
        </select>
      </div>
      <div>
        <label htmlFor="filter">Filter</label>
        <select
          value={filter}
          onChange={(e) => handleFilter(e)}
          name="filter"
          id="filter"
        >
          <option value="None">None</option>
          <option value="Full Body">Full Body</option>
          <option value="Lower Body">Lower Body</option>
          <option value="Accessories">Accessories</option>
          <option value="Footwear">Footwear</option>
        </select>
      </div>
      <div>
        <label htmlFor="search">Search</label>
        <input
          value={search}
          onChange={(e) => handleSearch(e)}
          type="text"
          name=""
          id="search"
        />
      </div>
    </div>
  );
}
