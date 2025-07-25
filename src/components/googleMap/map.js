import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, useLoadScript } from "@react-google-maps/api";

const Map = (props) => {
  const [zoom, setZoom] = useState(
    sidebarType === "arrow" ? previousZoomMap : 7
  );

  const {
    setMap,
    children,
    position,
    subTypesData,
    map,
    mapDetails,
    defaultCenter,
    setDefaultCenter,
    sidebarType,
    previousZoomMap,
    previousLatMap,
  } = props;
  const { isLoaded, loadError } = useLoadScript({
    libraries: ["places"],
    googleMapsApiKey: "AIzaSyCiSwHoCr13O6AVKbUSFQ5gjzy7DIlY7Ac",
  });

  const options = {
    disableDefaultUI: true,
    scaleControl: true,
    mapTypeId: "roadmap",
    gestureHandling: "cooperative",
    labels: true,
  };

  let clusterColor = mapDetails?.circles_colors;
  let rgbaCol =
    "rgba(" +
    parseInt(mapDetails?.circles_colors?.slice(-6, -4), 16) +
    "," +
    parseInt(mapDetails?.circles_colors?.slice(-4, -2), 16) +
    "," +
    parseInt(mapDetails?.circles_colors?.slice(-2), 16) +
    "," +
    0.5 +
    ")";

  useEffect(() => {
    if (document && mapDetails && rgbaCol) {
      document.documentElement.style.setProperty("--base", clusterColor);
      document.documentElement.style.setProperty("--border", rgbaCol);
    }
  }, [mapDetails]);

  useEffect(() => {
    if (subTypesData && position?.length === 1) {
      setDefaultCenter(
        {
          lat: parseFloat(position?.[0]?.lat) - 0.00013,
          lng: parseFloat(position?.[0]?.lng),
        }
        // { lat: 51.5072178, lng: 0.1275862 }
      );
      setZoom(18);
    } else {
      setZoom(7);
    }
  }, [subTypesData]);

  useEffect(() => {
    if (sidebarType !== "arrow") setZoom(7);
  }, [sidebarType]);

  useEffect(() => {
    if (sidebarType === "arrow") {
      if (previousZoomMap) map?.setZoom(previousZoomMap ?? 2);
      if (previousLatMap)
        setDefaultCenter({
          lat: previousLatMap?.lat,
          lng: previousLatMap?.lng,
        });
    }
    if (sidebarType === "world") {
      setZoom(1.8);
      setDefaultCenter({
        lat: 20.612734,
        lng: 40.230178,
      });
    } else {
      if (sidebarType !== "arrow" && sidebarType !== "dashboard") {
        setZoom(2);
      }
    }
  }, [sidebarType]);
  const renderMap = () => {
    const loadHandler = (map) => {
      setMap(map);
    };

    return (
      <div className="map-content">
        <GoogleMap
          id="circle-example"
          mapContainerStyle={{
            height: "100%",
          }}
          zoom={sidebarType === "arrow" ? previousZoomMap : zoom}
          center={defaultCenter}
          options={options}
          onLoad={loadHandler}
          defaultOptions={{ disableDefaultUI: true, gestureHandling: true }}
        >
          {children}
        </GoogleMap>
      </div>
    );
  };

  if (loadError) {
    return <></>;
  }

  return isLoaded ? renderMap() : <></>;
};
export default React.memo(Map);
