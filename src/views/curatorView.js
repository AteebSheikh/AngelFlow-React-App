import React, { useState } from "react";
import Curator from "../components/curators/curators";

const CuratorView = ({
  selectedCuratorArray,
  setSelectedCuratorArray,
  setSingleCuratorArray,
  setActiveMarker,
  setSelectedProjectArray,
  curators,
  setSubTypesData,
  filterBy,
  setFilterBy,
  checkboxReset,
  setCheckboxReset,
  setSidebarOpen,
  sidebarOpen,
  setColorSubType,
  colorSubType,
  imageModal,
  setProjectId,
  setPinId,
  setPinData,
  projectId,
  checked,
  setChecked,
  mapDetails,
}) => {
  const [sidebar, setSidebar] = useState(true);

  const getfilteredCurators = (e, name, category, id) => {
    const { checked } = e.target;
    if (checked && category === "types") {
      setSelectedProjectArray(null);
      setActiveMarker(null);
      setSingleCuratorArray([]);
      curators?.map((value) => {
        if (value?.name === name && value?.subtypes.length > 0) {
          setSelectedCuratorArray((prev) => [...prev, value]);
        }
      });
      setChecked((prev) => [...prev, name]);
    }
    if (!checked && category === "types") {
      setSelectedCuratorArray(
        selectedCuratorArray.filter((item) => item?.name !== name)
      );
      setChecked((prev) => {
        const foundIndex = prev.findIndex((item) => item === name);
        prev.splice(foundIndex, 1);
        return [...prev];
      });
      setSelectedProjectArray(null);
      setActiveMarker(null);
    }
    if (category === "sub-types") {
      setSelectedCuratorArray([]);
      let newrray = [];
      const pointss = curators?.map((el) => {
        el?.subtypes.map((subItem) => {
          if (subItem.name === name && subItem?.id === id) {
            const obj = {
              id: subItem?.id,
              name: subItem?.name,
              desc: subItem?.desc,
              img: subItem?.img,
              lat: parseFloat(subItem?.latitude),
              lng: parseFloat(subItem?.longitude),
              address: subItem?.address,
            };
            newrray?.push(obj);
          }
        });
      });
      setSingleCuratorArray([newrray[0]]);
    }
  };

  return (
    <>
      <Curator
        sampleArray={curators}
        getfilteredCurators={getfilteredCurators}
        setSubTypesData={setSubTypesData}
        sidebar={sidebar}
        setSidebar={setSidebar}
        setFilterBy={setFilterBy}
        filterBy={filterBy}
        checkboxReset={checkboxReset}
        setCheckboxReset={setCheckboxReset}
        setSidebarOpen={setSidebarOpen}
        sidebarOpen={sidebarOpen}
        setSingleCuratorArray={setSingleCuratorArray}
        setSelectedCuratorArray={setSelectedCuratorArray}
        setColorSubType={setColorSubType}
        colorSubType={colorSubType}
        imageModal={imageModal}
        setProjectId={setProjectId}
        setPinId={setPinId}
        setPinData={setPinData}
        projectId={projectId}
        setChecked={setChecked}
        checked={checked}
        mapDetails={mapDetails}
      />
    </>
  );
};

export default CuratorView;
