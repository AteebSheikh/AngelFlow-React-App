import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import WorldactiveIcon from "../../assets/images/WorldactiveIcon.svg";
import HomeactiveIcon from "../../assets/images/HomeactiveIcon.svg";
import ArrowactiveIcon from "../../assets/images/ArrowactiveIcon.svg";
import BlocksactiveIcon from "../../assets/images/BlocksactiveIcon.svg";
import LocationactiveIcon from "../../assets/images/LocationactiveIocn.svg";
import ShapeactiveIcon from "../../assets/images/shapeactiveimg.svg";
import TagactiveIcon from "../../assets/images/TagactiveIcon.svg";
import PersonactiveIcon from "../../assets/images/PersonactiveIcon.svg";
import FilterIcon from "../../assets/images/filter-icon.svg";

import ResetIcon from "../../assets/images/reset-icon.svg";
import "../../assets/scss/index.scss";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import CssFilterConverter from "css-filter-converter";
import FilterModal from "../filterModal";
import MyModal from "../modal/modal";

export function SidebarAnt({
  setSidebar,
  setSidebarType,
  setInitialState,
  setActiveMarker,
  setSidebarOpen,
  setTermsConditions,
  setOpen,
  setViewProjects,
  setFilterBy,
  setActive,
  active,
  setRightSidebar,
  setCheckboxReset,
  mapDetails,
  activeIcon,
  setActiveIcon,
  setFilterName,
  previousView,
  setSelectedProjectArray,
  previousZoomMap,
  setPreviousZoomMap,
  previousLatMap,
  setPreviouslatMap,
  map,
  setMap,
  userInfoData,
  setFilterOpen,
  filterOpen,
  types,
  tags,
  curators,
  countries,
  projectsArray,
  filteredProjects,
  setFilteredProjects,
  selectedProjectArray,
  checked,
  setChecked,
  setProjectId,
  setPinId,
  projectId,
  pinId,
  setPinData,
}) {
  const [filtersCount, setFiltersCount] = useState(0);

  let filterColor;
  let colorToString = mapDetails?.circles_colors?.toString();
  if (colorToString) {
    filterColor = CssFilterConverter.hexToFilter(colorToString)?.color;
  }
  const onModalClose = () => {
    setFilterOpen(false);
  };
  const handlePrevious = () => {
    setPreviouslatMap({
      lat: map?.getCenter()?.lat(),
      lng: map?.getCenter()?.lng(),
    });
    setPreviousZoomMap(map.getZoom());
  };
  const handleClick = () => {
    setOpen(false);
    setTermsConditions(false);
    setViewProjects(false);
    setCheckboxReset(true);
  };

  const handleFilters = () => {
    setRightSidebar(false);
    setSidebar(false);
    setSidebarOpen(true);
  };
  useEffect(() => {
    setFiltersCount(
      [
        mapDetails?.types,
        mapDetails?.tags,
        mapDetails?.countries,
        mapDetails?.curators,
      ]?.filter(Boolean).length
    );
  }, [mapDetails]);

  return (
    <>
      <ul className="sidebar-main">
        {userInfoData && userInfoData?.name && userInfoData?.role ? (
          <li className="border-bottom  ">
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={<Tooltip>Dashboard</Tooltip>}
            >
              <a
                href={`${process.env.REACT_APP_Base_Url}/maps/${
                  mapDetails?.id ?? 2
                }`}
                className={active === "dashboard" ? "sideactive" : "inactive"}
              >
                <img
                  src={BlocksactiveIcon}
                  alt="img"
                  className={activeIcon ? "activeimg acitve-icon" : "activeimg"}
                  style={
                    active === "dashboard"
                      ? {
                          filter: filterColor,
                        }
                      : {}
                  }
                  onBlur={() => setActiveIcon(false)}
                />
              </a>
            </OverlayTrigger>
          </li>
        ) : (
          <></>
        )}
        <li className="">
          <OverlayTrigger
            placement="right"
            delay={{ show: 100, hide: 200 }}
            overlay={
              active === "home" ? (
                <div className="tooltip-main"></div>
              ) : (
                <Tooltip>Home</Tooltip>
              )
            }
          >
            <NavLink
              onClick={() => {
                handleClick();
                setFilterBy(false);

                setRightSidebar(false);
                setInitialState(true);
                setSidebar(false);
                setSidebarType("home");
                setActiveIcon(true);
                setSidebarOpen(false);
                setActiveMarker(null);
                handlePrevious();
                setTimeout(() => {
                  setCheckboxReset(false);
                  setSidebar(true);
                  setSidebarType(null);
                }, 100);
                setActive("home");
              }}
              className={active === "home" ? "sideactive" : "inactive"}
            >
              <img
                src={HomeactiveIcon}
                alt="img"
                className={activeIcon ? "activeimg acitve-icon" : "activeimg"}
                style={
                  active === "home"
                    ? {
                        filter: filterColor,
                      }
                    : {}
                }
                onBlur={() => setActiveIcon(false)}
              />
            </NavLink>
          </OverlayTrigger>
        </li>
        <li className="">
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={
              active === "map-view" ? (
                <div className="tooltip-main"></div>
              ) : (
                <Tooltip>Map View</Tooltip>
              )
            }
          >
            <NavLink
              onClick={() => {
                setActive("map-view");
                handleClick();
                setFilterBy(false);

                setRightSidebar(false);
                setSidebarOpen(false);
                setActiveMarker(null);
                setSidebarType("world");
                handlePrevious();
              }}
              className={active === "map-view" ? "sideactive" : "inactive"}
            >
              <img
                src={WorldactiveIcon}
                alt="img"
                className={activeIcon ? "activeimg acitve-icon" : "activeimg"}
                onClick={() => setActiveIcon(true)}
                onBlur={() => setActiveIcon(false)}
                style={
                  active === "map-view"
                    ? {
                        filter: filterColor,
                      }
                    : {}
                }
              />
            </NavLink>
          </OverlayTrigger>
        </li>
        <li className="border-bottom">
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={
              active === "previous" ? (
                <div className="tooltip-main"></div>
              ) : (
                <Tooltip>Previous</Tooltip>
              )
            }
          >
            <NavLink
              onClick={() => {
                setActive("previous");
                handleClick();
                setFilterBy(false);

                setRightSidebar(false);
                setSidebarOpen(false);
                setActiveMarker(null);
                setSidebarType("arrow");
                setActiveIcon(true);
                if (previousView) {
                  setSidebarType("home");
                  setTimeout(() => {
                    setSidebarType("arrow");
                  }, 10);
                }
              }}
              className={active === "previous" ? "sideactive" : "inactive"}
            >
              <img
                src={ArrowactiveIcon}
                alt="img"
                className={activeIcon ? "activeimg acitve-icon" : "activeimg"}
                onBlur={() => setActiveIcon(false)}
                style={
                  active === "previous"
                    ? {
                        filter: filterColor,
                      }
                    : {}
                }
              />
            </NavLink>
          </OverlayTrigger>
        </li>
        {mapDetails?.filter_activated === "Yes" ? (
          <>
            {mapDetails?.types === true ? (
              <li className="">
                <OverlayTrigger
                  placement="right"
                  delay={{ show: 250, hide: 400 }}
                  overlay={
                    active === "type" ? (
                      <div className="tooltip-main"></div>
                    ) : (
                      <Tooltip>{mapDetails?.type_name ?? "Type"}</Tooltip>
                    )
                  }
                >
                  <NavLink
                    onClick={() => {
                      setActive("type");
                      handleClick();
                      handleFilters();
                      setSidebarType("type");
                      setFilterName("type");
                      // setActiveMarker("null");
                      setActiveIcon(true);
                      setInitialState(true);
                      setSelectedProjectArray([]);
                      setTimeout(() => {
                        setInitialState(false);
                      }, 200);
                    }}
                    className={active === "type" ? "sideactive" : "inactive"}
                  >
                    <img
                      src={ShapeactiveIcon}
                      alt="img"
                      className={
                        activeIcon ? "activeimg acitve-icon" : "activeimg"
                      }
                      onBlur={() => setActiveIcon(false)}
                      style={
                        active === "type"
                          ? {
                              filter: filterColor,
                            }
                          : {}
                      }
                    />
                  </NavLink>
                </OverlayTrigger>
              </li>
            ) : (
              <></>
            )}
            {mapDetails?.tags === true ? (
              <li>
                <OverlayTrigger
                  placement="right"
                  delay={{ show: 250, hide: 400 }}
                  overlay={
                    active === "tag" ? (
                      <div className="tooltip-main"></div>
                    ) : (
                      <Tooltip>Tags</Tooltip>
                    )
                  }
                >
                  <NavLink
                    onClick={() => {
                      setActive("tag");
                      handleClick();
                      handleFilters();
                      setSidebarType("tag");
                      setFilterName("tag");
                      setActiveIcon(true);
                    }}
                    className={active === "tag" ? "sideactive" : "inactive"}
                  >
                    <img
                      src={TagactiveIcon}
                      alt="img"
                      className={
                        activeIcon ? "activeimg acitve-icon" : "activeimg"
                      }
                      onBlur={() => setActiveIcon(false)}
                      style={
                        active === "tag"
                          ? {
                              filter: filterColor,
                            }
                          : {}
                      }
                    />
                  </NavLink>
                </OverlayTrigger>
              </li>
            ) : (
              <></>
            )}
            {mapDetails?.countries === true ? (
              <li>
                <OverlayTrigger
                  placement="right"
                  delay={{ show: 250, hide: 400 }}
                  overlay={
                    active === "countries" ? (
                      <div className="tooltip-main"></div>
                    ) : (
                      <Tooltip>Countries</Tooltip>
                    )
                  }
                >
                  <NavLink
                    onClick={() => {
                      handleClick();
                      handleFilters();
                      setSidebarType("location");
                      setFilterName("location");
                      setActive("countries");
                      setActiveIcon(true);
                    }}
                    className={
                      active === "countries" ? "sideactive" : "inactive"
                    }
                  >
                    <img
                      src={LocationactiveIcon}
                      alt="img"
                      className={
                        activeIcon ? "activeimg acitve-icon" : "activeimg"
                      }
                      onBlur={() => setActiveIcon(false)}
                      style={
                        active === "countries"
                          ? {
                              filter: filterColor,
                            }
                          : {}
                      }
                    />
                  </NavLink>
                </OverlayTrigger>
              </li>
            ) : (
              <></>
            )}
            {mapDetails?.curators === true ? (
              <li>
                <OverlayTrigger
                  placement="right"
                  delay={{ show: 250, hide: 400 }}
                  overlay={
                    active === "curator" ? (
                      <div className="tooltip-main"></div>
                    ) : (
                      <Tooltip>{mapDetails?.curator_name ?? "Curator"}</Tooltip>
                    )
                  }
                >
                  <NavLink
                    onClick={() => {
                      setActive("curator");
                      handleClick();
                      handleFilters();
                      setSidebarType("curator");
                      setFilterName("curator");
                      setActiveIcon(true);
                    }}
                    className={active === "curator" ? "sideactive" : "inactive"}
                  >
                    <img
                      src={PersonactiveIcon}
                      alt="img"
                      className={
                        activeIcon ? "activeimg acitve-icon" : "activeimg"
                      }
                      onBlur={() => setActiveIcon(false)}
                      style={
                        active === "curator"
                          ? {
                              filter: filterColor,
                            }
                          : {}
                      }
                    />
                  </NavLink>
                </OverlayTrigger>
              </li>
            ) : (
              <></>
            )}
            {mapDetails?.projects === true ? (
              <li>
                <OverlayTrigger
                  placement="right"
                  delay={{ show: 250, hide: 400 }}
                  overlay={
                    active === "filter" ? (
                      <div className="tooltip-main"></div>
                    ) : (
                      <Tooltip>{"Filter"}</Tooltip>
                    )
                  }
                >
                  <NavLink
                    onClick={() => {
                      setActive("filter");
                      handleClick();
                      setRightSidebar(false);
                      setSidebarOpen(false);
                      // handleFilters();
                      setFilterName("curator");
                      setActiveIcon(true);
                      setFilterOpen(true);
                      setSidebar(true);
                      setSidebarType("home");
                    }}
                    className={active === "filter" ? "sideactive" : "inactive"}
                  >
                    <img
                      src={FilterIcon}
                      alt="img"
                      className={
                        activeIcon ? "activeimg acitve-icon" : "activeimg"
                      }
                      onBlur={() => setActiveIcon(false)}
                      style={
                        active === "filter"
                          ? {
                              filter: filterColor,
                            }
                          : {}
                      }
                    />
                  </NavLink>
                </OverlayTrigger>
              </li>
            ) : (
              <></>
            )}
            {mapDetails?.types === true ||
            mapDetails?.tags === true ||
            mapDetails?.countries === true ||
            mapDetails?.curators === true ||
            mapDetails?.projects === true ? (
              <li>
                <OverlayTrigger
                  placement="right"
                  delay={{ show: 250, hide: 400 }}
                  overlay={
                    active === "reset" ? (
                      <div className="tooltip-main"></div>
                    ) : (
                      <Tooltip>{"Reset"}</Tooltip>
                    )
                  }
                >
                  <NavLink
                    onClick={() => {
                      setSidebar(true);
                      setSidebarType("home");
                      setSidebarOpen(false);
                      setActive("");
                      setFilteredProjects([]);
                      setChecked({
                        type: [],
                        tag: [],
                        country: [],
                        curators: [],
                      });
                      setFilterBy(false);
                      setPinData(null);
                      setProjectId(null);
                      setPinId(null);
                      setActiveMarker(null);
                      setSelectedProjectArray([]);
                    }}
                    className={active === "reset" ? "sideactive" : "inactive"}
                  >
                    <img
                      src={ResetIcon}
                      alt="img"
                      className={
                        activeIcon
                          ? "activeimg acitve-icon flip-icon"
                          : "activeimg flip-icon"
                      }
                      onBlur={() => setActiveIcon(false)}
                      style={
                        active === "reset"
                          ? {
                              filter: filterColor,
                            }
                          : {}
                      }
                    />
                  </NavLink>
                </OverlayTrigger>
              </li>
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}
      </ul>
      <MyModal
        className={
          filtersCount === 1
            ? "SmartsFilter1 custom-scrollbar"
            : filtersCount === 2
            ? "SmartsFilter2 custom-scrollbar"
            : filtersCount === 3
            ? "SmartsFilter3 custom-scrollbar"
            : "SmartsFilter custom-scrollbar"
        }
        open={filterOpen}
        onClose={onModalClose}
      >
        <FilterModal
          types={types}
          tags={tags}
          curators={curators}
          countries={countries}
          mapDetails={mapDetails}
          projectsArray={projectsArray}
          filteredProjects={filteredProjects}
          setFilteredProjects={setFilteredProjects}
          setFilterOpen={setFilterOpen}
          checked={checked}
          setChecked={setChecked}
          setActiveIcon={setActive}
          setSelectedProjectArray={setSelectedProjectArray}
          selectedProjectArray={selectedProjectArray}
          setActiveMarker={setActiveMarker}
          setProjectId={setProjectId}
          setPinId={setPinId}
          projectId={projectId}
          pinId={pinId}
          setPinData={setPinData}
          setFilterBy={setFilterBy}
        />
      </MyModal>
    </>
  );
}
