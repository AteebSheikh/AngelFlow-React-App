import React, { useState } from "react";
import Type from "../components/type/type";

const TypeView = ({
  setSingleTypeArray,
  setSelectedTypeArray,
  selectedTypeArray,
  setSubTypesData,
  setActiveMarker,
  types,
  filterBy,
  setFilterBy,
  checkboxReset,
  setSidebarType,
  setSidebarOpen,
  sidebarOpen,
  colorSubType,
  setColorSubType,
  imageModal,
  setProjectId,
  setPinId,
  setPinData,
  projectId,
  checked,
  setChecked,
  mapDetails,
  map,
  setSelectedProjectArray,
}) => {
  const [sidebar, setSidebar] = useState(true);

  const getfilteredTypes = (e, name, category, id) => {
    const { checked } = e.target;

    if (checked && category === "types") {
      setActiveMarker(null);
      setSingleTypeArray([]);
      setSelectedProjectArray(null);
      types &&
        types?.map((value) => {
          if (value?.name === name && value?.subtypes.length > 0) {
            setSelectedTypeArray((prev) => [...prev, value]);
          }
        });
      setChecked((prev) => [...prev, id]);
    }
    if (!checked && category === "types") {
      // setSubTypesData(false);
      setSelectedTypeArray(
        selectedTypeArray.filter((item) => item?.name !== name)
      );
      setChecked((prev) => {
        const foundIndex = prev.findIndex((item) => item === id);
        prev.splice(foundIndex, 1);
        return [...prev];
      });
      setSelectedProjectArray(null);
      setActiveMarker(null);
    }
    if (category === "sub-types") {
      setSelectedTypeArray([]);

      let newtypearray = [];
      const pointss = types.map((el) => {
        el?.subtypes.map((subItem) => {
          if (subItem.name === name && subItem?.id === id) {
            const obj = {
              id: subItem?.id,
              name: subItem?.name,
              desc: subItem?.desc,
              img: subItem?.img,
              lat: parseFloat(subItem?.latitude),
              lng: parseFloat(subItem?.longitude),
              hex: subItem?.hex,
              address: subItem?.address,
            };
            newtypearray.push(obj);
          }
        });
      });
      setSingleTypeArray([newtypearray[0]]);
    }
  };

  return (
    <>
      <Type
        sampleArray={types}
        getfilteredTypes={getfilteredTypes}
        setSubTypesData={setSubTypesData}
        setSelectedTypeArray={setSelectedTypeArray}
        setSidebar={setSidebar}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
        checkboxReset={checkboxReset}
        setSidebarType={setSidebarType}
        setSidebarOpen={setSidebarOpen}
        sidebarOpen={sidebarOpen}
        setColorSubType={setColorSubType}
        colorSubType={colorSubType}
        imageModal={imageModal}
        setProjectId={setProjectId}
        setPinId={setPinId}
        setPinData={setPinData}
        projectId={projectId}
        checked={checked}
        setChecked={setChecked}
        mapDetails={mapDetails}
      />
    </>
  );
};

export default TypeView;
