import React from "react";
import SearchSvg from "../assets/images/search.svg";

const FilterBy = ({ handleSearch, searchQuery, sidebarType }) => {
  return (
    <div className="filter-by">
      <div className="sidebar-search-component">
        <input
          type="text"
          placeholder="Search by Projects"
          value={searchQuery}
          onChange={(e) => handleSearch(e, sidebarType)}
        />
        <span>
          <img src={SearchSvg} alt="" />{" "}
        </span>
      </div>
    </div>
  );
};

export default FilterBy;
