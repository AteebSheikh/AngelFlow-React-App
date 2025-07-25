import React, { useState, useEffect } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import SearchSvg from "../../assets/images/search.svg";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import locationIcon from "../../assets/images/location_icon.svg";

const Curator = ({
  setSidebar,
  sampleArray,
  getfilteredCurators,
  setSubTypesData,
  filterBy,
  setFilterBy,
  checkboxReset,
  setSidebarOpen,
  sidebarOpen,
  setColorSubType,
  colorSubType,
  imageModal,
  setProjectId,
  setPinId,
  setPinData,
  projectId,
  setChecked,
  checked,
  mapDetails,
}) => {
  const [curatorData, setCuratorData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectSubType, setSelectSubType] = useState({});
  const [booleanValue, setBooleanValue] = useState(true);

  const handleModalBox = () => {
    setSubTypesData(false);

    setTimeout(() => {
      setSubTypesData(true);
    }, 100);
  };

  const handlefieldClick = (e) => {
    if (e.stopPropagation) {
      e.stopPropagation();
    }
    setSubTypesData(false);
    setColorSubType(false);
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    const searchList = sampleArray.filter((item) => {
      return (
        item?.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 &&
        item?.category === "curators"
      );
    });

    setCuratorData(searchList);
  };

  useEffect(() => {
    if (sampleArray && booleanValue) {
      setBooleanValue(false);
      setCuratorData(sampleArray);
    }
  }, [sampleArray]);

  useEffect(() => {
    if (!filterBy || checkboxReset) {
      // setChecked([]);
    }
  }, [filterBy, checkboxReset]);

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
        <div className="">
          <div className="sidebar-search-component">
            <input
              type="text"
              placeholder={`Search by ${mapDetails?.curator_name ?? "Curator"}`}
              value={searchQuery}
              onChange={(e) => handleSearch(e)}
            />
            <span>
              <img src={SearchSvg} alt="" />{" "}
            </span>
          </div>
          <div className="accordian-wrapper">
            {curatorData?.map((item, idx) => {
              return (
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <div>
                        <span className="check-box">
                          <Form.Check
                            type="checkbox"
                            onChange={(e) => {
                              getfilteredCurators(e, item?.name, "types");
                              setProjectId(null);
                            }}
                            checked={checked?.includes(item?.name)}
                            onClick={(e) => {
                              handlefieldClick(e);
                            }}
                          />
                        </span>
                        <span className="accordian-heading">{item?.name}</span>
                        <div className="filter-counts">
                          <span className="tag-counting">{item?.count}</span>
                        </div>
                      </div>
                      <div>
                        <span className="accordian-tag"></span>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body className="p-0">
                      {item?.subtypes?.map((subitem, idx) => {
                        return (
                          <div
                            className="accordion-content"
                            onClick={(e) => {
                              setFilterBy(false);
                              if (projectId != subitem?.id) {
                                setPinData(null);
                                setProjectId(null);
                                setTimeout(() => {
                                  setProjectId(subitem?.id);
                                  setPinId(subitem?.id);
                                }, 100);
                                handleModalBox(subitem?.id);
                                getfilteredCurators(
                                  e,
                                  subitem?.name,
                                  "sub-types",
                                  subitem?.id
                                );
                                setColorSubType(true);
                                setSelectSubType({
                                  index: idx,
                                  subTypeName: subitem?.name,
                                });
                                setChecked([]);
                              }
                            }}
                          >
                            <span
                              className={`${
                                idx == selectSubType.index &&
                                selectSubType.subTypeName == subitem?.name &&
                                colorSubType
                                  ? "accordion-subtype-title"
                                  : "accordion-subItem"
                              }`}
                            >
                              <img src={locationIcon} />
                            </span>
                            <span
                              key={idx}
                              className={`${
                                idx == selectSubType.index &&
                                selectSubType.subTypeName == subitem?.name &&
                                colorSubType === true
                                  ? "accordion-subtype-title"
                                  : "accordion-subItem"
                              }`}
                            >
                              {subitem?.name}
                            </span>
                          </div>
                        );
                      })}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Curator;
