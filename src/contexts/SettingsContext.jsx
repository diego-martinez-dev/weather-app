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
    return localStorage.getItem('country') || 'ES';
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

  const value = {
    unit,
    setUnit,
    language,
    setLanguage,
    country,
    setCountry,
    convertTemp,
    getTempSymbol
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}