import { render, renderHook, waitFor } from "@testing-library/react";
import React, { useEffect } from "react";

import mapboxgl from "mapbox-gl";

import useMap, { MAP_COORDINATES } from "@/layouts/footer/hooks/useMap";

const mockAddControl = jest.fn();
const mockSetHTML = jest.fn().mockReturnThis();
const mockAddTo = jest.fn().mockReturnThis();
const mockSetLngLat = jest.fn().mockReturnThis();
const mockSetPopup = jest.fn().mockReturnThis();

jest.mock("mapbox-gl", () => ({
  Map: jest.fn(() => ({
    addControl: mockAddControl,
  })),
  NavigationControl: jest.fn(),
  Popup: jest.fn(() => ({
    setHTML: mockSetHTML,
    addTo: mockAddTo,
  })),
  Marker: jest.fn(() => ({
    setLngLat: mockSetLngLat,
    addTo: mockAddTo,
    setPopup: mockSetPopup,
  })),
}));

const mapContainer = document.createElement("div");
const markerIcon = document.createElement("img");

const MapPlayground = () => {
  const { mapContainerRef, markerIconRef } = useMap();

  // Set the refs directly in the mock component
  useEffect(() => {
    mapContainerRef.current = document.createElement("div");
    markerIconRef.current = document.createElement("img");
  }, [mapContainerRef, markerIconRef]);

  return (
    <div>
      <div ref={mapContainerRef}></div>
      <img ref={markerIconRef} />
    </div>
  );
};

const mockRefs = (
  mapContainer: HTMLDivElement | null,
  markerIcon: HTMLImageElement | null
) => {
  jest
    .spyOn(React, "useRef")
    .mockReturnValueOnce({ current: mapContainer })
    .mockReturnValueOnce({ current: markerIcon });
};

const testHookWithRefs = (
  mapContainer: HTMLDivElement | null,
  markerIcon: HTMLImageElement | null
) => {
  mockRefs(mapContainer, markerIcon);
  renderHook(() => useMap());

  expect(mapboxgl.Map).not.toHaveBeenCalled();
};

describe("useMap()", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize map with marker and popup", async () => {
    mockRefs(mapContainer, markerIcon);
    render(<MapPlayground />);

    await waitFor(() => {
      expect(mapboxgl.Map).toHaveBeenCalledTimes(1);
    });

    expect(mapboxgl.Map).toHaveBeenCalledWith(
      expect.objectContaining({
        container: expect.any(HTMLElement),
        center: MAP_COORDINATES,
        zoom: 13.2,
        interactive: false,
      })
    );

    expect(mockAddControl).toHaveBeenCalledTimes(1);
    expect(mapboxgl.NavigationControl).toHaveBeenCalledWith({
      showCompass: false,
    });

    expect(mapboxgl.Popup).toHaveBeenCalledWith({
      offset: 25,
      closeOnClick: false,
    });
    expect(mockSetHTML).toHaveBeenCalledWith(
      expect.stringContaining("Lily Organic Beautician")
    );
    expect(mockAddTo).toHaveBeenCalledTimes(2);

    expect(mapboxgl.Marker).toHaveBeenCalledWith({ element: markerIcon });
    expect(mockSetLngLat).toHaveBeenCalledWith(MAP_COORDINATES);
    expect(mockSetPopup).toHaveBeenCalledWith(
      expect.objectContaining({
        setHTML: mockSetHTML,
        addTo: mockAddTo,
      })
    );
  });

  it("should not initialize map if map container ref is null", () => {
    testHookWithRefs(null, markerIcon);
  });

  it("should not initialize map if marker icons ref is null", () => {
    testHookWithRefs(mapContainer, null);
  });
});
