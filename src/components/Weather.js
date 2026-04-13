import React, { useState, useEffect } from 'react';
import './Weather.css';

const Weather = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ⚠️ IMPORTANTE: Reemplaza "TU_API_KEY_AQUI" con tu API key de OpenWeatherMap
  const API_KEY = '91ca0e29e5a576e51887bc6e349bbd9d';

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError('');
      
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`
        );
        
        if (!response.ok) {
          throw new Error('City not found');
        }
        
        const data = await response.json();
        setWeatherData(data);
      } catch (err) {
        setError(err.message);
        setWeatherData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city, API_KEY]);

  if (loading) {
    return <div className="loading">Loading weather data...</div>;
  }

  if (error) {
    return <div className="error">❌ {error}. Please try another city.</div>;
  }

  if (!weatherData) {
    return null;
  }

  // Función para obtener icono del clima
  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  return (
    <div className="weather-card">
      <h2>
        {weatherData.name}, {weatherData.sys.country}
      </h2>
      
      <div className="weather-main">
        <img 
          src={getWeatherIcon(weatherData.weather[0].icon)} 
          alt={weatherData.weather[0].description}
        />
        <div className="temperature">
          {Math.round(weatherData.main.temp)}°C
        </div>
      </div>

      <div className="weather-description">
        {weatherData.weather[0].description}
      </div>

      <div className="weather-details">
        <div className="detail">
          <span>🌡️ Feels like</span>
          <strong>{Math.round(weatherData.main.feels_like)}°C</strong>
        </div>
        <div className="detail">
          <span>💧 Humidity</span>
          <strong>{weatherData.main.humidity}%</strong>
        </div>
        <div className="detail">
          <span>💨 Wind</span>
          <strong>{weatherData.wind.speed} m/s</strong>
        </div>
        <div className="detail">
          <span>📊 Pressure</span>
          <strong>{weatherData.main.pressure} hPa</strong>
        </div>
      </div>
    </div>
  );
};

export default Weather;