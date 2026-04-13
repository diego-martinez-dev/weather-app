import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const API_KEY = '91ca0e29e5a576e51887bc6e349bbd9d'; 

  const fetchWeather = async () => {
    if (!city) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`
      );
      setWeather(response.data);
    } catch (err) {
      setError('Ciudad no encontrada. Verifica el nombre.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>🌤️ Aplicación del Clima</h1>
      
      <div className="search-box">
        <input
          type="text"
          placeholder="Ej: Madrid, London, Tokyo..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && fetchWeather()}
        />
        <button onClick={fetchWeather}>Buscar</button>
      </div>

      {loading && <p>Cargando...</p>}
      
      {error && <p className="error">{error}</p>}

      {weather && (
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
      )}
    </div>
  );
}

export default App;