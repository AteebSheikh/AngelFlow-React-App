import React, { useState, useEffect } from "react";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import { SidebarAnt } from "../components/sidebar/sidebar";
import "../assets/scss/index.scss";
import MapContainer from "../components/googleMap/mapContainer";
import SidebarData from "../components/sidebar/sidebarData";
import RightSidebar from "../components/rightSidebar/rightSidebar";
import ZoomButtons from "../components/zoomButtons.js";
import { requestOptions } from "../configs";

const Layout = ({
  sidebar,
  setSidebar,
  projectFilter,
  setInitialState,
  subTypesData,
  selectedProjectArray,
  setSelectedProjectArray,
  projectsArray,
  setSubTypesData,
  singleTagArray,
  setSingleTagArray,
  selectedTagArray,
  setSelectedTagArray,
  activeMarker,
  setActiveMarker,
  singleTypeArray,
  setSingleTypeArray,
  selectedTypeArray,
  setSelectedTypeArray,
  setCurrentCountry,
  currentCountry,
  setSingleCuratorArray,
  singleCuratorArray,
  setSelectedCuratorArray,
  selectedCuratorArray,
  filterBy,
  setFilterBy,
  setSidebarType,
  sidebarType,
  setSidebarOpen,
  sidebarOpen,
  open,
  setOpen,
  viewProject,
  setViewProjects,
  termsConditions,
  setTermsConditions,
  setActive,
  active,
  newProject,
  setNewProject,
  mapId,
  checkboxReset,
  setCheckboxReset,
  colorSubType,
  setColorSubType,
  mapDetails,
  types,
  tags,
  curators,
  countries,
  pinData,
  pinId,
  setPinId,
  projectId,
  setProjectId,
  setPinData,
  setFilterOpen,
  filterOpen,
  checked,
  setChecked,
  filteredProjects,
  setFilteredProjects,
}) => {
  const [country, setCountry] = useState(true);
  const [rightSidebar, setRightSidebar] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [filterName, setFilterName] = useState("");
  const [activeIcon, setActiveIcon] = useState(false);
  const [pinCenter, setPinCenter] = useState(false);
  const [previousView, setPreviousView] = useState(true);
  const [previousZoomMap, setPreviousZoomMap] = useState(null);
  const [previousLatMap, setPreviouslatMap] = useState({});
  const [userInfoData, setUserInfoData] = useState({});
  const [map, setMap] = useState(null);
  const [defaultCenter, setDefaultCenter] = useState({
    lat: 38.612734,
    lng: 77.231178,
  });
  const user_info = localStorage.getItem("maps-cokkies");

  useEffect(() => {
    if (sidebar && sidebarType !== "arrow" && sidebarType !== "dashboard") {
      setSelectedTypeArray([]);
      setSingleTypeArray([]);
      setSelectedTagArray([]);
      setSingleTagArray([]);
      setSelectedProjectArray([]);
      setCurrentCountry([]);
      setSelectedCuratorArray([]);
      setSingleCuratorArray([]);
      setCountry(false);
      setFilteredProjects([]);
      setChecked({
        type: [],
        tag: [],
        country: [],
        curators: [],
      });
    }
  }, [sidebar]);

  useEffect(() => {
    if (
      sidebarType !== "dashboard" &&
      sidebarType !== "arrow" &&
      sidebarType !== "world" &&
      sidebarType !== null
    ) {
      setSelectedTypeArray([]);
      setSingleTypeArray([]);
      setSelectedTagArray([]);
      setSingleTagArray([]);
      setSelectedProjectArray([]);
      setCurrentCountry([]);
      setSelectedCuratorArray([]);
      setSingleCuratorArray([]);
      setActiveMarker(null);
      setCountry(false);
      setPinData(null);
      setProjectId(null);
      setFilteredProjects([]);
      setChecked({
        type: [],
        tag: [],
        country: [],
        curators: [],
      });
    }

    if (
      sidebarType === "world" &&
      (selectedCuratorArray?.length > 0 ||
        selectedTagArray?.length > 0 ||
        selectedTypeArray?.length > 0 ||
        singleCuratorArray?.length > 0 ||
        singleTagArray?.length > 0 ||
        singleTypeArray?.length > 0 ||
        currentCountry?.length > 0)
    ) {
      setSelectedTypeArray([]);
      setSingleTypeArray([]);
      setSelectedTagArray([]);
      setSingleTagArray([]);
      setCurrentCountry([]);
      setSelectedCuratorArray([]);
      setSingleCuratorArray([]);
      setActiveMarker(null);
      setPinData(null);
      setProjectId(null);
    }
    if (sidebarType === "arrow") {
      setPinData(null);
      setProjectId(null);
    }
  }, [sidebarType]);

  const getUserInfo = () => {
    fetch(
      `${process.env.REACT_APP_Base_Url}/api/v1/user_info?session_id=${user_info}&map_id=${mapId}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        const res = JSON.parse(result);
        if (
          (user_info === "" || user_info === null) &&
          res?.data?.public_view === "Inactive"
        ) {
          window.location.replace(
            `${process.env.REACT_APP_Base_Url}/shared/not_accessible?map_id=${mapId}`
          );
        }
        setUserInfoData(res.data);
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <div className="container-fluid g-0">
        <Header mapDetails={mapDetails} userInfoData={userInfoData} />
        {projectFilter}
        <div className="main">
          <SidebarAnt
            setInitialState={setInitialState}
            userInfoData={userInfoData}
            types={types}
            tags={tags}
            curators={curators}
            countries={countries}
            setSidebar={setSidebar}
            sidebarType={sidebarType}
            setSidebarType={setSidebarType}
            setActiveMarker={setActiveMarker}
            setSidebarOpen={setSidebarOpen}
            setOpen={setOpen}
            setViewProjects={setViewProjects}
            setTermsConditions={setTermsConditions}
            setFilterBy={setFilterBy}
            setActive={setActive}
            active={active}
            setRightSidebar={setRightSidebar}
            setCheckboxReset={setCheckboxReset}
            mapDetails={mapDetails}
            setFilterName={setFilterName}
            setActiveIcon={setActiveIcon}
            activeIcon={activeIcon}
            previousView={previousView}
            setSelectedProjectArray={setSelectedProjectArray}
            selectedProjectArray={selectedProjectArray}
            previousZoomMap={previousZoomMap}
            setPreviousZoomMap={setPreviousZoomMap}
            previousLatMap={previousLatMap}
            setPreviouslatMap={setPreviouslatMap}
            setFilterOpen={setFilterOpen}
            filterOpen={filterOpen}
            map={map}
            setMap={setMap}
            projectsArray={projectsArray}
            filteredProjects={filteredProjects}
            setFilteredProjects={setFilteredProjects}
            checked={checked}
            setChecked={setChecked}
            filterBy={filterBy}
            setProjectId={setProjectId}
            setPinId={setPinId}
            projectId={projectId}
            pinId={pinId}
            setPinData={setPinData}
          />
          {sidebarType === "type" ||
          sidebarType === "tag" ||
          sidebarType === "location" ||
          sidebarType === "curator" ? (
            <SidebarData
              sidebarType={sidebarType}
              selectedTypeArray={selectedTypeArray}
              setSelectedTypeArray={setSelectedTypeArray}
              setSingleTypeArray={setSingleTypeArray}
              setSelectedTagArray={setSelectedTagArray}
              setSingleTagArray={setSingleTagArray}
              selectedTagArray={selectedTagArray}
              setSubTypesData={setSubTypesData}
              setCurrentCountry={setCurrentCountry}
              setSelectedProjectArray={setSelectedProjectArray}
              setSingleCuratorArray={setSingleCuratorArray}
              setSelectedCuratorArray={setSelectedCuratorArray}
              selectedCuratorArray={selectedCuratorArray}
              setActiveMarker={setActiveMarker}
              types={types}
              tags={tags}
              curators={curators}
              countries={countries}
              filterBy={filterBy}
              setFilterBy={setFilterBy}
              setSidebarType={setSidebarType}
              setSidebarOpen={setSidebarOpen}
              sidebarOpen={sidebarOpen}
              setCheckboxReset={setCheckboxReset}
              checkboxReset={checkboxReset}
              setColorSubType={setColorSubType}
              colorSubType={colorSubType}
              imageModal={imageModal}
              setProjectId={setProjectId}
              setPinId={setPinId}
              setPinData={setPinData}
              projectId={projectId}
              mapDetails={mapDetails}
              map={map}
            />
          ) : (
            <></>
          )}
          <div
            className={sidebarOpen ? "main-content-sidebar" : "main-content"}
          >
            <MapContainer
              sidebarType={sidebarType}
              mapDetails={mapDetails}
              subTypesData={subTypesData}
              setSubTypesData={setSubTypesData}
              countryFilter={country}
              sidebar={sidebar}
              rightSidebar={rightSidebar}
              setRightSidebar={setRightSidebar}
              setSidebarOpen={setSidebarOpen}
              setFilterBy={setFilterBy}
              setActive={setActive}
              setSidebarType={setSidebarType}
              pinCenter={pinCenter}
              setPinCenter={setPinCenter}
              setPreviousView={setPreviousView}
              projectId={projectId}
              pinData={pinData}
              pinId={pinId}
              setPinId={setPinId}
              projects={
                singleTypeArray?.length > 0
                  ? singleTypeArray
                  : selectedTypeArray?.length > 0
                  ? selectedTypeArray
                  : singleTagArray?.length > 0
                  ? singleTagArray
                  : selectedTagArray?.length > 0
                  ? selectedTagArray
                  : singleCuratorArray?.length > 0
                  ? singleCuratorArray
                  : selectedCuratorArray?.length > 0
                  ? selectedCuratorArray
                  : filteredProjects?.length > 0
                  ? filteredProjects
                  : (checked?.type?.length > 0 ||
                      checked?.tag?.length > 0 ||
                      checked?.country?.length > 0 ||
                      checked?.curators?.length > 0) &&
                    filteredProjects
                  ? filteredProjects
                  : projectsArray
              }
              selectedProjectArray={selectedProjectArray}
              setSelectedProjectArray={setSelectedProjectArray}
              setSelectedTypeArray={setSelectedTypeArray}
              setActiveMarker={setActiveMarker}
              activeMarker={activeMarker}
              country={currentCountry}
              setProjectId={setProjectId}
              previousZoomMap={previousZoomMap}
              setPreviousZoomMap={setPreviousZoomMap}
              previousLatMap={previousLatMap}
              setPreviouslatMap={setPreviouslatMap}
              map={map}
              setMap={setMap}
              defaultCenter={defaultCenter}
              setDefaultCenter={setDefaultCenter}
            />

            <Footer
              mapDetail={mapDetails}
              setSidebarOpen={setSidebarOpen}
              setFilterBy={setFilterBy}
              open={open}
              setOpen={setOpen}
              viewProject={viewProject}
              setViewProjects={setViewProjects}
              termsConditions={termsConditions}
              setTermsConditions={setTermsConditions}
              setProjectId={setProjectId}
              projectId={projectId}
              setRightSidebar={setRightSidebar}
              newProject={newProject}
              setNewProject={setNewProject}
              projectsArray={projectsArray}
              types={types}
              tags={tags}
              curators={curators}
              userInfoData={userInfoData}
            />
          </div>
          {rightSidebar ? (
            <RightSidebar
              setRightSidebar={setRightSidebar}
              rightSidebar={rightSidebar}
              projectId={projectId}
              setImageModal={setImageModal}
              imageModal={imageModal}
              setPinCenter={setPinCenter}
              mapDetails={mapDetails}
            />
          ) : (
            <></>
          )}
          <ZoomButtons map={map} />
        </div>
      </div>
    </>
  );
};
export default Layout;
