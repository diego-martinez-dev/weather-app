import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import SearchBox from '../components/SearchBox';
import WeatherCard from '../components/WeatherCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Favorites from '../components/Favorites';

function Home() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const API_KEY = '91ca0e29e5a576e51887bc6e349bbd9d';

  const fetchWeatherByCity = useCallback(async (cityName) => {
    if (!cityName) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric&lang=es`
      );
      setWeather(response.data);
      setCity(cityName);
    } catch (err) {
      setError('Ciudad no encontrada. Verifica el nombre.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }, [API_KEY]);

  const fetchWeatherByCoords = useCallback(async (lat, lon) => {
    setLoading(true);
    setError('');
    
    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`
      );
      
      const geoResponse = await axios.get(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
      );
      
      const cityName = geoResponse.data[0]?.name || weatherResponse.data.name;
      
      const updatedWeather = {
        ...weatherResponse.data,
        name: cityName
      };
      
      setWeather(updatedWeather);
      setCity(cityName);
    } catch (err) {
      setError('No se pudo obtener el clima de tu ubicación');
    } finally {
      setLoading(false);
    }
  }, [API_KEY]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteCities');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favoriteCities', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const getLocationOnLoad = () => {
      if (navigator.geolocation) {
        setLoading(true);
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeatherByCoords(latitude, longitude);
          },
          (error) => {
            console.log('Error de geolocalización:', error);
            setError('No pudimos obtener tu ubicación. Busca una ciudad manualmente.');
            setLoading(false);
            fetchWeatherByCity('Madrid');
          }
        );
      } else {
        setError('Tu navegador no soporta geolocalización');
        fetchWeatherByCity('Madrid');
      }
    };

    getLocationOnLoad();
  }, [fetchWeatherByCoords, fetchWeatherByCity]);

  const handleSearch = (searchCity) => {
    const cityToSearch = searchCity || city;
    if (cityToSearch) {
      fetchWeatherByCity(cityToSearch);
    }
  };

  const addFavorite = (cityName) => {
    if (!favorites.includes(cityName)) {
      setFavorites([...favorites, cityName]);
    } else {
      removeFavorite(cityName);
    }
  };

  const removeFavorite = (cityName) => {
    setFavorites(favorites.filter(fav => fav !== cityName));
  };

  const selectFavoriteCity = (cityName) => {
    setCity(cityName);
    fetchWeatherByCity(cityName);
  };

  const isFavorite = (cityName) => favorites.includes(cityName);

  return (
    <div>
      <h1>🌤️ Aplicación del Clima</h1>
      
      <SearchBox 
        city={city}
        setCity={setCity}
        onSearch={() => handleSearch()}
      />

      <Favorites 
        favorites={favorites}
        onSelectCity={selectFavoriteCity}
        onRemoveFavorite={removeFavorite}
      />

      {loading && <LoadingSpinner />}
      
      {error && <p className="error">{error}</p>}

      {weather && (
        <WeatherCard 
          weather={weather} 
          onAddFavorite={addFavorite}
          isFavorite={isFavorite(weather.name)}
        />
      )}
    </div>
  );
}

export default Home;