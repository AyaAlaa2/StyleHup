import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const customIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [40, 40],
});

const MapContact = () => {
  const randomPosition = [
    31.95 + (Math.random() - 0.5) * 0.1,
    35.91 + (Math.random() - 0.5) * 0.1,
  ];
  return (
    <div className="w-full h-96 rounded-2xl shadow overflow-hidden mt-[12px]">
      <MapContainer
        center={randomPosition}
        zoom={8}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={randomPosition} icon={customIcon}></Marker>
      </MapContainer>
    </div>
  );
};

export default MapContact;
