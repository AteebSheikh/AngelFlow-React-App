import React, { useState } from "react";
import Location from "../components/location/location.js";
import Geocode from "react-geocode";

const locationView = ({
  setCurrentCountry,
  setActiveMarker,
  setSelectedProjectArray,
  countries,
  setSidebarOpen,
  sidebarOpen,
  setColorSubType,
  colorSubType,
  imageModal,
  setFilterBy,
}) => {
  const [sidebar, setSidebar] = useState(true);

  Geocode.setApiKey("AIzaSyCiSwHoCr13O6AVKbUSFQ5gjzy7DIlY7Ac");

  // Get latitude & longitude from address.
  const getGeoCode = (name) => {
    setSelectedProjectArray([]);
    Geocode.fromAddress(name).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;

        const obj = {
          lat: lat,
          lng: lng,
        };

        setCurrentCountry([obj]);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  return (
    <>
      <Location
        setActiveMarker={setActiveMarker}
        setSidebar={setSidebar}
        getGeoCode={getGeoCode}
        countries={countries}
        setSidebarOpen={setSidebarOpen}
        sidebarOpen={sidebarOpen}
        setColorSubType={setColorSubType}
        colorSubType={colorSubType}
        imageModal={imageModal}
        setFilterBy={setFilterBy}
      />
    </>
  );
};

export default locationView;
