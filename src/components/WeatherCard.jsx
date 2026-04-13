import React from 'react';

function WeatherCard({ weather }) {
  return (
    <div className="weather-info">
      <h2>
        {weather.name}, {weather.sys.country}
      </h2>
      <div className="temperature">
        {Math.round(weather.main.temp)}°C
      </div>
      <div className="weather-description">
        <img 
          src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`} 
          alt={weather.weather[0].description}
        />
        <p>{weather.weather[0].description}</p>
      </div>
      <div className="details">
        <div>🌡️ Sensación: {Math.round(weather.main.feels_like)}°C</div>
        <div>💧 Humedad: {weather.main.humidity}%</div>
        <div>💨 Viento: {weather.wind.speed} m/s</div>
      </div>
    </div>
  );
}

export default WeatherCard;