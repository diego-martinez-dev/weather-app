import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix para los íconos de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function WeatherMap({ lat, lon, cityName, temperature }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!lat || !lon) return;

    if (!mapInstanceRef.current && mapRef.current) {
      // Inicializar mapa
      mapInstanceRef.current = L.map(mapRef.current).setView([lat, lon], 8);
      
      // Capa de OpenStreetMap
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19,
        minZoom: 3
      }).addTo(mapInstanceRef.current);

      // Capa de temperatura (OpenWeatherMap)
      const tempLayer = L.tileLayer(`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=90bf728b241468d111bced5d64a44730`, {
        attribution: '&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>',
        opacity: 0.6,
        maxZoom: 18
      }).addTo(mapInstanceRef.current);

      // Marcador de la ciudad
      const marker = L.marker([lat, lon]).addTo(mapInstanceRef.current);
      
      // Popup con información
      marker.bindPopup(`
        <b>${cityName}</b><br/>
        🌡️ ${temperature}°C<br/>
        📍 Lat: ${lat.toFixed(4)}<br/>
        📍 Lon: ${lon.toFixed(4)}
      `).openPopup();
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [lat, lon, cityName, temperature]);

  return (
    <div className="weather-map">
      <div ref={mapRef} style={{ height: '400px', width: '100%', borderRadius: '12px' }} />
    </div>
  );
}

export default WeatherMap;