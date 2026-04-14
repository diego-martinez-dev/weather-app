import React, { createContext, useState, useContext, useEffect } from 'react';
import i18n from '../i18n';

const SettingsContext = createContext();

export function useSettings() {
  return useContext(SettingsContext);
}

export function SettingsProvider({ children }) {
  const [unit, setUnit] = useState(() => {
    return localStorage.getItem('temperatureUnit') || 'celsius';
  });
  
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'es';
  });
  
  const [country, setCountry] = useState(() => {
    return localStorage.getItem('country') || 'ES';
  });

  // Cambiar idioma en i18n cuando cambie la preferencia
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('temperatureUnit', unit);
  }, [unit]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('country', country);
  }, [country]);

  const convertTemp = (celsius) => {
    if (unit === 'fahrenheit') {
      return Math.round((celsius * 9/5) + 32);
    }
    return Math.round(celsius);
  };

  const getTempSymbol = () => {
    return unit === 'celsius' ? '°C' : '°F';
  };

  const detectCountryByIP = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      if (data && data.country_code) {
        setCountry(data.country_code);
      }
    } catch (error) {
      console.error('Error detectando país por IP:', error);
    }
  };

  useEffect(() => {
    const initCountry = async () => {
      const savedCountry = localStorage.getItem('country');
      if (!savedCountry || savedCountry === 'ES') {
        await detectCountryByIP();
      }
    };
    initCountry();
  }, []);

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