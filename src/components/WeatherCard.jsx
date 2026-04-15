import React, { useState, useEffect } from 'react';
import { getAirQuality } from '../services/weatherAPI';
import { getWeatherBackground, getOverlayColor } from '../services/backgroundService';

function WeatherCard({ weather, convertTemp, getTempSymbol, onAddFavorite, isFavorite }) {
  const [airQuality, setAirQuality] = useState(null);
  const [currentTime, setCurrentTime] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('');
  const [overlayColor, setOverlayColor] = useState('');
  const [isDay, setIsDay] = useState(true);

  // Obtener calidad del aire
  useEffect(() => {
    if (weather && weather.coord) {
      const fetchAirQuality = async () => {
        try {
          const data = await getAirQuality(weather.coord.lat, weather.coord.lon);
          setAirQuality(data.list[0]);
        } catch (error) {
          console.error('Error fetching air quality:', error);
        }
      };
      fetchAirQuality();
    }
  }, [weather]);

  // Obtener hora actual en formato 24h
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
      
      // Determinar si es de día (6:00 - 18:00)
      const hour = now.getHours();
      setIsDay(hour >= 6 && hour < 18);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Actualizar fondo según clima y hora
  useEffect(() => {
    if (weather && weather.weather && weather.weather[0]) {
      const now = new Date();
      const currentTimestamp = Math.floor(now.getTime() / 1000);
      const imageUrl = getWeatherBackground(weather, currentTimestamp, weather.sys.sunrise, weather.sys.sunset);
      const overlay = getOverlayColor(isDay);
      setBackgroundImage(imageUrl);
      setOverlayColor(overlay);
    }
  }, [weather, isDay]);

  // Obtener mensaje de calidad del aire
  const getAirQualityMessage = (aqi) => {
    switch (aqi) {
      case 1: return { text: 'Excelente', color: '#00e400' };
      case 2: return { text: 'Buena', color: '#ffff00' };
      case 3: return { text: 'Moderada', color: '#ff7e00' };
      case 4: return { text: 'Mala', color: '#ff0000' };
      case 5: return { text: 'Muy mala', color: '#8f3f97' };
      default: return { text: 'Desconocida', color: '#999' };
    }
  };

  // Formatear hora (timestamp Unix a hora local)
  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  if (!weather) return null;

  const airQualityInfo = airQuality ? getAirQualityMessage(airQuality.main.aqi) : null;

  return (
    <div 
      className="weather-card-modern"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
      }}
    >
      {/* Overlay semitransparente */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: overlayColor,
          borderRadius: '20px',
          zIndex: 1
        }}
      />
      
      {/* Contenido (con z-index mayor que el overlay) */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* Header con ciudad y hora */}
        <div className="card-header">
          <h2 className="city-name">{weather.name}, {weather.sys.country}</h2>
          <div className="header-right">
            <span className="current-time">{currentTime}</span>
            <button 
              onClick={() => onAddFavorite(weather.name)}
              className={`favorite-btn-modern ${isFavorite ? 'active' : ''}`}
              title={isFavorite ? 'Eliminar de favoritos' : 'Agregar a favoritos'}
            >
              {isFavorite ? '⭐' : '☆'}
            </button>
          </div>
        </div>

        {/* Temperatura principal */}
        <div className="main-temp">
          <div className="temp-value">{convertTemp(weather.main.temp)}{getTempSymbol()}</div>
          <div className="weather-description">
            <img 
              src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`} 
              alt={weather.weather[0].description}
            />
            <span>{weather.weather[0].description}</span>
          </div>
        </div>

        {/* Temperaturas min/max */}
        <div className="temp-range">
          <span>🌡️ Día {convertTemp(weather.main.temp_max)}{getTempSymbol()}</span>
          <span>🌙 Noche {convertTemp(weather.main.temp_min)}{getTempSymbol()}</span>
        </div>

        {/* Detalles en grid */}
        <div className="weather-details-grid">
          <div className="detail-item">
            <span className="detail-icon">🌡️</span>
            <span className="detail-label">Sensación</span>
            <span className="detail-value">{convertTemp(weather.main.feels_like)}{getTempSymbol()}</span>
          </div>
          <div className="detail-item">
            <span className="detail-icon">💧</span>
            <span className="detail-label">Humedad</span>
            <span className="detail-value">{weather.main.humidity}%</span>
          </div>
          <div className="detail-item">
            <span className="detail-icon">🌬️</span>
            <span className="detail-label">Calidad del aire</span>
            <span className="detail-value" style={{ color: airQualityInfo?.color }}>
              {airQualityInfo?.text || 'Cargando...'}
            </span>
          </div>
        </div>

        {/* Amanecer / Atardecer */}
        <div className="sun-times">
          <div className="sun-item">
            <span className="sun-icon">🌅</span>
            <span>Amanecer: {formatTime(weather.sys.sunrise)}</span>
          </div>
          <div className="sun-item">
            <span className="sun-icon">🌇</span>
            <span>Atardecer: {formatTime(weather.sys.sunset)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;