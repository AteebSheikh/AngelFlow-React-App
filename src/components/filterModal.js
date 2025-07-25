import React, { useState, useEffect } from "react";
import SearchBar from "./searchbar";
import IndustryIcon from "../assets/images/shapeactiveimg.svg";
import TagIcon from "../assets/images/TagactiveIcon.svg";
import CountryIcon from "../assets/images/LocationactiveIocn.svg";
import PersonIcon from "../assets/images/PersonactiveIcon.svg";
import duplicates from "find-array-duplicates";
import { requestOptions } from "../configs";

const FilterModal = ({
  types,
  tags,
  curators,
  countries,
  mapDetails,
  projectsArray,
  filteredProjects,
  setFilteredProjects,
  setFilterOpen,
  checked,
  setChecked,
  setActiveIcon,
  setSelectedProjectArray,
  selectedProjectArray,
  setActiveMarker,
  setProjectId,
  setPinId,
  projectId,
  pinId,
  setPinData,
  setFilterBy,
}) => {
  const [typeData, setTypeData] = useState([]);
  const [tagData, setTagData] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const [curatorData, setCuratorData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [booleanValue, setBooleanValue] = useState(true);
  const [projectsData, setProjectsData] = useState([]);
  const [totalProjects, setTotalProjects] = useState([]);

  const [count, setCount] = useState(
    filteredProjects?.length > 0
      ? filteredProjects?.length
      : projectsArray?.length
  );
  const [active, setActive] = useState("type");
  const handleSearch = (event, type, data) => {
    const query = event?.target?.value;
    setSearchQuery(query);

    const searchList =
      type &&
      type?.filter((item) => {
        return (
          item?.name?.toLowerCase().indexOf(query?.toLowerCase()) !== -1 &&
          item?.subtypes?.length > 0
        );
      });

    data(searchList);
  };

  const handleIcon = (type) => {
    setActive(type);
  };

  const getProjectsById = async (projectId) => {
    await fetch(
      `${process.env.REACT_APP_Base_Url}/api/v1/projects/${projectId}?project=true`,
      requestOptions
    )
      .then((response) => response?.text())
      .then(async (result) => {
        const res = JSON.parse(result);
        setPinData(res?.data);
      })
      .catch((error) => console.log("error", error));
  };
  const onCheckboxChange = (e, name, category) => {
    setFilterBy(false);
    let updated = { ...checked };
    if (e?.target?.checked) updated[category]?.push(name);
    else updated[category] = updated[category]?.filter((item) => item !== name);
    setChecked(updated);
    setPinData(null);
    setProjectId(null);
    setPinId(null);
    setActiveMarker(null);
  };

  const handleCross = (name, category) => {
    let updated = { ...checked };

    updated[category] = updated[category]?.filter((item) => item !== name);
    setChecked(updated);
  };
  const getSingleProject = (e, name, id, data) => {
    data &&
      data?.map((value) => {
        if (value?.name === name) {
          setSelectedProjectArray([value]);
        }
      });
  };
  const getFilteredData = (checkedTypes, data, prevFilterList) => {
    let filteredTypes = [];
    if (checkedTypes?.length > 0) {
      filteredTypes = data?.filter(
        (value) =>
          value?.subtypes?.length > 0 && checkedTypes?.includes(value?.name)
      );
    }
    return [...prevFilterList, ...filteredTypes];
  };

  const filteredData = () => {
    if (
      checked?.type?.length === 0 &&
      checked?.tag?.length === 0 &&
      checked?.curators?.length === 0 &&
      checked?.country?.length > 0
    ) {
      const filteredCountry = projectsArray?.filter((item) =>
        checked?.country?.includes(item?.country)
      );
      const sortedData = filteredCountry?.sort(function (a, b) {
        if (a?.name < b?.name) {
          return -1;
        }
        if (a?.name > b?.name) {
          return 1;
        }
        return 0;
      });
      setFilteredProjects(sortedData);

      setCount(filteredCountry?.length);
    } else {
      let updatedData =
        !checked?.type?.length > 0 &&
        !checked?.tag?.length > 0 &&
        !checked?.curators?.length > 0 &&
        checked?.country?.length > 0
          ? [...types, ...tags, ...curators]
          : [];
      updatedData = getFilteredData(checked?.type, types, updatedData);
      updatedData = getFilteredData(checked?.tag, tags, updatedData);
      updatedData = getFilteredData(checked?.curators, curators, updatedData);

      const list = [];
      let projectList = [];
      let totalProjects = 0;
      let duplicateArray = [];
      const checkedAll = [
        ...checked?.type,
        ...checked?.tag,
        ...checked?.country,
        ...checked?.curators,
      ];
      updatedData &&
        updatedData?.map((item) => {
          let filteredSubTypes = item?.subtypes?.filter(
            (subItem) =>
              checked?.country?.length === 0 ||
              checked?.country?.includes(subItem?.country)
          );
          const sortedData = filteredSubTypes?.sort(function (a, b) {
            if (a?.name < b?.name) {
              return -1;
            }
            if (a?.name > b?.name) {
              return 1;
            }
            return 0;
          });
          if (item?.subtypes?.length > 0) {
            list?.push({ ...item, subtypes: sortedData });
            projectList = [...projectList, ...sortedData];
            totalProjects += sortedData?.length;
          }
        });
      if (
        (checked?.type?.length === 1 ||
          checked?.tag?.length === 1 ||
          checked?.curators?.length === 1) &&
        checked?.country?.length === 1 &&
        list?.length < 2
      ) {
        setFilteredProjects(projectList);

        setCount(projectList?.length);
      } else if (projectList?.length > 0) {
        const results = duplicates(projectList, "id")?.all();

        const valWhichRepeat = () =>
          [...new Set(results)]?.filter((x) => {
            return (
              results?.filter((a) => a?.id === x?.id)?.length >=
              updatedData?.length
            );
          });
        const unique = valWhichRepeat()?.filter(
          (obj, index) =>
            valWhichRepeat()?.findIndex((item) => item?.id === obj?.id) ===
            index
        );
        setFilteredProjects(checkedAll?.length > 1 ? unique : projectList);

        setCount(checkedAll?.length > 1 ? unique?.length : projectList?.length);
      } else {
        setFilteredProjects(projectList);

        setCount(
          filteredProjects?.length > 0
            ? filteredProjects?.length
            : projectList?.length > 0
            ? projectList?.length
            : projectsArray?.length
        );
      }
      if (checkedAll?.length > 0 && projectList?.length === 0)
        setCount(projectList?.length);
      if (checkedAll?.length === 0) setCount(projectsArray?.length);
    }
  };

  useEffect(() => {
    if (mapDetails?.types === true) setActive("type");
    else if (mapDetails?.tags === true) setActive("tag");
    else if (mapDetails?.countries === true) setActive("country");
    else {
      setActive("curator");
    }
  }, [mapDetails]);

  useEffect(() => {
    if (pinId && projectId) {
      getProjectsById(projectId);
    }
  }, [projectId]);
  useEffect(() => {
    if (
      checked?.type?.length > 0 ||
      checked?.tag?.length > 0 ||
      checked?.country?.length > 0 ||
      checked?.curators?.length > 0
    )
      setSelectedProjectArray([]);
    filteredData();
  }, [checked]);

  useEffect(() => {
    setTypeData(types);
    setTagData(tags?.filter((item) => item?.count > 0));
    setCountryData(countries);
    setCuratorData(curators);
  }, [types, tags, curators, countries]);

  useEffect(() => {
    setCount(
      filteredProjects?.length > 0
        ? filteredProjects?.length
        : projectsArray?.length
    );
    if (projectsArray && booleanValue) {
      setBooleanValue(false);
      setProjectsData(projectsArray);
    }
  }, [projectsArray]);
  return (
    <div className="desktopSmart">
      <h1>Smart Filters</h1>
      {checked?.type?.length > 0 ||
      checked?.tag?.length > 0 ||
      checked?.country?.length > 0 ||
      checked?.curators?.length > 0 ? (
        <div className="d-flex">
          <div className="d-flex smartHeadTag">
            {checked?.type?.map((item) => {
              return (
                <p
                  style={{
                    backgroundColor: "#545454",
                  }}
                >
                  {item}
                  <div
                    role="button"
                    class="select__multi-value__remove css-12a83d4-MultiValueRemove"
                    aria-label="Remove  Exchange"
                  >
                    <svg
                      height="14"
                      width="14"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                      focusable="false"
                      class="css-tj5bde-Svg"
                      onClick={() => handleCross(item, "type")}
                    >
                      <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
                    </svg>
                  </div>
                </p>
              );
            })}
            {checked?.tag?.map((item) => {
              return (
                <p
                  style={{
                    backgroundColor: "#737373",
                  }}
                >
                  {item}
                  <div
                    role="button"
                    class="select__multi-value__remove css-12a83d4-MultiValueRemove"
                    aria-label="Remove  Exchange"
                  >
                    <svg
                      height="14"
                      width="14"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                      focusable="false"
                      class="css-tj5bde-Svg"
                      onClick={() => handleCross(item, "tag")}
                    >
                      <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
                    </svg>
                  </div>
                </p>
              );
            })}
            {checked?.country?.map((item) => {
              return (
                <p
                  style={{
                    backgroundColor: "#999696",
                  }}
                >
                  {item}
                  <div
                    role="button"
                    class="select__multi-value__remove css-12a83d4-MultiValueRemove"
                    aria-label="Remove  Exchange"
                  >
                    <svg
                      height="14"
                      width="14"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                      focusable="false"
                      class="css-tj5bde-Svg"
                      onClick={() => handleCross(item, "country")}
                    >
                      <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
                    </svg>
                  </div>
                </p>
              );
            })}
            {checked?.curators?.map((item) => {
              return (
                <p
                  style={{
                    backgroundColor: "#737373",
                  }}
                >
                  {item}
                  <div
                    role="button"
                    class="select__multi-value__remove css-12a83d4-MultiValueRemove"
                    aria-label="Remove  Exchange"
                  >
                    <svg
                      height="14"
                      width="14"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                      focusable="false"
                      class="css-tj5bde-Svg"
                      onClick={() => handleCross(item, "curators")}
                    >
                      <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
                    </svg>
                  </div>
                </p>
              );
            })}
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="searchbarfeild d-flex gap-2">
        <div className="tags-desktop">
          <div className="d-flex gap-2 justify-content-center align-item-center tags-mobile">
            {mapDetails?.types === true ? (
              <div
                className={active === "type" ? "active-smart" : "MobileIcon"}
                onClick={() => handleIcon("type")}
              >
                <img src={IndustryIcon} alt="" />
                <p>{mapDetails?.type_name ?? "Type"}</p>
              </div>
            ) : (
              <></>
            )}
            {mapDetails?.tags === true ? (
              <div
                className={active === "tag" ? "active-smart" : "MobileIcon"}
                onClick={() => handleIcon("tag")}
              >
                <img src={TagIcon} alt="" />
                <p>Tag</p>
              </div>
            ) : (
              <></>
            )}
            {mapDetails?.countries === true ? (
              <div
                className={active === "country" ? "active-smart" : "MobileIcon"}
                onClick={() => handleIcon("country")}
              >
                <img src={CountryIcon} alt="" />
                <p>Country</p>
              </div>
            ) : (
              <></>
            )}
            {mapDetails?.curators === true ? (
              <div
                className={active === "curator" ? "active-smart" : "MobileIcon"}
                onClick={() => handleIcon("curator")}
              >
                <img src={PersonIcon} alt="" />
                <p>{mapDetails?.curator_name ?? "Curator"}</p>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="d-flex gap-3 ">
            {mapDetails?.types === true ? (
              <div
                className={
                  active === "type" ? "activeSmartUSer" : "smartUserData"
                }
              >
                <SearchBar
                  placeholder={`Search by ${mapDetails?.type_name ?? "Type"}`}
                  value={searchQuery}
                  onChange={(e) => handleSearch(e, types, setTypeData)}
                />
                <div className="custom-scrollbar innerSmartFilter">
                  {typeData?.map((item, idx) => {
                    return (
                      <div className="d-flex smartcheckbox" key={idx}>
                        <input
                          type="checkbox"
                          className="type-checkbox"
                          checked={checked?.type?.includes(item?.name)}
                          key={idx}
                          onChange={(e) => {
                            onCheckboxChange(e, item?.name, "type");
                          }}
                        />
                        <label>{item?.name}</label>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <></>
            )}
            {mapDetails?.tags === true ? (
              <div
                className={
                  active === "tag" ? "activeSmartUSer" : "smartUserData"
                }
              >
                <SearchBar
                  placeholder="Search by Tag"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e, tags, setTagData)}
                />
                <div className="custom-scrollbar  innerSmartFilter">
                  {tagData?.map((item, idx) => {
                    return (
                      <div className="d-flex smartcheckbox" key={idx}>
                        <input
                          type="checkbox"
                          className="tag-checkbox"
                          checked={checked?.tag?.includes(item?.name)}
                          key={idx}
                          onChange={(e) => {
                            onCheckboxChange(e, item?.name, "tag");
                          }}
                        />
                        <label>{item?.name}</label>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <></>
            )}
            {mapDetails?.countries === true ? (
              <div
                className={
                  active === "country" ? "activeSmartUSer" : "smartUserData"
                }
              >
                <SearchBar
                  placeholder="Search by Country"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e, countries, setCountryData)}
                />
                <div className="custom-scrollbar  innerSmartFilter">
                  {countryData?.map((item, idx) => {
                    return (
                      <div className="d-flex smartcheckbox" key={idx}>
                        <input
                          type="checkbox"
                          className="country-checkbox"
                          checked={checked?.country?.includes(item?.name)}
                          key={idx}
                          onChange={(e) => {
                            onCheckboxChange(e, item?.name, "country");
                          }}
                        />
                        <label>{item?.name}</label>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <></>
            )}
            {mapDetails?.curators === true ? (
              <div
                className={
                  active === "curator" ? "activeSmartUSer" : "smartUserData"
                }
              >
                <SearchBar
                  placeholder="Search by Curator"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e, curators, setCuratorData)}
                />
                <div className="custom-scrollbar  innerSmartFilter">
                  {curatorData?.map((item, idx) => {
                    return (
                      <div className="d-flex smartcheckbox" key={idx}>
                        <input
                          className="curator-checkbox"
                          type="checkbox"
                          checked={checked?.curators?.includes(item?.name)}
                          key={idx}
                          onChange={(e) => {
                            onCheckboxChange(e, item?.name, "curators");
                          }}
                        />
                        <label>{item?.name}</label>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <></>
            )}
            <div className="mainInnerSmart">
              <label className="projectHeading">Projects</label>
              <div className="custom-scrollbar  innerSmartFilter">
                <div>
                  {filteredProjects?.length > 0 ? (
                    filteredProjects?.map((item, idx) => {
                      return (
                        <p
                          key={idx}
                          onClick={(e) => {
                            setFilterBy(false);
                            setPinData(null);
                            setTimeout(() => {
                              setProjectId(item?.id);
                              setPinId(item?.id);
                            }, 100);
                            getSingleProject(
                              e,
                              item?.name,
                              item?.id,
                              projectsArray
                            );
                            setFilterOpen(false);
                            setActiveMarker(item?.id);
                          }}
                        >
                          {item?.name}
                        </p>
                      );
                    })
                  ) : [
                      ...checked?.type,
                      ...checked?.tag,
                      ...checked?.country,
                      ...checked?.curators,
                    ]?.length === 0 ? (
                    projectsData?.map((item, idx) => {
                      return (
                        <p
                          key={idx}
                          onClick={(e) => {
                            setFilterBy(false);
                            setPinData(null);
                            setTimeout(() => {
                              setProjectId(item?.id);
                              setPinId(item?.id);
                            }, 100);
                            getSingleProject(
                              e,
                              item?.name,
                              item?.id,
                              projectsArray
                            );
                            setFilterOpen(false);
                            setActiveMarker(item?.id);
                          }}
                        >
                          {item?.name}
                        </p>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="align-items-center footer_bottom ">
        <button
          type="button"
          class="view-button btn btn-primary"
          onClick={() => {
            setFilteredProjects([]);
            setChecked({
              type: [],
              tag: [],
              country: [],
              curators: [],
            });
            setPinData(null);
            setProjectId(null);
            setPinId(null);
            setActiveMarker(null);
          }}
        >
          Clear All Filters
        </button>
        <button
          type="button"
          class="new-project-button btn btn-primary"
          onClick={() => {
            setFilterOpen(false);
          }}
        >
          {count} Projects Found
        </button>
      </div>
    </div>
  );
};

export default FilterModal;
