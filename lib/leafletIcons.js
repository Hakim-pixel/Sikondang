// lib/leafletIcons.js
export const createDefaultIcon = () => {
  if (typeof window === 'undefined') return null; // server-safe

  const L = require('leaflet');

  return new L.Icon({
    iconUrl: '/leaflet/images/marker-icon.png',
    iconRetinaUrl: '/leaflet/images/marker-icon-2x.png',
    shadowUrl: '/leaflet/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
};
