import { useState } from "react";
import {
  APIProvider,
  Map,
  InfoWindow,
  AdvancedMarker,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import GoogleMapPinIcon from "@icons/map-pin.svg?react";

const MARKER_COORDINATES: google.maps.LatLngLiteral = {
  lat: 37.77489791779846,
  lng: -122.41942697025132,
};

export default function GoogleMap() {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [isMapTooltipOpen, setMapTooltipOpen] = useState(true);

  return (
    <APIProvider apiKey={import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY}>
      <Map
        mapId={import.meta.env.VITE_APP_GOOGLE_MAP_ID}
        style={{ height: "397px" }}
        defaultZoom={14.3}
        defaultCenter={MARKER_COORDINATES}
        gestureHandling="none"
        fullscreenControl={false}
      >
        <AdvancedMarker
          title="Our beauty clinic location" // For screen readers
          ref={markerRef}
          position={MARKER_COORDINATES}
          onClick={() => setMapTooltipOpen(true)}
        >
          <GoogleMapPinIcon />
        </AdvancedMarker>
        {isMapTooltipOpen && (
          <InfoWindow
            ariaLabel="Lily Organic Beautician"
            anchor={marker}
            onCloseClick={() => setMapTooltipOpen(false)}
          >
            <strong>Lily Organic Beautician</strong>
          </InfoWindow>
        )}
      </Map>
    </APIProvider>
  );
}
