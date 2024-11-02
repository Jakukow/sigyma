"use client";
import React, { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import Autosuggest from "react-autosuggest";

const MapPage: React.FC = () => {
  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(
    null
  );
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markerRef = useRef<maplibregl.Marker | null>(null);

  useEffect(() => {
    const map = new maplibregl.Map({
      container: "map",
      style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
      center: [21.0122, 52.2297],
      zoom: 12,
    });

    mapRef.current = map;

    return () => {
      map.remove();
    };
  }, []);

  useEffect(() => {
    if (markerPosition && mapRef.current) {
      if (markerRef.current) {
        markerRef.current.remove();
      }

      markerRef.current = new maplibregl.Marker()
        .setLngLat(markerPosition)
        .addTo(mapRef.current);

      mapRef.current.flyTo({ center: markerPosition, zoom: 12 });
    }
  }, [markerPosition]);

  const fetchSuggestions = async (value: string) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${value}&addressdetails=1&limit=5`
    );
    const data = await response.json();
    setSuggestions(data);
  };

  const onSuggestionsFetchRequested = ({ value }: any) => {
    fetchSuggestions(value);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion: any) => suggestion.display_name;

  const renderSuggestion = (suggestion: any) => (
    <div>{suggestion.display_name}</div>
  );

  const onSuggestionSelected = (event: any, { suggestion }: any) => {
    const { lon, lat } = suggestion;
    setMarkerPosition([parseFloat(lon), parseFloat(lat)]);
    setSearchTerm(suggestion.display_name);
  };

  const inputProps = {
    placeholder: "Wyszukaj miasto",
    value: searchTerm,
    onChange: (event: any, { newValue }: any) => {
      setSearchTerm(newValue);
    },
  };

  return (
    <div style={{ width: "100%", height: "500px", position: "relative" }}>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        onSuggestionSelected={onSuggestionSelected}
        inputProps={inputProps}
        theme={{
          container: {
            position: "absolute",
            top: "10px",
            left: "10px",
            zIndex: 1,
          },
          suggestionsContainerOpen: {
            backgroundColor: "white",
            border: "1px solid #ccc",
          },
          suggestion: { padding: "10px", cursor: "pointer" },
          suggestionHighlighted: { backgroundColor: "#ddd" },
        }}
      />
      <div id="map" style={{ width: "100%", height: "100%" }}></div>
    </div>
  );
};

export default MapPage;
