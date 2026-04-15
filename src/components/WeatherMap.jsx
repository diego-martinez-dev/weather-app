import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import TemperatureIndicator from './TemperatureIndicator';
import './WeatherMap.css';

// Fix para los íconos de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function WeatherMap({ lat, lon, cityName, temperatureCelsius, temperatureDisplay, API_KEY }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!lat || !lon) return;

    if (!mapInstanceRef.current && mapRef.current) {
      // Inicializar mapa
      mapInstanceRef.current = L.map(mapRef.current).setView([lat, lon], 6);
      
      // Capa base
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19,
        minZoom: 3
      }).addTo(mapInstanceRef.current);
      
      // Capa de temperatura de OpenWeatherMap
      L.tileLayer(`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${API_KEY}`, {
        attribution: 'Temperature data © <a href="https://openweathermap.org/">OpenWeatherMap</a>',
        opacity: 0.65,
        maxZoom: 18
      }).addTo(mapInstanceRef.current);

      // Marcador de la ciudad
      const customIcon = L.divIcon({
        className: 'custom-marker',
        html: '<div style="background: #ff4444; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.3);"></div>',
        iconSize: [12, 12],
        iconAnchor: [6, 6]
      });
      
      const marker = L.marker([lat, lon], { icon: customIcon }).addTo(mapInstanceRef.current);
      
      marker.bindPopup(`
        <div style="font-family: sans-serif; text-align: center;">
          <strong>${cityName}</strong><br/>
          🌡️ ${temperatureDisplay}
        </div>
      `).openPopup();
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [lat, lon, cityName, temperatureDisplay, API_KEY]);

  return (
    <div className="weather-map-container">
      <div 
        ref={mapRef} 
        className="weather-map"
        style={{ height: '500px', width: '100%' }}
      />
      <div className="weather-map-indicator">
        <TemperatureIndicator 
          temp={temperatureCelsius}  // ← Pasamos la temperatura en °C para el cálculo
          minTemp={-45}
          maxTemp={54}
        />
      </div>
    </div>
  );
}

export default WeatherMap;