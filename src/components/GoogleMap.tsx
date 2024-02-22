import { useState } from "react";
import {
  APIProvider,
  Map,
  InfoWindow,
  AdvancedMarker,
  Pin,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";

const MARKER_COORDINATES: google.maps.LatLngLiteral = {
  lat: 48.923835142085494,
  lng: 24.701468908172984,
};

export default function GoogleMap() {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [isMapTooltipOpen, setMapTooltipOpen] = useState(true);

  return (
    <APIProvider apiKey={import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY}>
      <Map
        mapId={import.meta.env.VITE_APP_GOOGLE_MAP_ID}
        style={{ height: "397px" }}
        defaultZoom={15.45}
        defaultCenter={MARKER_COORDINATES}
        gestureHandling="none"
        fullscreenControl={false}
      >
        <AdvancedMarker
          ref={markerRef}
          position={MARKER_COORDINATES}
          onClick={() => setMapTooltipOpen(true)}
        >
          {/* TODO: replace pin icon with custom marker image */}
          <Pin borderColor="white" glyphColor="#811411" />
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
