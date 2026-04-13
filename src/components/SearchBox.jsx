import React, { useState, useEffect, useRef } from 'react';

// Lista de ciudades populares para sugerencias
const popularCities = [
  'Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Zaragoza', 'Málaga', 'Murcia', 'Palma',
  'London', 'Manchester', 'Birmingham', 'Liverpool',
  'Paris', 'Marseille', 'Lyon', 'Toulouse',
  'New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami',
  'Tokyo', 'Osaka', 'Kyoto', 'Yokohama',
  'Berlin', 'Munich', 'Hamburg', 'Cologne',
  'Rome', 'Milan', 'Naples', 'Turin',
  'Buenos Aires', 'Mexico City', 'Bogota', 'Santiago', 'Lima'
];

function SearchBox({ city, setCity, onSearch }) {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef(null);

  // Filtrar sugerencias mientras el usuario escribe
  const handleInputChange = (e) => {
    const value = e.target.value;
    setCity(value);
    
    if (value.length > 1) {
      const filtered = popularCities.filter(cityName =>
        cityName.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 6)); // Máximo 6 sugerencias
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Seleccionar una sugerencia
  const selectSuggestion = (suggestion) => {
    setCity(suggestion);
    setSuggestions([]);
    setShowSuggestions(false);
    onSearch(); // Buscar automáticamente al seleccionar
  };

  // Cerrar sugerencias al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setShowSuggestions(false);
      onSearch();
    }
  };

  return (
    <div className="search-box" ref={wrapperRef}>
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Ej: Madrid, London, Tokyo..."
          value={city}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          onFocus={() => city.length > 1 && setShowSuggestions(true)}
        />
        <button onClick={onSearch}>Buscar</button>
      </div>
      
      {/* Sugerencias */}
      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => selectSuggestion(suggestion)}>
              🔍 {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBox;