import React, { useState, useEffect } from "react";
import SearchSvg from "../../assets/images/search.svg";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const location = ({
  setSidebar,
  getGeoCode,
  setActiveMarker,
  countries,
  setSidebarOpen,
  sidebarOpen,
  setColorSubType,
  colorSubType,
  imageModal,
  setFilterBy,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationData, setLocationData] = useState([]);
  const [booleanValue, setBooleanValue] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState({});

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    const searchList = countries.filter((item) => {
      return item?.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });

    setLocationData(searchList);
  };

  useEffect(() => {
    if (countries && booleanValue) {
      setBooleanValue(false);
      setLocationData(countries);
    }
  }, [countries]);

  return (
    <>
      <div
        className={
          sidebarOpen ? "arrow-button" : "arrow-button button-collapsed"
        }
      >
        {sidebarOpen && !imageModal ? (
          <button
            onClick={() => {
              setSidebar(false);
              setSidebarOpen(false);
            }}
            className=""
          >
            <BsChevronLeft />
          </button>
        ) : (
          <></>
        )}
      </div>
      <div className={sidebarOpen ? "sidebar-data" : "sidebar-data collapsed"}>
        <div className="sidebar-search-component">
          <input
            type="text"
            placeholder="Search by Country"
            value={searchQuery}
            onChange={(e) => handleSearch(e)}
          />
          <span>
            <img src={SearchSvg} alt="" />{" "}
          </span>
        </div>
        <div className="countries-accordion accordian-wrapper">
          {locationData?.map((item, idx) => {
            return (
              <div
                className={`${
                  idx == selectedCountry.index &&
                  selectedCountry.countryName == item?.name &&
                  colorSubType
                    ? "curator-content accordion-subtype-title"
                    : "curator-content"
                }`}
                onClick={() => {
                  setActiveMarker(null);
                  getGeoCode(item?.name);
                  setColorSubType(true);
                  setFilterBy(false);
                  setSelectedCountry({
                    index: idx,
                    countryName: item?.name,
                  });
                }}
              >
                <span>{item?.name}</span>
                <span>{item?.count}</span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default location;
