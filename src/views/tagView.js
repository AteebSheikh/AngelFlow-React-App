import React, { useState } from "react";
import Tag from "../components/tag/tag";

const TagView = ({
  selectedTagArray,
  setSelectedTagArray,
  setSingleTagArray,
  setSubTypesData,
  setActiveMarker,
  setSelectedProjectArray,
  tags,
  filterBy,
  setFilterBy,
  checkboxReset,
  setSidebarOpen,
  sidebarOpen,
  colorSubType,
  setColorSubType,
  imageModal,
  setProjectId,
  setPinId,
  setPinData,
  projectId,
  setChecked,
  checked,
}) => {
  const [sidebar, setSidebar] = useState(true);

  const getfilteredTags = (e, name, category, id) => {
    const { checked } = e.target;

    if (checked && category === "types") {
      setActiveMarker(null);
      setSelectedProjectArray(null);

      setSingleTagArray([]);
      tags?.map((value) => {
        if (value?.name === name && value?.subtypes.length > 0) {
          setSelectedTagArray((prev) => [...prev, value]);
        }
      });
      setChecked((prev) => [...prev, name]);
    }
    if (!checked && category === "types") {
      setSelectedTagArray(
        selectedTagArray.filter((item) => item?.name !== name)
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
      setSelectedTagArray([]);

      let newtypearray = [];
      const subTags = tags?.filter((item) => item?.name !== name);
      const pointss = subTags?.map((el) => {
        el?.subtypes.map((subItem) => {
          if (subItem?.id === id) {
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
      setSingleTagArray([newtypearray[0]]);
    }
  };
  return (
    <>
      <Tag
        sampleArray={tags}
        getfilteredTags={getfilteredTags}
        setSubTypesData={setSubTypesData}
        setSidebar={setSidebar}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
        checkboxReset={checkboxReset}
        setSidebarOpen={setSidebarOpen}
        sidebarOpen={sidebarOpen}
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
    </>
  );
};

export default TagView;
