'use client';

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for Leaflet marker icons in Next.js
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const mechanicIcon = L.icon({
  // Using a different color marker for mechanics
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Component to set view based on user location
function SetViewOnLocation({ userLocation }) {
  const map = useMap();
  
  useEffect(() => {
    if (userLocation) {
      map.setView([userLocation.lat, userLocation.lng], 13);
    } else {
      // Try to get user location
      map.locate({ setView: true, maxZoom: 14 });
      
      const onLocationFound = (e) => {
        console.log("Location found:", e.latlng);
      };
      
      const onLocationError = (e) => {
        console.log("Location error:", e.message);
        // Set default view to center of India if location not found
        map.setView([20.5937, 78.9629], 5);
      };
      
      map.on('locationfound', onLocationFound);
      map.on('locationerror', onLocationError);
      
      return () => {
        map.off('locationfound', onLocationFound);
        map.off('locationerror', onLocationError);
      };
    }
  }, [map, userLocation]);
  
  return null;
}

const LeafletMap = ({ mechanics = [] }) => {
  const [userLocation, setUserLocation] = useState(null);
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  }, []);
  
  // Reset L.Icon.Default.prototype to fix the markers
  useEffect(() => {
    // Set default icon for all markers
    L.Marker.prototype.options.icon = defaultIcon;
  }, []);
  
  return (
    <MapContainer
      className="z-0"
      center={[20.5937, 78.9629]} // Default to center of India
      zoom={5}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <SetViewOnLocation userLocation={userLocation} />
      
      {/* Show user location */}
      {userLocation && (
        <>
          <Marker position={[userLocation.lat, userLocation.lng]} icon={defaultIcon}>
            <Popup>Your Location</Popup>
          </Marker>
          
          <Circle
            center={[userLocation.lat, userLocation.lng]}
            radius={5000} // 5km in meters
            pathOptions={{ color: 'blue', fillColor: 'blue', fillOpacity: 0.1 }}
          />
        </>
      )}
      
      {/* Show mechanics */}
      {mechanics && mechanics.length > 0 && mechanics.map((mechanic, index) => (
        <Marker 
          key={mechanic._id || `mechanic-${index}`}
          position={[mechanic.latitude, mechanic.longitude]}
          icon={mechanicIcon}
        >
          <Popup>
            <div className="p-1">
              <h3 className="font-semibold">{mechanic.name}</h3>
              {mechanic.email && <p className="text-sm text-gray-600">{mechanic.email}</p>}
              <button 
                className="mt-2 bg-blue-500 text-white px-2 py-1 rounded text-sm"
                onClick={() => alert(`Contacting ${mechanic.name}...`)}
              >
                Contact
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default LeafletMap;