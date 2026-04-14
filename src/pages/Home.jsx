import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useSettings } from '../contexts/SettingsContext';
import SearchBox from '../components/SearchBox';
import WeatherCard from '../components/WeatherCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Favorites from '../components/Favorites';

function Home() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  
  const { convertTemp, getTempSymbol } = useSettings();
  const API_KEY = '91ca0e29e5a576e51887bc6e349bbd9d';

  // Verificar si hay ciudad en la URL (desde la búsqueda del header)
  const cityFromUrl = searchParams.get('city');

  const fetchWeatherByCity = useCallback(async (cityName) => {
    if (!cityName) return;
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric&lang=es`);
      setWeather(response.data);
      setCity(cityName);
    } catch (err) {
      setError(t('app.search.error'));
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }, [API_KEY, t]);

  const fetchWeatherByCoords = useCallback(async (lat, lon) => {
    setLoading(true);
    setError('');
    try {
      const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`);
      const geoResponse = await axios.get(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`);
      const cityName = geoResponse.data[0]?.name || weatherResponse.data.name;
      const updatedWeather = { ...weatherResponse.data, name: cityName };
      setWeather(updatedWeather);
      setCity(cityName);
    } catch (err) {
      setError(t('app.search.location_error'));
    } finally {
      setLoading(false);
    }
  }, [API_KEY, t]);

  // Si hay ciudad en URL, buscarla al cargar
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
    // Solo obtener ubicación si no hay ciudad en URL
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

  const handleSearch = (searchCity) => fetchWeatherByCity(searchCity || city);
  const addFavorite = (cityName) => {
    if (!favorites.includes(cityName)) setFavorites([...favorites, cityName]);
    else setFavorites(favorites.filter(fav => fav !== cityName));
  };
  const selectFavoriteCity = (cityName) => { setCity(cityName); fetchWeatherByCity(cityName); };
  const isFavorite = (cityName) => favorites.includes(cityName);

  return (
    <div>
      <h1>{t('app.title')}</h1>
      <SearchBox city={city} setCity={setCity} onSearch={() => handleSearch()} />
      <Favorites favorites={favorites} onSelectCity={selectFavoriteCity} onRemoveFavorite={addFavorite} />
      {loading && <LoadingSpinner />}
      {error && <p className="error">{error}</p>}
      {weather && <WeatherCard weather={weather} convertTemp={convertTemp} getTempSymbol={getTempSymbol} onAddFavorite={addFavorite} isFavorite={isFavorite(weather.name)} />}
    </div>
  );
}

export default Home;