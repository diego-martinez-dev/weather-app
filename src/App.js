import React, { useState } from 'react';
import './App.css';
import Weather from './components/Weather';

function App() {
  const [city, setCity] = useState('');
  const [showWeather, setShowWeather] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim() !== '') {
      setShowWeather(true);
    }
  };

  return (
    <div className="app">
      <h1>🌤️ Weather App</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {showWeather && <Weather city={city} />}
    </div>
  );
}

export default App;