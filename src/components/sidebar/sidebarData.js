import React, { useEffect, useState } from "react";
import TypeView from "../../views/typeView";
import TagView from "../../views/tagView";
import LocationView from "../../views/locationView";
import CuratorView from "../../views/curatorView";

const SidebarData = ({
  sidebar,
  sidebarType,
  types,
  tags,
  curators,
  countries,
  setSingleTypeArray,
  setSelectedTypeArray,
  selectedTypeArray,
  setSingleTagArray,
  setSelectedTagArray,
  selectedTagArray,
  setSubTypesData,
  setCurrentCountry,
  setSelectedProjectArray,
  setSelectedCuratorArray,
  selectedCuratorArray,
  setSingleCuratorArray,
  setActiveMarker,
  filterBy,
  setFilterBy,
  setSidebarType,
  setSidebarOpen,
  sidebarOpen,
  checkboxReset,
  setCheckboxReset,
  colorSubType,
  setColorSubType,
  imageModal,
  setProjectId,
  setPinId,
  setPinData,
  projectId,
  mapDetails,
  map,
}) => {
  const [checked, setChecked] = useState([]);
  useEffect(() => {
    setCheckboxReset(true);
    setChecked([]);
  }, [sidebarType]);

  useEffect(() => {
    if (sidebar) {
      setSelectedTypeArray([]);
      setSingleTypeArray([]);
      setSelectedTagArray([]);
      setSingleTagArray([]);
      setSelectedProjectArray([]);
      setCurrentCountry([]);
      setChecked([]);
      setCheckboxReset(true);
    }
  }, [sidebar]);
  return (
    <div>
      {sidebarType === "type" ? (
        <TypeView
          selectedTypeArray={selectedTypeArray}
          setSelectedTypeArray={setSelectedTypeArray}
          setSingleTypeArray={setSingleTypeArray}
          setSubTypesData={setSubTypesData}
          setActiveMarker={setActiveMarker}
          types={types}
          filterBy={filterBy}
          setFilterBy={setFilterBy}
          checkboxReset={checkboxReset}
          setSidebarType={setSidebarType}
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
          sidebar={sidebar}
          colorSubType={colorSubType}
          setColorSubType={setColorSubType}
          imageModal={imageModal}
          setProjectId={setProjectId}
          setPinId={setPinId}
          setPinData={setPinData}
          projectId={projectId}
          setChecked={setChecked}
          checked={checked}
          mapDetails={mapDetails}
          map={map}
          setSelectedProjectArray={setSelectedProjectArray}
        />
      ) : sidebarType === "tag" ? (
        <TagView
          selectedTagArray={selectedTagArray}
          setSelectedTagArray={setSelectedTagArray}
          setSingleTagArray={setSingleTagArray}
          setSubTypesData={setSubTypesData}
          setActiveMarker={setActiveMarker}
          setSelectedProjectArray={setSelectedProjectArray}
          filterBy={filterBy}
          setFilterBy={setFilterBy}
          tags={tags}
          checkboxReset={checkboxReset}
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
          sidebar={sidebar}
          colorSubType={colorSubType}
          setColorSubType={setColorSubType}
          imageModal={imageModal}
          setProjectId={setProjectId}
          setPinId={setPinId}
          setPinData={setPinData}
          projectId={projectId}
          setChecked={setChecked}
          checked={checked}
        />
      ) : sidebarType === "location" ? (
        <LocationView
          setCurrentCountry={setCurrentCountry}
          setActiveMarker={setActiveMarker}
          setSelectedProjectArray={setSelectedProjectArray}
          countries={countries}
          setCheckboxReset={setCheckboxReset}
          checkboxReset={checkboxReset}
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
          sidebar={sidebar}
          colorSubType={colorSubType}
          setColorSubType={setColorSubType}
          imageModal={imageModal}
          setFilterBy={setFilterBy}
        />
      ) : sidebarType === "curator" ? (
        <CuratorView
          selectedCuratorArray={selectedCuratorArray}
          setSelectedCuratorArray={setSelectedCuratorArray}
          setSingleCuratorArray={setSingleCuratorArray}
          setSubTypesData={setSubTypesData}
          setActiveMarker={setActiveMarker}
          setSelectedProjectArray={setSelectedProjectArray}
          curators={curators}
          filterBy={filterBy}
          setFilterBy={setFilterBy}
          setCheckboxReset={setCheckboxReset}
          checkboxReset={checkboxReset}
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
          sidebar={sidebar}
          colorSubType={colorSubType}
          setColorSubType={setColorSubType}
          imageModal={imageModal}
          setProjectId={setProjectId}
          setPinId={setPinId}
          setPinData={setPinData}
          projectId={projectId}
          setChecked={setChecked}
          checked={checked}
          mapDetails={mapDetails}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default SidebarData;
