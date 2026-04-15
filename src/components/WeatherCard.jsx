import React, { useState, useEffect } from 'react';
import { getAirQuality } from '../services/weatherAPI';
import { getWeatherBackground, getOverlayColor } from '../services/backgroundService';

function WeatherCard({ weather, convertTemp, getTempSymbol, onAddFavorite, isFavorite }) {
  const [airQuality, setAirQuality] = useState(null);
  const [currentTime, setCurrentTime] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('');
  const [overlayColor, setOverlayColor] = useState('');
  const [isDay, setIsDay] = useState(true);
  const [timezone, setTimezone] = useState(null);

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

  // Obtener la zona horaria de la ciudad
  useEffect(() => {
    if (weather && weather.coord) {
      // OpenWeatherMap devuelve timezone en segundos (offset de UTC)
      if (weather.timezone) {
        setTimezone(weather.timezone);
      } else {
        // Si no viene, calcular offset aproximado
        // Bogotá es UTC-5 = -18000 segundos
        const estimatedOffset = -weather.coord.lon * 4 * 60; // 4 minutos por grado
        setTimezone(Math.round(estimatedOffset));
      }
    }
  }, [weather]);

  // Actualizar hora local de la ciudad
  useEffect(() => {
    if (!weather || timezone === null) return;

    const updateCityTime = () => {
      const now = new Date();
      const utcTime = now.getTime();
      const cityTime = new Date(utcTime + (timezone * 1000));
      
      const hours = cityTime.getUTCHours().toString().padStart(2, '0');
      const minutes = cityTime.getUTCMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
      
      const hour = cityTime.getUTCHours();
      setIsDay(hour >= 6 && hour < 18);
    };

    updateCityTime();
    const interval = setInterval(updateCityTime, 60000);
    return () => clearInterval(interval);
  }, [weather, timezone]);

  // Actualizar fondo según clima y hora local de la ciudad
  useEffect(() => {
    if (weather && weather.weather && weather.weather[0]) {
      const imageUrl = getWeatherBackground(weather, isDay);
      const overlay = getOverlayColor(isDay);
      setBackgroundImage(imageUrl);
      setOverlayColor(overlay);
    }
  }, [weather, isDay]);

  // Formatear hora del amanecer/atardecer usando el offset de la ciudad
  const formatSunTime = (timestamp) => {
    if (!timestamp || timezone === null) return '--:--';
    // El timestamp de sunrise/sunset está en UTC, aplicamos el offset
    const localTime = new Date((timestamp + timezone) * 1000);
    const hours = localTime.getUTCHours().toString().padStart(2, '0');
    const minutes = localTime.getUTCMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

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
      
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div className="card-header">
          <div>
            <h2 className="city-name">{weather.name}, {weather.sys.country}</h2>
            <div className="city-timezone">
              Hora local: {currentTime || '--:--'}
            </div>
          </div>
          <div className="header-right">
            <button 
              onClick={() => onAddFavorite(weather.name)}
              className={`favorite-btn-modern ${isFavorite ? 'active' : ''}`}
              title={isFavorite ? 'Eliminar de favoritos' : 'Agregar a favoritos'}
            >
              {isFavorite ? '⭐' : '☆'}
            </button>
          </div>
        </div>

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

        <div className="temp-range">
          <span>🌡️ Día {convertTemp(weather.main.temp_max)}{getTempSymbol()}</span>
          <span>🌙 Noche {convertTemp(weather.main.temp_min)}{getTempSymbol()}</span>
        </div>

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

        <div className="sun-times">
          <div className="sun-item">
            <span className="sun-icon">🌅</span>
            <span>Amanecer: {formatSunTime(weather.sys.sunrise)}</span>
          </div>
          <div className="sun-item">
            <span className="sun-icon">🌇</span>
            <span>Atardecer: {formatSunTime(weather.sys.sunset)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;