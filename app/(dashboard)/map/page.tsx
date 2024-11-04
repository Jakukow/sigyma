"use client";
import React, { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { GymList } from "@/components/map/gym-list";
import { useModal } from "@/hooks/use-modal-store";
import { gymMarkes } from "@/lib/constants";

const MapPage = () => {
  const mapRef = useRef<maplibregl.Map | null>(null);

  const { onOpen } = useModal();

  useEffect(() => {
    const map = new maplibregl.Map({
      container: "map",
      style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
      center: [21.0122, 52.2297],
      zoom: 12,
      doubleClickZoom: false,
    });

    mapRef.current = map;

    gymMarkes.forEach(({ name, description, lngLat }) => {
      const marker = new maplibregl.Marker().setLngLat(lngLat).addTo(map);
      marker.getElement().addEventListener("click", () => {
        onOpen("showMarker", { name, description });
      });
    });

    map.on("dblclick", (e) => {
      const lngLat = e.lngLat;
      onOpen("createMarker", { lngLat });
    });

    return () => {
      map.remove();
    };
  }, [onOpen]);

  return (
    <div className="mt-11 mx-5 items-center justify-center flex  w-full h-full shadow bg-white rounded-xl overflow-hidden relative">
      <GymList mapRef={mapRef} />

      <div id="map" className=" flex w-3/4 h-full" />
    </div>
  );
};

export default MapPage;
