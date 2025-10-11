'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { FaBed, FaBath, FaUserFriends } from 'react-icons/fa';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const customIcon = L.divIcon({
  html: `
    <div class="custom-marker-wrapper">
      <img src="/icons/marker.svg" alt="Marker Icon" class="custom-marker-img" />
    </div>
  `,
  className: '',
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

function offsetOverlappingMarkers(apartments) {
  const grouped = {};
  const OFFSET = 0.00005;

  apartments.forEach(apt => {
    const key = `${apt.lat.toFixed(5)}-${apt.lng.toFixed(5)}`;
    (grouped[key] ??= []).push(apt);
  });

  const out = [];
  Object.entries(grouped).forEach(([key, group]) => {
    const [baseLat, baseLng] = key.split('-').map(Number);
    if (group.length === 1) {
      out.push({ ...group[0], groupSize: 1, baseLat, baseLng });
    } else {
      group.forEach((apt, i) => {
        const angle = (i / group.length) * 2 * Math.PI;
        out.push({
          ...apt,
          lat: apt.lat + OFFSET * Math.cos(angle),
          lng: apt.lng + OFFSET * Math.sin(angle),
          groupSize: group.length,
          baseLat,
          baseLng,
        });
      });
    }
  });
  return out;
}

function ApartmentMarker({ apt, icon }) {
  const map = useMap();

  const handleClick = () => {
    const targetZoom = 17;
    const currentZoom = map.getZoom();
    const currentCenter = map.getCenter();
    const threshold = 0.0001; // distance tolerance for lat/lng

    const isZoomedIn = currentZoom >= targetZoom;
    const isCentered =
      Math.abs(currentCenter.lat - apt.lat) < threshold &&
      Math.abs(currentCenter.lng - apt.lng) < threshold;

    if (!isZoomedIn || !isCentered) {
      map.flyTo([apt.lat, apt.lng], targetZoom, {
        duration: 0.75,
      });
    }
  };

  return (
    <Marker
      key={apt.id}
      position={[apt.lat, apt.lng]}
      icon={icon}
      eventHandlers={{ click: handleClick }}
    >
      <Popup maxWidth={300}>
        <div className="w-full">
          <img
            src={apt.image}
            alt={apt.title}
            className="rounded-t w-full h-32 object-cover"
          />
          <div className="p-2">
            <h2 className="font-semibold text-base mb-1">{apt.title}</h2>
            <p className="text-sm text-gray-500 mb-2">{apt.address}</p>
            <div className="flex items-center gap-4 text-xs text-gray-700">
              <div className="flex items-center gap-1">
                <FaBed /> {apt.bedrooms}
              </div>
              <div className="flex items-center gap-1">
                <FaBath /> {apt.bathrooms}
              </div>
              <div className="flex items-center gap-1">
                <FaUserFriends /> {apt.maxGuests}
              </div>
            </div>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

export default function Map({ apartments = [], selected }) {
  const defaultLat = selected?.lat ?? -33.8688;
  const defaultLng = selected?.lng ?? 151.2093;

  const adjustedApartments = offsetOverlappingMarkers(apartments);

  return (
    <MapContainer center={[defaultLat, defaultLng]} zoom={13} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />

      {adjustedApartments.map((apt) => (
        <ApartmentMarker key={apt.id} apt={apt} icon={customIcon} />
      ))}
    </MapContainer>
  );
}
