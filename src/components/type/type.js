import React, { useState, useEffect, useRef } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import SearchSvg from "../../assets/images/search.svg";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import locationIcon from "../../assets/images/location_icon.svg";

const Type = ({
  setSidebar,
  sampleArray,
  getfilteredTypes,
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
  checked,
  setChecked,
  mapDetails,
  setSelectedTypeArray,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const ref = useRef([]);
  const [selectSubType, setSelectSubType] = useState({});
  const [typeData, setTypeData] = useState([]);

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
    setColorSubType(false);
    setSubTypesData(false);
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    const searchList =
      sampleArray &&
      sampleArray.filter((item) => {
        return (
          item?.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 &&
          item?.category === "type"
        );
      });

    setTypeData(searchList);
  };

  useEffect(() => {
    const sortedTypes = sampleArray.map((item, idx) => {
      return item?.subtypes?.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    });
    setTypeData(sampleArray);
  }, [sampleArray]);

  useEffect(() => {
    if (!filterBy || checkboxReset) {
      // setChecked([])
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
              setTimeout(() => {
                // setFilterBy(false);
              }, 100);
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
              placeholder={`Search by ${mapDetails?.type_name ?? "Type"}`}
              value={searchQuery}
              onChange={(e) => handleSearch(e)}
            />
            <span>
              <img src={SearchSvg} alt="" />{" "}
            </span>
          </div>
          <div className="accordian-wrapper">
            {typeData?.map((item, idx) => {
              return (
                <Accordion
                // defaultActiveKey="0"
                >
                  <Accordion.Item eventKey={idx}>
                    <Accordion.Header>
                      <div>
                        <span className="check-box">
                          <Form.Check
                            key={idx}
                            type="checkbox"
                            onChange={(e) => {
                              getfilteredTypes(
                                e,
                                item?.name,
                                "types",
                                item?.id
                              );
                              setProjectId(null);
                            }}
                            checked={checked?.includes(item?.id)}
                            onClick={(e) => handlefieldClick(e)}
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

                                handleModalBox();
                                setColorSubType(true);
                                getfilteredTypes(
                                  e,
                                  subitem?.name,
                                  "sub-types",
                                  subitem?.id
                                );
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
                              onClick={() => {
                                setSelectedTypeArray([]);
                                setFilterBy(false);
                              }}
                              key={idx}
                              className={`${
                                idx == selectSubType.index &&
                                selectSubType.subTypeName == subitem?.name &&
                                colorSubType
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

export default Type;
