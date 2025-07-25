import React, { useEffect, useState } from "react";
import { InfoWindow, Marker, MarkerClusterer } from "@react-google-maps/api";
import Map from "./map";
import Sample from "../../assets/images/dummy-image.jpg";
const MapContainer = ({
  projects,
  subTypesData,
  country,
  activeMarker,
  setActiveMarker,
  countryFilter,
  sidebar,
  setRightSidebar,
  mapDetails,
  sidebarType,
  setProjectId,
  rightSidebar,
  setActive,
  selectedProjectArray,
  setSidebarOpen,
  setPinCenter,
  pinCenter,
  setSidebarType,
  setPreviousView,
  projectId,
  pinId,
  setPinId,
  pinData,
  previousLatMap,
  setPreviouslatMap,
  previousZoomMap,
  setPreviousZoomMap,
  map,
  setMap,
  defaultCenter,
  setDefaultCenter,
}) => {
  let arr = [];
  let cluster_zoom;
  let cluster_center;
  const [locs, setLocs] = useState(arr);
  const [isClick, setClick] = useState(false);

  const [pinHover, setPinHover] = useState(false);
  const [pinHoverId, setPinHoverId] = useState(null);

  const pointss = projects?.map((el) => {
    if (!el?.subtypes) {
      const obj = {
        id: el?.id,
        name: el?.name,
        desc: el?.desc,
        lat: parseFloat(el?.latitude != undefined ? el?.latitude : el?.lat),
        lng: parseFloat(el?.longitude != undefined ? el?.longitude : el?.lng),
        hex: el?.hex,
        address: el?.address,
      };
      arr.push(obj);
    } else {
      el?.subtypes?.map((item) => {
        const obj = {
          id: item?.id,
          name: item?.name,
          desc: item?.desc,
          lat: parseFloat(item?.latitude),
          lng: parseFloat(item?.longitude),
          hex: item?.hex,
          address: item?.address,
        };
        arr.push(obj);
      });
    }
  });

  const handleActiveMarker = (marker, e) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const mapFitBounds = () => {
    if (!map || sidebarType === "arrow") return;
    const bounds = new window.google.maps.LatLngBounds();
    if (country?.length > 0) {
      country?.map((loc) => {
        bounds.extend(
          new window.google.maps.LatLng(
            parseFloat(loc?.lat),
            parseFloat(loc?.lng)
          )
        );
      });
    } else if (selectedProjectArray?.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(
        new window.google.maps.LatLng(
          parseFloat(selectedProjectArray?.[0]?.latitude),
          parseFloat(selectedProjectArray?.[0]?.longitude)
        )
      );
      setDefaultCenter({
        lat: parseFloat(selectedProjectArray?.[0]?.latitude) - 0.00008,
        lng: parseFloat(selectedProjectArray?.[0]?.longitude),
      });
      map.setZoom(18);
      setActiveMarker(selectedProjectArray?.[0]?.id);
    } else {
      locs?.map((loc) => {
        bounds?.extend(
          new window.google.maps.LatLng(
            parseFloat(loc?.lat),
            parseFloat(loc?.lng)
          )
        );
      });
    }
    map.fitBounds(bounds);
    if (country?.length > 0) {
      map.setZoom(5);
    }
    if (selectedProjectArray?.length > 0) {
      map?.setZoom(18);
    }
  };

  useEffect(() => {
    if (selectedProjectArray?.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(
        new window.google.maps.LatLng(
          parseFloat(selectedProjectArray?.[0]?.latitude),
          parseFloat(selectedProjectArray?.[0]?.longitude)
        )
      );
      setDefaultCenter({
        lat: parseFloat(selectedProjectArray?.[0]?.latitude) - 0.00008,
        lng: parseFloat(selectedProjectArray?.[0]?.longitude),
      });
      map.setZoom(18);
      setActiveMarker(selectedProjectArray?.[0]?.id);
    }
  }, [selectedProjectArray]);
  useEffect(() => {
    const unique = arr?.filter(
      (obj, index) => arr?.findIndex((item) => item?.id === obj?.id) === index
    );
    setLocs(unique);
  }, [projects]);

  useEffect(() => {
    if (rightSidebar) {
      setDefaultCenter({
        lat: defaultCenter?.lat,
        lng: defaultCenter?.lng + 0.001,
      });
    }

    if (pinCenter) {
      setDefaultCenter({
        lat: defaultCenter?.lat,
        lng: defaultCenter?.lng - 0.001,
      });
      setPinCenter(false);
    }
    if (rightSidebar && pinCenter)
      setDefaultCenter({
        lat: defaultCenter?.lat,
        lng: defaultCenter?.lng + 0.001,
      });
  }, [rightSidebar]);

  useEffect(() => {
    if (map && !(sidebarType === "world" && sidebarType === "arrow")) {
      mapFitBounds();
    }
  }, [map, locs, isClick, country, countryFilter]);

  useEffect(() => {
    if (subTypesData === true) {
      setActiveMarker(arr?.[0]?.id);
    }
  }, [subTypesData]);

  useEffect(() => {
    if (
      previousLatMap.lat === defaultCenter.lat &&
      previousLatMap.lng === defaultCenter.lng
    ) {
      setPreviousView(false);
    } else {
      setPreviousView(true);
    }
  }, [defaultCenter]);

  return (
    <>
      <Map
        setDefaultCenter={setDefaultCenter}
        defaultCenter={defaultCenter}
        center={defaultCenter}
        mapDetails={mapDetails}
        setMap={setMap}
        map={map}
        subTypesData={subTypesData}
        position={locs ?? []}
        sidebar={sidebar}
        className="map-cutsom"
        previousZoomMap={previousZoomMap}
        previousLatMap={previousLatMap}
        sidebarType={sidebarType}
      >
        <MarkerClusterer
          styles={[
            {
              width: 60,
              height: 60,
              textColor: `${mapDetails?.text_color}`,
            },
          ]}
          onClick={(e) => {
            cluster_zoom = map.getZoom();
            cluster_center = map.getCenter();
            if (sidebarType === "arrow") setSidebarType(null);
            setPreviouslatMap({
              lat: cluster_center.lat(),
              lng: cluster_center.lng(),
            });
            // setSidebarOpen(false);
            setPreviousZoomMap(cluster_zoom);
            // setActive("");
            setClick(true);
          }}
        >
          {(clusterer) =>
            locs?.map((loc, idx) => (
              <Marker
                key={loc?.id}
                className="hover-pin"
                clusterer={clusterer}
                icon={{
                  path: "M24 4c-7.73 0-14 6.27-14 14 0 10.5 14 26 14 26s14-15.5 14-26c0-7.73-6.27-14-14-14zm0 19c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z",
                  fillColor: loc?.hex,
                  strokeColor: loc?.hex,
                  fillOpacity: 1,
                  strokeWeight: 0,
                  rotation: 0,
                  scale: pinId == loc?.id && pinHover ? 1 : 0.8,
                  anchor: new google.maps.Point(25, 40),
                }}
                // title={loc?.name}
                onMouseOver={(e) => {
                  setPinId(loc?.id);
                  setPinHover(true);
                  setPinHoverId(loc?.id);
                }}
                onMouseOut={(e) => {
                  setPinId(null);
                  setPinHover(false);
                  setPinHoverId(null);
                }}
                position={{
                  lat: parseFloat(loc?.lat),
                  lng: parseFloat(loc?.lng),
                }}
                onClick={(e) => {
                  handleActiveMarker(loc?.id, e);
                  // setSidebarOpen(false);
                  setRightSidebar(false);
                  cluster_zoom = map.getZoom();
                  cluster_center = map.getCenter();
                  setPreviouslatMap({
                    lat: cluster_center.lat(),
                    lng: cluster_center.lng(),
                  });
                  setPinId(loc?.id);
                  setProjectId(loc?.id);
                  setPreviousZoomMap(cluster_zoom);

                  if (projectId != loc?.id) {
                    handleActiveMarker(loc?.id, e);
                    // setSidebarOpen(false);
                    setRightSidebar(false);
                    cluster_zoom = map.getZoom();
                    cluster_center = map.getCenter();
                    setPreviouslatMap({
                      lat: cluster_center.lat(),
                      lng: cluster_center.lng(),
                    });
                    setPinId(loc?.id);
                    setProjectId(loc?.id);
                    setPreviousZoomMap(cluster_zoom);

                    setDefaultCenter({
                      lat: parseFloat(loc.lat) - 0.00013,
                      lng: parseFloat(loc.lng),
                    });

                    map.setZoom(18);
                  }
                }}
              >
                {pinHoverId == loc?.id && (
                  <InfoWindow
                    className="inner_tooltip"
                    options={{
                      disableAutoPen: false,
                      pixelOffset: new window.google.maps.Size(70, 60),
                    }}
                    position={{ lat: loc?.lat, lng: loc?.lat }}
                  >
                    <div className="inner_tooltip">{loc.name}</div>
                  </InfoWindow>
                )}

                {activeMarker === loc?.id && pinData && (
                  <InfoWindow
                    className="full-info-window"
                    onCloseClick={() => {
                      setPinCenter(true);
                      setRightSidebar(false);
                      setActiveMarker(null);
                    }}
                    options={{
                      minWidth: 30,
                      disableAutoPen: false,
                      maxWidth: 392,
                    }}
                    position={{ lat: loc?.lat, lng: loc?.lat }}
                  >
                    <div className="d-flex info-window-wrapper">
                      <div className="info-window-img">
                        <img
                          alt=""
                          className="img-infowindow"
                          src={
                            pinData?.img != undefined ? pinData?.img : Sample
                          }
                          onClick={() => {
                            setRightSidebar(true);
                            setSidebarOpen(false);
                            setProjectId(loc?.id);
                          }}
                        />
                      </div>
                      <div className="info-window-content">
                        <div>
                          <h5>{pinData?.project_name ?? "Title"}</h5>

                          <span>
                            {pinData?.address1?.length > 60
                              ? pinData?.address1.slice(0, 60) + "..."
                              : pinData?.address1 ?? "-"}
                          </span>
                        </div>
                        <div className="lg-pt-3 ">
                          <button
                            onClick={() => {
                              setRightSidebar(true);
                              setSidebarOpen(false);
                              setProjectId(loc?.id);
                            }}
                            type="button"
                            class="btn btn-light info-window-button p-0"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            ))
          }
        </MarkerClusterer>
      </Map>
    </>
  );
};
export default React.memo(MapContainer);
