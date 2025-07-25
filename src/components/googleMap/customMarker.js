import React, { useState } from "react";
import { Marker } from "@react-google-maps/api";

export default function CustomMarker(props) {
  const { position, clusterer } = props;

  return <Marker position={position} clusterer={clusterer} />;
}
