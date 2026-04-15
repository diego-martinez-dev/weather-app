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

function WeatherMap({ lat, lon, cityName, temperature, API_KEY }) {
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
        opacity: 0.7,
        maxZoom: 18
      }).addTo(mapInstanceRef.current);

      // Marcador de la ciudad
      const marker = L.marker([lat, lon]).addTo(mapInstanceRef.current);
      
      marker.bindPopup(`
        <b>${cityName}</b><br/>
         Temperatura actual: ${temperature}°C<br/>
      `).openPopup();
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [lat, lon, cityName, temperature, API_KEY]);

  return (
    <div className="weather-map-container">
      <div 
        ref={mapRef} 
        className="weather-map"
        style={{ height: '500px', width: '100%', borderRadius: '12px', position: 'relative' }}
      />
      {/* Indicador de temperatura DENTRO del contenedor, superpuesto en la parte inferior */}
      <div style={{ 
        position: 'absolute', 
        bottom: '20px', 
        left: '20px', 
        right: '20px',
        zIndex: 1000,
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: '10px',
        backdropFilter: 'blur(5px)'
      }}>
        <TemperatureIndicator 
          temp={temperature}
          minTemp={-45}
          maxTemp={54}
        />
      </div>
    </div>
  );
}

export default WeatherMap;