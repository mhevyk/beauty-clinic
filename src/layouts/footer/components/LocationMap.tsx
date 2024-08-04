import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import "mapbox-gl/dist/mapbox-gl.css";

import googleMapPinIcon from "@/assets/icons/map-pin.svg?url";

import useMap from "@/layouts/footer/hooks/useMap";

const MapContainer = styled(Box)(() => ({
  width: "100%",
  height: "397px",
}));

const MapMarker = styled("img")(() => ({
  width: "30px",
  height: "45px",
  cursor: "pointer",
}));

export default function LocationMap() {
  const { mapContainerRef, markerIconRef } = useMap();

  return (
    <MapContainer ref={mapContainerRef}>
      <MapMarker
        src={googleMapPinIcon}
        alt="Our beauty clinic location"
        ref={markerIconRef}
      />
    </MapContainer>
  );
}
