import React, { useState, useEffect } from 'react';

function WeatherCard({ weather, convertTemp, getTempSymbol, onAddFavorite, isFavorite }) {
  const [background, setBackground] = useState('');

  const getBackgroundByWeather = (weatherCondition) => {
    const condition = weatherCondition?.toLowerCase() || '';
    if (condition.includes('clear') || condition.includes('sun')) {
      return 'linear-gradient(135deg, #f5af19, #f12711)';
    }
    if (condition.includes('cloud')) {
      return 'linear-gradient(135deg, #757F9A, #D7DDE8)';
    }
    if (condition.includes('rain') || condition.includes('drizzle')) {
      return 'linear-gradient(135deg, #2c3e50, #3498db)';
    }
    if (condition.includes('snow')) {
      return 'linear-gradient(135deg, #e0eafc, #cfdef3)';
    }
    if (condition.includes('thunder')) {
      return 'linear-gradient(135deg, #141E30, #243B55)';
    }
    return 'linear-gradient(135deg, #667eea, #764ba2)';
  };

  useEffect(() => {
    if (weather && weather.weather && weather.weather[0]) {
      setBackground(getBackgroundByWeather(weather.weather[0].description));
    }
  }, [weather]);

  if (!weather) return null;

  return (
    <div className="weather-info" style={{ background }}>
      <div className="weather-header">
        <h2>
          {weather.name}, {weather.sys.country}
        </h2>
        <button 
          onClick={() => onAddFavorite(weather.name)}
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          title={isFavorite ? 'Eliminar de favoritos' : 'Agregar a favoritos'}
        >
          {isFavorite ? '⭐' : '☆'}
        </button>
      </div>
      <div className="temperature">
        {convertTemp(weather.main.temp)}{getTempSymbol()}
      </div>
      <div className="weather-description">
        <img 
          src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`} 
          alt={weather.weather[0].description}
        />
        <p>{weather.weather[0].description}</p>
      </div>
      <div className="details">
        <div>🌡️ Sensación: {convertTemp(weather.main.feels_like)}{getTempSymbol()}</div>
        <div>💧 Humedad: {weather.main.humidity}%</div>
        <div>💨 Viento: {weather.wind.speed} m/s</div>
      </div>
    </div>
  );
}

export default WeatherCard;