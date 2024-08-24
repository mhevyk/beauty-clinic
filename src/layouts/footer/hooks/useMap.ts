import { useEffect, useRef } from "react";

import mapboxgl, { LngLatLike, MapboxOptions } from "mapbox-gl";

export const MAP_COORDINATES: LngLatLike = {
  lng: -122.41942697025132,
  lat: 37.77489791779846,
};

const isTestMode = process.env.MODE === "test";

const createMapOptions = (
  container: MapboxOptions["container"]
): MapboxOptions => {
  return {
    container,
    accessToken: process.env.VITE_APP_MAPBOX_ACCESS_TOKEN,
    style: process.env.VITE_APP_MAPBOX_STYLE_LINK,
    center: MAP_COORDINATES,
    zoom: 13.2,
    interactive: false,
    testMode: isTestMode,
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

    const map = new mapboxgl.Map(createMapOptions(mapContainer));

    const navigationControl = new mapboxgl.NavigationControl({
      showCompass: false,
    });
    map.addControl(navigationControl);

    const popup = new mapboxgl.Popup({ offset: 25, closeOnClick: false });
    popup.setHTML("<strong>Lily Organic Beautician</strong>");
    popup.addTo(map);

    const marker = new mapboxgl.Marker({ element: markerIcon });
    marker.setLngLat(MAP_COORDINATES);
    marker.addTo(map);
    marker.setPopup(popup);
  }, []);

  return { mapContainerRef, markerIconRef } as const;
}
