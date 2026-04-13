import React from 'react';

function SearchBox({ city, setCity, onSearch }) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Ej: Madrid, London, Tokyo..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button onClick={onSearch}>Buscar</button>
    </div>
  );
}

export default SearchBox;