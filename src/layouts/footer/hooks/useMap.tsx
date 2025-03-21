import { useEffect, useRef } from "react";
import { renderToString } from "react-dom/server";

import mapboxgl, { LngLatLike, MapOptions } from "mapbox-gl";

import AppTypography from "@/styles/app-typography/AppTypography";

export const MAP_COORDINATES: LngLatLike = {
  lng: -122.41942697025132,
  lat: 37.77489791779846,
};

const createMapOptions = (container: MapOptions["container"]): MapOptions => {
  return {
    container,
    accessToken: import.meta.env.VITE_APP_MAPBOX_ACCESS_TOKEN,
    style: import.meta.env.VITE_APP_MAPBOX_STYLE_LINK,
    center: MAP_COORDINATES,
    zoom: 13.2,
    interactive: false,
  };
};

export default function useMap() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const markerIconRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const mapContainer = mapContainerRef.current;
    const markerIcon = markerIconRef.current;

    if (mapContainer === null || markerIcon === null) {
      return;
    }

    mapContainer.innerHTML = "";

    const map = new mapboxgl.Map(createMapOptions(mapContainer));

    const navigationControl = new mapboxgl.NavigationControl({
      showCompass: false,
    });
    map.addControl(navigationControl);

    const popup = new mapboxgl.Popup({ offset: 25, closeOnClick: false });

    const popupJSX = (
      <AppTypography fontWeight="bold" variant="caption">
        Lily Organic Beautician
      </AppTypography>
    );

    popup.setHTML(renderToString(popupJSX));
    popup.addTo(map);

    const marker = new mapboxgl.Marker({ element: markerIcon });
    marker.setLngLat(MAP_COORDINATES);
    marker.addTo(map);
    marker.setPopup(popup);
  }, []);

  return { mapContainerRef, markerIconRef } as const;
}
