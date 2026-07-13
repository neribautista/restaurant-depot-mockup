"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

// Warehouse pin icon
const pinIcon = (active) =>
  new L.DivIcon({
    className: "",
    html: `<div style="width:26px;height:34px">
      <svg viewBox="0 0 26 34" width="26" height="34" style="filter:drop-shadow(0 2px 3px rgba(0,0,0,.25))">
        <path d="M13 0C5.8 0 0 5.8 0 13c0 9.75 13 21 13 21s13-11.25 13-21C26 5.8 20.2 0 13 0z" fill="${active ? "#a9793a" : "#1c1a16"}"/>
        <circle cx="13" cy="13" r="5" fill="#f7f3ea"/>
      </svg>
    </div>`,
    iconSize: [26, 34],
    iconAnchor: [13, 34],
    popupAnchor: [0, -30],
  });

// User location icon
const userIcon = new L.DivIcon({
  className: "",
  html: `<div style="width:26px;height:26px">
    <svg viewBox="0 0 26 26" width="26" height="26" style="filter:drop-shadow(0 2px 3px rgba(0,0,0,.25))">
      <circle cx="13" cy="13" r="10" fill="#2b6cb0"/>
      <circle cx="13" cy="13" r="5" fill="#fff"/>
    </svg>
  </div>`,
  iconSize: [26, 26],
  iconAnchor: [13, 13],
});

// Detect user location
function UseUserLocation({ setUserLocation }) {
  const map = useMap();

  useEffect(() => {
    map.locate({ setView: false, maxZoom: 12 });

    function onLocationFound(e) {
      setUserLocation(e.latlng);

      L.marker(e.latlng, { icon: userIcon })
        .addTo(map)
        .bindPopup("You are here")
        .openPopup();

      map.flyTo(e.latlng, 11, { duration: 0.7 });
    }

    function onLocationError() {
      console.log("User denied geolocation or it failed.");
    }

    map.on("locationfound", onLocationFound);
    map.on("locationerror", onLocationError);

    return () => {
      map.off("locationfound", onLocationFound);
      map.off("locationerror", onLocationError);
    };
  }, [map, setUserLocation]);

  return null;
}

// Fly to selected warehouse
function FlyTo({ active, locations }) {
  const map = useMap();
  useEffect(() => {
    const loc = locations.find((l) => l.name === active);
    if (loc) map.flyTo([loc.lat, loc.lng], 11, { duration: 0.7 });
  }, [active, locations, map]);
  return null;
}

export default function LocationsMap({ locations, active, onSelect }) {
  const [userLocation, setUserLocation] = useState(null);

  return (
    <MapContainer
      center={[37.5, -95.7]}
      zoom={4}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%", zIndex: 10 }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution="&copy; OpenStreetMap contributors &copy; CARTO"
      />

      {/* Detect user location */}
      <UseUserLocation setUserLocation={setUserLocation} />

      {/* Warehouse markers */}
      {locations.map((loc) => (
        <Marker
          key={loc.name}
          position={[loc.lat, loc.lng]}
          icon={pinIcon(loc.name === active)}
          eventHandlers={{ click: () => onSelect(loc.name) }}
        >
          <Popup>
            <b>{loc.name}</b>
            <br />
            {loc.address}
            <br />
            {loc.cityState}
            <br />
            {loc.phone && <a href={`tel:${loc.phone}`}>{loc.phone}</a>}
            <br />

            {/* Directions button */}
            <button
              onClick={() => {
                const origin = userLocation
                  ? `${userLocation.lat},${userLocation.lng}`
                  : "";
                const destination = `${loc.lat},${loc.lng}`;

                const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}${
                  origin ? `&origin=${origin}` : ""
                }`;

                window.open(url, "_blank");
              }}
              className="mt-2 rounded-md bg-blue-600 px-3 py-1 text-xs text-white"
            >
              Get Directions
            </button>

            {loc.tags?.length > 0 && (
              <div className="mt-1">
                <small>Tags: {loc.tags.join(", ")}</small>
              </div>
            )}
          </Popup>
        </Marker>
      ))}

      <FlyTo active={active} locations={locations} />
    </MapContainer>
  );
}
