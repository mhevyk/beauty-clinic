import "mapbox-gl/dist/mapbox-gl.css";

import googleMapPinIcon from "@/assets/icons/map-pin.svg?url";

import {
  MapContainer,
  MapMarker,
} from "@/layouts/footer/components/LocationMap/LocationMap.styled";
import useMap from "@/layouts/footer/hooks/useMap";

export default function LocationMap() {
  const { mapContainerRef, markerIconRef } = useMap();

  return (
    <>
      <MapContainer data-testid="map-container" ref={mapContainerRef} />
      <MapMarker
        data-testid="map-marker"
        src={googleMapPinIcon}
        alt="Our beauty clinic location"
        ref={markerIconRef}
      />
    </>
  );
}
