'use client';

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Shelter } from '@/types/shelter';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/marker-icon-2x.png',
  iconUrl: '/marker-icon.png',
  shadowUrl: '/marker-shadow.png',
});

interface ShelterMapProps {
  shelters: Shelter[];
  center?: [number, number];
  zoom?: number;
}

const ShelterMap: React.FC<ShelterMapProps> = ({ 
  shelters, 
  center = [42.3601, -71.0589], // Default to Boston
  zoom = 6 
}) => {
  // Filter out shelters with invalid coordinates
  const validShelters = shelters.filter(
    shelter => 
      shelter.latitude && 
      shelter.longitude && 
      shelter.latitude !== 0 && 
      shelter.longitude !== 0
  );

  return (
    <MapContainer 
      center={center} 
      zoom={zoom} 
      scrollWheelZoom={false}
      className="h-[500px] w-full rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {validShelters.map((shelter) => (
        <Marker 
          key={shelter.id}
          position={[shelter.latitude, shelter.longitude]}
        >
          <Popup>
            <div>
              <h3 className="font-bold">{shelter.name}</h3>
              <p>{shelter.city}, {shelter.state}</p>
              {shelter.phone && <p>Phone: {shelter.phone}</p>}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default ShelterMap; 