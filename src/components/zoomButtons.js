import React from "react";
import ZoomIn from "../assets/images/zoom-in.svg";
import ZoomOut from "../assets/images/zoom-out.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { GoPlus } from "react-icons/go";
const ZoomButtons = ({ map }) => {
  const handleZoom = (type) => {
    if (map) var currentZoomLevel = map?.getZoom();
    if (type === "in") {
      map?.setZoom(currentZoomLevel + 1);
    }
    if (type === "out") {
      map?.setZoom(currentZoomLevel - 1);
    }
  };

  return (
    <div className="zoom-buttons">
      <div className="zoom_in" onClick={() => handleZoom("in")}>
        {" "}
        <FontAwesomeIcon icon={faPlus} />
        {/* <GoPlus /> */}
      </div>
      <div className="zoom_out" onClick={() => handleZoom("out")}>
        <FontAwesomeIcon icon={faMinus} />
      </div>
    </div>
  );
};
export default ZoomButtons;
