import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

// Fix Leaflet marker icon path issue
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Define custom icon for markers
const customIcon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const MapComponent = () => {
  const [markers, setMarkers] = useState([]);

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setMarkers([{ position: [lat, lng] }]);
    saveCoordinatesToDatabase(lat, lng);
  };

  const saveCoordinatesToDatabase = async (latitude, longitude) => {
    try {
      const res = await axios.post('/api/v1/travelplace', {
        latitude: latitude.toString(),
        longitude: longitude.toString(),
      });
      console.log(res.data);
    } catch (error) {
      console.error('Error saving coordinates:', error);
    }
  };

  const MapEvents = () => {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  };

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px', width: '100%' }}>
      <MapEvents />
      <TileLayer
        attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> contributors'
        url="https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZGlsc2hhbjk5IiwiYSI6ImNseGpzMTZ1ODAzMDkyaG9lZWFsc3JoOTMifQ.7SLNGi20lCJ_1emNgkqMLg"
      />
      {markers.map((marker, index) => (
        <Marker key={index} position={marker.position} icon={customIcon}>
          <Popup>
            Latitude: {marker.position[0]} <br />
            Longitude: {marker.position[1]}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
