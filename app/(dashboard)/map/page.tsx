"use client";
import React, { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { GymList } from "@/components/map/gym-list";
import { useModal } from "@/hooks/use-modal-store";
import { useGetMarkers } from "@/features/accounts/api/use-get-markers";

const MapPage = () => {
  const mapRef = useRef<maplibregl.Map | null>(null);

  const { onOpen } = useModal();
  const gymMarkers = useGetMarkers(); // Hook musi być wywołany bezpośrednio tutaj

  useEffect(() => {
    const map = new maplibregl.Map({
      container: "map",
      style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
      center: [21.0122, 52.2297],
      zoom: 12,
      doubleClickZoom: false,
    });

    mapRef.current = map;

    // Dodanie markerów do mapy
    if (gymMarkers.data) {
      gymMarkers.data.map(
        ({ gymName: name, gymAdress: description, lat, lng, clerkId }) => {
          const marker = new maplibregl.Marker()
            .setLngLat([+lng, +lat])
            .addTo(map);

          marker.getElement().addEventListener("click", () => {
            onOpen("showMarker", { name, description, clerkId });
          });
        }
      );
    }

    // Obsługa podwójnego kliknięcia (dodanie nowego markera)
    map.on("dblclick", (e) => {
      const lngLat = e.lngLat;
      onOpen("createMarker", { lngLat });
    });

    // Czyszczenie instancji mapy podczas demontażu komponentu
    return () => {
      map.remove();
    };
  }, [gymMarkers.data, onOpen]); // Dodaj zależność `gymMarkers.data` do `useEffect`

  return (
    <div className="mt-11 mx-5 items-center justify-center flex  w-full h-full shadow bg-white rounded-xl overflow-hidden relative">
      <GymList mapRef={mapRef} />

      <div id="map" className=" flex w-3/4 h-full" />
    </div>
  );
};

export default MapPage;
