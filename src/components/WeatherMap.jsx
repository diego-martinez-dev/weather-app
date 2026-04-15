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

function WeatherMap({ lat, lon, cityName, temperature, API_KEY }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!lat || !lon) return;

    if (!mapInstanceRef.current && mapRef.current) {
      // Inicializar mapa
      mapInstanceRef.current = L.map(mapRef.current).setView([lat, lon], 6);
      
      // Capa base: Mapa base claro de CartoDB
      const baseLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19,
        minZoom: 3
      }).addTo(mapInstanceRef.current);
      
      // Capa de temperatura de OpenWeatherMap
      const tempLayer = L.tileLayer(`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${API_KEY}`, {
        attribution: 'Temperature data © <a href="https://openweathermap.org/">OpenWeatherMap</a>',
        opacity: 0.7,
        maxZoom: 18
      }).addTo(mapInstanceRef.current);

      // Leyenda de temperatura (opcional)
      const legend = L.control({ position: 'bottomright' });
      legend.onAdd = function() {
        const div = L.DomUtil.create('div', 'info legend');
        div.innerHTML = `
          <div style="background: white; padding: 8px 12px; border-radius: 8px; font-size: 12px; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">
            <strong>🌡️ Temperatura</strong><br/>
            <span style="background: #ff0000; display: inline-block; width: 20px; height: 10px; margin-right: 5px;"></span> Calor<br/>
            <span style="background: #ffff00; display: inline-block; width: 20px; height: 10px; margin-right: 5px;"></span> Templado<br/>
            <span style="background: #0000ff; display: inline-block; width: 20px; height: 10px; margin-right: 5px;"></span> Frío
          </div>
        `;
        return div;
      };
      legend.addTo(mapInstanceRef.current);

      // Control de capas para mostrar/ocultar temperatura
      const overlayControl = {
        "Capa de Temperatura": tempLayer
      };
      
      L.control.layers(null, overlayControl, { collapsed: false }).addTo(mapInstanceRef.current);

      // Marcador de la ciudad
      const marker = L.marker([lat, lon]).addTo(mapInstanceRef.current);
      
      marker.bindPopup(`
        <b>${cityName}</b><br/>
        🌡️ Temperatura actual: ${temperature}°C<br/>
        📍 Lat: ${lat.toFixed(4)}<br/>
        📍 Lon: ${lon.toFixed(4)}<br/>
        <i>Mapa muestra temperatura superficial</i>
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
    <div className="weather-map">
      <div ref={mapRef} style={{ height: '400px', width: '100%', borderRadius: '12px' }} />
    </div>
  );
}

export default WeatherMap;