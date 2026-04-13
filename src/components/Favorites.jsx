import React from 'react';

function Favorites({ favorites, onSelectCity, onRemoveFavorite }) {
  if (favorites.length === 0) {
    return (
      <div className="favorites-section">
        <h3>⭐ Ciudades favoritas</h3>
        <p className="no-favorites">No tienes ciudades favoritas aún. Haz clic en ⭐ para agregar.</p>
      </div>
    );
  }

  return (
    <div className="favorites-section">
      <h3>⭐ Ciudades favoritas</h3>
      <div className="favorites-list">
        {favorites.map((city, index) => (
          <div key={index} className="favorite-item">
            <span onClick={() => onSelectCity(city)} className="favorite-city-name">
              🌆 {city}
            </span>
            <button 
              onClick={() => onRemoveFavorite(city)}
              className="remove-favorite"
              title="Eliminar de favoritos"
            >
              ❌
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;