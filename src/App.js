import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './App.css';
import Footer from './components/Footer';
import SearchBox from './components/SearchBox';
import WeatherCard from './components/WeatherCard';
import LoadingSpinner from './components/LoadingSpinner';
import Favorites from './components/Favorites';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const API_KEY = '91ca0e29e5a576e51887bc6e349bbd9d';

  // Definir fetchWeather con useCallback para poder usarlo en useEffect
  const fetchWeather = useCallback(async (cityName = city) => {
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
  }, [city, API_KEY]);

  // Cargar favoritos al iniciar
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteCities');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Guardar favoritos cuando cambien
  useEffect(() => {
    localStorage.setItem('favoriteCities', JSON.stringify(favorites));
  }, [favorites]);

  // Obtener ubicación automática al cargar la página
  useEffect(() => {
    const getLocationOnLoad = () => {
      if (navigator.geolocation) {
        setLoading(true);
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=es`
              );
              setWeather(response.data);
              setCity(response.data.name);
              setError('');
            } catch (err) {
              setError('No se pudo obtener el clima de tu ubicación');
              fetchWeather('Madrid');
            } finally {
              setLoading(false);
            }
          },
          (error) => {
            console.log('Error de geolocalización:', error);
            setError('No pudimos obtener tu ubicación. Busca una ciudad manualmente.');
            setLoading(false);
            fetchWeather('Madrid');
          }
        );
      } else {
        setError('Tu navegador no soporta geolocalización');
        fetchWeather('Madrid');
      }
    };

    getLocationOnLoad();
  }, [fetchWeather, API_KEY]); // Agregamos las dependencias correctas

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
    fetchWeather(cityName);
  };

  const isFavorite = (cityName) => favorites.includes(cityName);

  return (
    <div className="App">
      <h1>🌤️ Aplicación del Clima</h1>
      
      <SearchBox 
        city={city}
        setCity={setCity}
        onSearch={() => fetchWeather()}
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

      <Footer />
    </div>
  );
}

export default App;