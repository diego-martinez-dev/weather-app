import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useSettings } from '../contexts/SettingsContext';
import WeatherCard from '../components/WeatherCard';
import WeatherMap from '../components/WeatherMap';
import LoadingSpinner from '../components/LoadingSpinner';
import Favorites from '../components/Favorites';
import { getCoordinates } from '../services/weatherAPI';
import { API_KEY } from '../config';

function Home() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [weather, setWeather] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  
  const { convertTemp, getTempSymbol } = useSettings();
  

  const cityFromUrl = searchParams.get('city');

  const fetchWeatherByCity = useCallback(async (cityName) => {
    if (!cityName) return;
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric&lang=es`);
      setWeather(response.data);
      
      // Obtener coordenadas para el mapa
      const coords = await getCoordinates(cityName);
      if (coords) {
        setCoordinates({ lat: coords.lat, lon: coords.lon });
      }
    } catch (err) {
      setError(t('app.search.error'));
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }, [t]);

  const fetchWeatherByCoords = useCallback(async (lat, lon) => {
    setLoading(true);
    setError('');
    try {
      const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`);
      const geoResponse = await axios.get(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`);
      const cityName = geoResponse.data[0]?.name || weatherResponse.data.name;
      const updatedWeather = { ...weatherResponse.data, name: cityName };
      setWeather(updatedWeather);
      setCoordinates({ lat, lon });
    } catch (err) {
      setError(t('app.search.location_error'));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    if (cityFromUrl) {
      fetchWeatherByCity(cityFromUrl);
    }
  }, [cityFromUrl, fetchWeatherByCity]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteCities');
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
  }, []);

  useEffect(() => {
    localStorage.setItem('favoriteCities', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (!cityFromUrl) {
      const getLocationOnLoad = () => {
        if (navigator.geolocation) {
          setLoading(true);
          navigator.geolocation.getCurrentPosition(
            (position) => fetchWeatherByCoords(position.coords.latitude, position.coords.longitude),
            () => { setError(t('app.search.location_error')); setLoading(false); fetchWeatherByCity('Madrid'); }
          );
        } else {
          setError(t('app.search.geolocation_error'));
          fetchWeatherByCity('Madrid');
        }
      };
      getLocationOnLoad();
    }
  }, [fetchWeatherByCoords, fetchWeatherByCity, t, cityFromUrl]);

  const addFavorite = (cityName) => {
    if (!favorites.includes(cityName)) {
      setFavorites([...favorites, cityName]);
    } else {
      setFavorites(favorites.filter(fav => fav !== cityName));
    }
  };

  const selectFavoriteCity = (cityName) => {
    fetchWeatherByCity(cityName);
  };

  const isFavorite = (cityName) => favorites.includes(cityName);

  return (
    <div className="home-two-columns">
      <h1>{t('app.title')}</h1>
      
      <Favorites 
        favorites={favorites} 
        onSelectCity={selectFavoriteCity} 
        onRemoveFavorite={addFavorite} 
      />
      
      {loading && <LoadingSpinner />}
      {error && <p className="error">{error}</p>}
      
      {weather && (
        <div className="two-column-layout">
          {/* Columna izquierda - Weather Card */}
          <div className="left-column">
            <WeatherCard 
              weather={weather} 
              convertTemp={convertTemp} 
              getTempSymbol={getTempSymbol} 
              onAddFavorite={addFavorite} 
              isFavorite={isFavorite(weather.name)} 
            />
          </div>
          
          {/* Columna derecha - Mapa */}
          <div className="right-column">
            {coordinates && (
              <WeatherMap 
                lat={coordinates.lat} 
                lon={coordinates.lon} 
                cityName={weather.name}
                tempCelsius={weather.main.temp}  // ← Valor original en °C para la posición
                tempDisplay={`${convertTemp(weather.main.temp)}${getTempSymbol()}`}  // ← Valor mostrado en la unidad actual
                API_KEY={API_KEY}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;