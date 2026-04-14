import React, { createContext, useState, useContext, useEffect } from 'react';

const SettingsContext = createContext();

export function useSettings() {
  return useContext(SettingsContext);
}

export function SettingsProvider({ children }) {
  // Cargar configuraciones guardadas en localStorage
  const [unit, setUnit] = useState(() => {
    return localStorage.getItem('temperatureUnit') || 'celsius';
  });
  
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'es';
  });
  
  const [country, setCountry] = useState(() => {
    return localStorage.getItem('country') || 'ES'; // Valor por defecto
  });

  // Guardar cuando cambien
  useEffect(() => {
    localStorage.setItem('temperatureUnit', unit);
  }, [unit]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('country', country);
  }, [country]);

  // Convertir temperatura según unidad
  const convertTemp = (celsius) => {
    if (unit === 'fahrenheit') {
      return Math.round((celsius * 9/5) + 32);
    }
    return Math.round(celsius);
  };

  // Obtener símbolo de temperatura
  const getTempSymbol = () => {
    return unit === 'celsius' ? '°C' : '°F';
  };

  // Detectar país desde coordenadas
  const detectCountryFromCoords = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=90bf728b241468d111bced5d64a44730`
      );
      const data = await response.json();
      if (data && data[0] && data[0].country) {
        const detectedCountry = data[0].country;
        setCountry(detectedCountry);
        return detectedCountry;
      }
    } catch (error) {
      console.error('Error detectando país:', error);
    }
    return null;
  };

  const value = {
    unit,
    setUnit,
    language,
    setLanguage,
    country,
    setCountry,
    convertTemp,
    getTempSymbol,
    detectCountryFromCoords
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}