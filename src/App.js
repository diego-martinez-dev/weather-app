import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import Footer from './components/Footer';
import SearchBox from './components/SearchBox';
import WeatherCard from './components/WeatherCard';
import LoadingSpinner from './components/LoadingSpinner';

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
      
      <SearchBox 
        city={city}
        setCity={setCity}
        onSearch={fetchWeather}
      />

      {loading && <LoadingSpinner />}
      
      {error && <p className="error">{error}</p>}

      {weather && <WeatherCard weather={weather} />}

      <Footer />
    </div>
  );
}

export default App;