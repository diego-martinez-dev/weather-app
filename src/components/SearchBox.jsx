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
    <div className="search-box" ref={wrapperRef}>
      <div className="search-input-container">
        <input type="text" placeholder={t('app.search.placeholder')} value={city} onChange={handleInputChange} onKeyPress={(e) => e.key === 'Enter' && onSearch()} onFocus={() => city.length > 1 && setShowSuggestions(true)} />
        <button onClick={onSearch}>{t('app.search.button')}</button>
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <div className="suggestions-dropdown">
          {suggestions.map((suggestion, index) => (<div key={index} className="suggestion-item" onClick={() => selectSuggestion(suggestion)}><span className="suggestion-icon">🔍</span><span className="suggestion-text">{suggestion}</span></div>))}
        </div>
      )}
    </div>
  );
}

export default SearchBox;