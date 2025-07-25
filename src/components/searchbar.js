import React from "react";
import SearchSvg from "../assets/images/search.svg";

const SearchBar = ({ placeholder, searchQuery, onChange }) => {
  return (
    <div className="SmartSearchbar">
      <div className="  sidebar-search-component view-project-search">
        <input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => onChange(e)}
        />
        <span>
          <img src={SearchSvg} alt="" />{" "}
        </span>
      </div>
    </div>
  );
};

export default SearchBar;
