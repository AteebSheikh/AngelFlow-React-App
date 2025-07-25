import React, { useState, useEffect } from "react";
import Layout from "../layouts/layout";
import { GetProjects } from "../hooks/projects";
import FilterBy from "../components/filterBy";
import ArrowDown from "../assets/images/arrow_down.svg";
import { requestOptions } from "../configs";

const Home = ({ mapId }) => {
  const {
    projectsArray,
    types,
    tags,
    curators,
    countries,
    mapDetails,
    getProjects,
    getFilters,
  } = GetProjects();
  const [sidebar, setSidebar] = useState(true);
  const [selectedProjectArray, setSelectedProjectArray] = useState([]);
  const [selectedTypeArray, setSelectedTypeArray] = useState([]);
  const [selectedTagArray, setSelectedTagArray] = useState([]);
  const [singleTagArray, setSingleTagArray] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [subTypesData, setSubTypesData] = useState(false);
  const [activeMarker, setActiveMarker] = useState(null);
  const [filterBy, setFilterBy] = useState(false);
  const [projectsData, setProjectsData] = useState([]);
  const [initialState, setInitialState] = useState(false);
  const [booleanValue, setBooleanValue] = useState(true);
  const [singleTypeArray, setSingleTypeArray] = useState([]);
  const [currentCountry, setCurrentCountry] = useState([]);
  const [singleCuratorArray, setSingleCuratorArray] = useState([]);
  const [selectedCuratorArray, setSelectedCuratorArray] = useState([]);
  const [sidebarType, setSidebarType] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [viewProject, setViewProjects] = useState(false);
  const [termsConditions, setTermsConditions] = useState(false);
  const [active, setActive] = useState("");
  const [allProjects, setAllProjects] = useState(null);
  const [newProject, setNewProject] = useState(false);
  const [checkboxReset, setCheckboxReset] = useState(false);
  const [colorSubType, setColorSubType] = useState(false);
  const [pinId, setPinId] = useState(null);
  const [pinData, setPinData] = useState(null);
  const [projectId, setProjectId] = useState(null);
  const [checked, setChecked] = useState({
    type: [],
    tag: [],
    country: [],
    curators: [],
  });
  let typesArray = [];
  let tagsArray = [];
  let curatorsArray = [];

  const [filteredProjects, setFilteredProjects] = useState([]);
  const [typesData, setTypesData] = useState(selectedTypeArray);
  const [tagsData, setTagsData] = useState(selectedTagArray);
  const [curatorsData, setCuratorsData] = useState(selectedCuratorArray);
  const [dataType, setDataType] = useState([]);
  const [emptyProjectList, setEmptyProjectList] = useState(false);
  const [smartFilterData, setSmartFilterData] = useState([]);

  const getfilteredProjects = (e, name, category, id) => {
    // setActiveMarker(null);
    setSidebar(false);
    allProjects?.map((value) => {
      if (value?.name === name && value?.id === id) {
        setSelectedProjectArray([value]);
      }
    });
  };
  const handleSearch = (event, type) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (typesData && type === "type") {
      selectedTypeArray?.map((item, idx) => {
        const types = item?.subtypes?.map((subItem, index) => {
          return typesArray.push(subItem);
        });
      });
      const searchList = typesArray.filter((item) => {
        return item?.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      });
      const sortedTypes = searchList?.sort(function (a, b) {
        if (a?.name < b?.name) {
          return -1;
        }
        if (a?.name > b?.name) {
          return 1;
        }
        return 0;
      });
      setTypesData(sortedTypes);
      if (searchQuery === "") {
        setTypesData(sortedTypes);
      }
      if (searchList?.length === 0) {
        setEmptyProjectList(true);
      } else {
        setEmptyProjectList(false);
      }
    }
    if (tagsData && type === "tag") {
      selectedTagArray?.map((item, idx) => {
        const tags = item?.subtypes?.map((subItem, index) => {
          return tagsArray.push(subItem);
        });
      });
      const searchList = tagsArray.filter((item) => {
        return item?.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      });
      const sortedTags = searchList?.sort(function (a, b) {
        if (a?.name < b?.name) {
          return -1;
        }
        if (a?.name > b?.name) {
          return 1;
        }
        return 0;
      });
      const unique = sortedTags?.filter(
        (obj, index) =>
          sortedTags?.findIndex((item) => item?.id === obj?.id) === index
      );
      setTagsData(unique);
      if (searchQuery === "") {
        setTagsData(unique);
      }
      if (searchList?.length === 0) {
        setEmptyProjectList(true);
      } else {
        setEmptyProjectList(false);
      }
    }
    if (curatorsData && type === "curator") {
      selectedCuratorArray?.map((item, idx) => {
        const curators = item?.subtypes?.map((subItem, index) => {
          return curatorsArray.push(subItem);
        });
      });
      const searchList = curatorsArray.filter((item) => {
        return item?.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      });
      const sortedCurators = searchList?.sort(function (a, b) {
        if (a?.name < b?.name) {
          return -1;
        }
        if (a?.name > b?.name) {
          return 1;
        }
        return 0;
      });
      setCuratorsData(sortedCurators);
      if (searchQuery === "") {
        setCuratorsData(sortedCurators);
      }
      if (searchList?.length === 0) {
        setEmptyProjectList(true);
      } else {
        setEmptyProjectList(false);
      }
    }
    if (smartFilterData) {
      const searchList = filteredProjects.filter((item) => {
        return item?.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      });

      setSmartFilterData(searchList);
    }
    if (
      selectedTypeArray.length === 0 &&
      selectedTagArray?.length === 0 &&
      selectedCuratorArray?.length === 0
    ) {
      setEmptyProjectList(false);
      const searchList = allProjects.filter((item) => {
        return item?.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      });

      setProjectsData(searchList);
    }
  };

  const getProjectsData = () => {
    fetch(
      `${process.env.REACT_APP_Base_Url}/api/v1/maps/${mapId}.json`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        const res = JSON.parse(result);
        setAllProjects(res?.data?.projects?.map((item) => item));
        setProjectsData(res?.data?.projects?.map((item) => item));
      })
      .catch((error) => console.log("error", error));
  };

  const getProjectsById = async (projectId) => {
    await fetch(
      `${process.env.REACT_APP_Base_Url}/api/v1/projects/${projectId}?project=true`,
      requestOptions
    )
      .then((response) => response.text())
      .then(async (result) => {
        const res = JSON.parse(result);
        setPinData(res?.data);
        // setProjectDetail(res?.data);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    if (selectedTypeArray && searchQuery === "") {
      selectedTypeArray?.map((item, idx) => {
        const types = item?.subtypes?.map((subItem, index) => {
          return typesArray.push(subItem);
        });
      });
      const sortedTypes = typesArray?.sort(function (a, b) {
        if (a?.name < b?.name) {
          return -1;
        }
        if (a?.name > b?.name) {
          return 1;
        }
        return 0;
      });
      setTypesData(sortedTypes);
    }

    if (selectedTagArray && searchQuery === "") {
      selectedTagArray?.map((item, idx) => {
        const tags = item?.subtypes?.map((subItem, index) => {
          return tagsArray.push(subItem);
        });
      });
      const sortedTags = tagsArray?.sort(function (a, b) {
        if (a?.name < b?.name) {
          return -1;
        }
        if (a?.name > b?.name) {
          return 1;
        }
        return 0;
      });
      const unique = sortedTags?.filter(
        (obj, index) =>
          sortedTags?.findIndex((item) => item?.id === obj?.id) === index
      );
      setTagsData(unique);
    }
    if (selectedCuratorArray && searchQuery === "") {
      selectedCuratorArray?.map((item, idx) => {
        const curators = item?.subtypes?.map((subItem, index) => {
          return curatorsArray.push(subItem);
        });
      });
      const sortedCurators = curatorsArray?.sort(function (a, b) {
        if (a?.name < b?.name) {
          return -1;
        }
        if (a?.name > b?.name) {
          return 1;
        }
        return 0;
      });
      setCuratorsData(sortedCurators);
    }
    if (filteredProjects && searchQuery === "") {
      const sortedFilterProjects = filteredProjects?.sort(function (a, b) {
        if (a?.name < b?.name) {
          return -1;
        }
        if (a?.name > b?.name) {
          return 1;
        }
        return 0;
      });
      setSmartFilterData(sortedFilterProjects);
    }
  }, [
    selectedTypeArray,
    selectedTagArray,
    selectedCuratorArray,
    filteredProjects,
    searchQuery,
  ]);
  useEffect(() => {
    if (pinId && projectId) {
      getProjectsById(projectId);
    }
  }, [projectId]);
  useEffect(() => {
    if (newProject) {
      getProjectsData();
      if (mapDetails?.types === true) getFilters("types");
      if (mapDetails?.tags === true) getFilters("tags");
      if (mapDetails?.countries === true) getFilters("countries");
      if (mapDetails?.curators === true) getFilters("curators");
    }
    setTimeout(() => {
      setNewProject(false);
    }, 200);
  }, [newProject]);

  useEffect(() => {
    getProjects();
  }, []);

  useEffect(() => {
    if (mapDetails?.types === true) getFilters("types");
    if (mapDetails?.tags === true) getFilters("tags");
    if (mapDetails?.countries === true) getFilters("countries");
    if (mapDetails?.curators === true) getFilters("curators");
  }, [mapDetails]);

  useEffect(() => {
    if (projectsArray && booleanValue) {
      setBooleanValue(false);
      setProjectsData(projectsArray);
      setAllProjects(projectsArray);
    }
  }, [projectsArray]);

  useEffect(() => {
    if (sidebarType) {
      setProjectsData(allProjects);
      setProjectId(null);
      setSearchQuery("");
    }
  }, [sidebarType]);

  useEffect(() => {
    if (filteredProjects || sidebar) {
      setSelectedTypeArray([]);
      setSingleTypeArray([]);
      setSelectedTagArray([]);
      setSingleTagArray([]);
      setSingleCuratorArray([]);
      setSelectedCuratorArray([]);
      setCurrentCountry([]);
    }
  }, [sidebar, filteredProjects]);

  useEffect(() => {
    if (initialState) {
      setSelectedProjectArray([]);
    }
  }, [initialState]);

  useEffect(() => {
    if (!filterBy) {
      setSearchQuery("");
      setProjectsData(allProjects);
      setProjectId(null);
    }
  }, [filterBy]);

  useEffect(() => {
    if (selectedTypeArray.length === 0) setTypesData([]);
    if (selectedTagArray.length === 0) setTagsData([]);
    if (selectedCuratorArray.length === 0) setCuratorsData([]);
  }, [selectedTypeArray, selectedTagArray, selectedCuratorArray]);

  return (
    <Layout
      setInitialState={setInitialState}
      setSidebar={setSidebar}
      subTypesData={subTypesData}
      selectedProjectArray={selectedProjectArray}
      setSelectedProjectArray={setSelectedProjectArray}
      projectsArray={allProjects}
      setSubTypesData={setSubTypesData}
      setSelectedTagArray={setSelectedTagArray}
      selectedTagArray={selectedTagArray}
      singleTagArray={singleTagArray}
      setSingleTagArray={setSingleTagArray}
      selectedTypeArray={selectedTypeArray}
      setActiveMarker={setActiveMarker}
      activeMarker={activeMarker}
      setSingleTypeArray={setSingleTypeArray}
      singleTypeArray={singleTypeArray}
      setCurrentCountry={setCurrentCountry}
      currentCountry={currentCountry}
      singleCuratorArray={singleCuratorArray}
      setSingleCuratorArray={setSingleCuratorArray}
      selectedCuratorArray={selectedCuratorArray}
      setSelectedCuratorArray={setSelectedCuratorArray}
      setSelectedTypeArray={setSelectedTypeArray}
      sidebar={sidebar}
      filterBy={filterBy}
      setFilterBy={setFilterBy}
      setSidebarType={setSidebarType}
      sidebarType={sidebarType}
      setSidebarOpen={setSidebarOpen}
      sidebarOpen={sidebarOpen}
      open={open}
      setOpen={setOpen}
      viewProject={viewProject}
      setViewProjects={setViewProjects}
      termsConditions={termsConditions}
      setTermsConditions={setTermsConditions}
      setActive={setActive}
      active={active}
      newProject={newProject}
      setNewProject={setNewProject}
      mapId={mapId}
      checkboxReset={checkboxReset}
      setCheckboxReset={setCheckboxReset}
      colorSubType={colorSubType}
      setColorSubType={setColorSubType}
      mapDetails={mapDetails}
      types={types}
      tags={tags}
      curators={curators}
      countries={countries}
      pinData={pinData}
      pinId={pinId}
      setPinId={setPinId}
      projectId={projectId}
      setProjectId={setProjectId}
      setPinData={setPinData}
      setFilterOpen={setFilterOpen}
      filterOpen={filterOpen}
      filteredProjects={filteredProjects}
      setFilteredProjects={setFilteredProjects}
      setChecked={setChecked}
      checked={checked}
      projectFilter={
        mapDetails?.filter_activated === "Yes" ? (
          <>
            <div className="filter-by-main">
              <button
                type="button"
                class="new-project-button btn btn-primary"
                onClick={() => {
                  setFilterBy(!filterBy);
                }}
              >
                Projects{" "}
                <span className="dropdown">
                  <img src={ArrowDown} alt="img" className="downicon" />
                </span>
                {filterBy ? (
                  <div className="dropdown-content">
                    {mapDetails?.search ? (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          setFilterBy(true);
                        }}
                      >
                        <FilterBy
                          handleSearch={handleSearch}
                          searchQuery={searchQuery}
                          sidebarType={sidebarType}
                        />
                      </div>
                    ) : (
                      <></>
                    )}

                    <div
                      onClick={() => {
                        setColorSubType(false);
                      }}
                      className={
                        projectsData?.length > 4
                          ? "inner-content custom-scrollbar "
                          : "inner-content-auto custom-scrollbar "
                      }
                    >
                      {selectedTypeArray?.length > 0 &&
                      typesData?.length > 0 ? (
                        typesData?.map((item, index) => {
                          return (
                            <p
                              key={index}
                              onClick={(e) => {
                                if (projectId != item?.id) {
                                  // setActiveMarker(null);
                                  setSelectedProjectArray(null);
                                  setSingleTypeArray(null);
                                  setPinData(null);
                                  setTimeout(() => {
                                    setProjectId(item?.id);
                                    setPinId(item?.id);
                                  }, 100);
                                  setFilterBy(false);
                                  setSidebar(true);
                                  // setFilteredProjects([]);
                                  // setChecked([]);
                                  getfilteredProjects(
                                    e,
                                    item?.name,
                                    item?.category,
                                    item?.id
                                  );
                                }
                              }}
                            >
                              {item?.name}
                            </p>
                          );
                        })
                      ) : selectedTagArray?.length > 0 &&
                        tagsData?.length > 0 ? (
                        tagsData?.map((item, index) => {
                          return (
                            <p
                              key={index}
                              onClick={(e) => {
                                if (projectId != item?.id) {
                                  // setActiveMarker(null);
                                  setSelectedProjectArray(null);
                                  setPinData(null);
                                  setSingleTagArray(null);
                                  setTimeout(() => {
                                    setProjectId(item?.id);
                                    setPinId(item?.id);
                                  }, 100);
                                  setFilterBy(false);
                                  setSidebar(true);
                                  // setFilteredProjects([]);
                                  // setChecked([]);
                                  // setFilteredProjects(true);
                                  getfilteredProjects(
                                    e,
                                    item?.name,
                                    item?.category,
                                    item?.id
                                  );
                                }
                              }}
                            >
                              {item?.name}
                            </p>
                          );
                        })
                      ) : selectedCuratorArray?.length > 0 &&
                        curatorsData?.length > 0 ? (
                        curatorsData?.map((item, index) => {
                          return (
                            <p
                              key={index}
                              onClick={(e) => {
                                if (projectId != item?.id) {
                                  // setActiveMarker(null);
                                  setSelectedProjectArray(null);
                                  setSingleCuratorArray(null);
                                  setPinData(null);
                                  setTimeout(() => {
                                    setProjectId(item?.id);
                                    setPinId(item?.id);
                                  }, 100);
                                  setFilterBy(false);
                                  setSidebar(true);
                                  // setFilteredProjects([]);
                                  // setChecked([]);
                                  // setFilteredProjects(true);
                                  getfilteredProjects(
                                    e,
                                    item?.name,
                                    item?.category,
                                    item?.id
                                  );
                                }
                              }}
                            >
                              {item?.name}
                            </p>
                          );
                        })
                      ) : smartFilterData?.length > 0 ? (
                        smartFilterData?.map((item, idx) => {
                          return (
                            <p
                              key={idx}
                              onClick={(e) => {
                                if (projectId != item?.id) {
                                  // setActiveMarker(null);
                                  setSelectedProjectArray(null);
                                  setSingleCuratorArray(null);
                                  setPinData(null);
                                  setTimeout(() => {
                                    setProjectId(item?.id);
                                    setPinId(item?.id);
                                  }, 100);
                                  setFilterBy(false);
                                  setSidebar(true);

                                  // setFilteredProjects(true);
                                  getfilteredProjects(
                                    e,
                                    item?.name,
                                    item?.category,
                                    item?.id
                                  );
                                }
                              }}
                            >
                              {item?.name}
                            </p>
                          );
                        })
                      ) : emptyProjectList === true ? (
                        <></>
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
                                if (projectId != item?.id) {
                                  // setActiveMarker(null);
                                  setSingleTypeArray(null);
                                  setSingleTagArray(null);
                                  setSingleCuratorArray(null);
                                  setSelectedProjectArray(null);
                                  setPinData(null);
                                  setActive("");
                                  // setSidebarOpen(false);
                                  setTimeout(() => {
                                    setProjectId(item?.id);
                                    setPinId(item?.id);
                                  }, 100);
                                  setFilterBy(false);
                                  setSidebar(true);

                                  // setFilteredProjects(true);
                                  getfilteredProjects(
                                    e,
                                    item?.name,
                                    item?.category,
                                    item?.id
                                  );
                                }
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
                ) : (
                  <></>
                )}
              </button>
            </div>
          </>
        ) : (
          <></>
        )
      }
    ></Layout>
  );
};

export default Home;
