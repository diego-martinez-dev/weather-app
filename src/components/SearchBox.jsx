import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const popularCities = ['Madrid', 'Barcelona', 'London', 'Paris', 'New York', 'Tokyo', 'Berlin', 'Rome', 'Buenos Aires', 'Mexico City', 'Bogota', 'Santiago'];

function SearchBox({ city, setCity, onSearch }) {
  const { t } = useTranslation();
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setCity(value);
    if (value.length > 1) {
      const filtered = popularCities.filter(c => c.toLowerCase().includes(value.toLowerCase()));
      setSuggestions(filtered.slice(0, 6));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (suggestion) => {
    setCity(suggestion);
    setSuggestions([]);
    setShowSuggestions(false);
    onSearch();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) setShowSuggestions(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
  <div>
    <h1>{t('app.title')}</h1>
    <Favorites favorites={favorites} onSelectCity={selectFavoriteCity} onRemoveFavorite={addFavorite} />
    {loading && <LoadingSpinner />}
    {error && <p className="error">{error}</p>}
    {weather && <WeatherCard weather={weather} convertTemp={convertTemp} getTempSymbol={getTempSymbol} onAddFavorite={addFavorite} isFavorite={isFavorite(weather.name)} />}
  </div>
  );
}

export default SearchBox;