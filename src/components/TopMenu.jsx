import React, { useState, useRef, useEffect } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import './TopMenu.css';

function TopMenu() {
  const { unit, setUnit, language, setLanguage, country, setCountry, getTempSymbol } = useSettings();
  
  const [showUnitDropdown, setShowUnitDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  
  const unitRef = useRef(null);
  const languageRef = useRef(null);
  const countryRef = useRef(null);

  // Cerrar dropdowns al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (unitRef.current && !unitRef.current.contains(event.target)) {
        setShowUnitDropdown(false);
      }
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setShowLanguageDropdown(false);
      }
      if (countryRef.current && !countryRef.current.contains(event.target)) {
        setShowCountryDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Países y sus códigos
  const countries = [
    { code: 'ES', name: 'España', flag: '🇪🇸' },
    { code: 'MX', name: 'México', flag: '🇲🇽' },
    { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
    { code: 'CO', name: 'Colombia', flag: '🇨🇴' },
    { code: 'CL', name: 'Chile', flag: '🇨🇱' },
    { code: 'PE', name: 'Perú', flag: '🇵🇪' },
    { code: 'US', name: 'Estados Unidos', flag: '🇺🇸' },
    { code: 'UK', name: 'Reino Unido', flag: '🇬🇧' },
    { code: 'FR', name: 'Francia', flag: '🇫🇷' },
    { code: 'DE', name: 'Alemania', flag: '🇩🇪' },
    { code: 'IT', name: 'Italia', flag: '🇮🇹' },
    { code: 'BR', name: 'Brasil', flag: '🇧🇷' },
    { code: 'VE', name: 'Venezuela', flag: '🇻🇪' },
    { code: 'EC', name: 'Ecuador', flag: '🇪🇨' },
    { code: 'BO', name: 'Bolivia', flag: '🇧🇴' },
    { code: 'PY', name: 'Paraguay', flag: '🇵🇾' },
    { code: 'UY', name: 'Uruguay', flag: '🇺🇾' },
    { code: 'CR', name: 'Costa Rica', flag: '🇨🇷' },
    { code: 'PA', name: 'Panamá', flag: '🇵🇦' },
    { code: 'DO', name: 'República Dominicana', flag: '🇩🇴' },
    { code: 'PR', name: 'Puerto Rico', flag: '🇵🇷' },
  ];

  // Idiomas disponibles
  const languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
  ];

  const getCountryFlag = () => {
    const found = countries.find(c => c.code === country);
    return found ? found.flag : '🌍';
  };

  const getLanguageFlag = () => {
    const found = languages.find(l => l.code === language);
    return found ? found.flag : '🇪🇸';
  };

  const getLanguageName = () => {
    const found = languages.find(l => l.code === language);
    return found ? found.name : 'Español';
  };

  return (
    <div className="top-menu">
      <div className="top-menu-container">
        {/* Logo o nombre */}
        <div className="menu-logo">
          🌤️ WeatherApp
        </div>

        {/* Sección derecha */}
        <div className="menu-right">
          {/* Selector de País - Ahora con dropdown */}
          <div className="menu-item dropdown" ref={countryRef}>
            <span 
              className="dropdown-trigger"
              onClick={() => setShowCountryDropdown(!showCountryDropdown)}
            >
              {getCountryFlag()} {country} ▼
            </span>
            {showCountryDropdown && (
              <div className="dropdown-menu country-dropdown">
                {countries.map((c) => (
                  <div 
                    key={c.code}
                    className={`dropdown-item ${country === c.code ? 'active' : ''}`}
                    onClick={() => {
                      setCountry(c.code);
                      setShowCountryDropdown(false);
                    }}
                  >
                    {c.flag} {c.code} - {c.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Selector de Temperatura */}
          <div className="menu-item dropdown" ref={unitRef}>
            <span 
              className="dropdown-trigger"
              onClick={() => setShowUnitDropdown(!showUnitDropdown)}
            >
              {getTempSymbol()} ▼
            </span>
            {showUnitDropdown && (
              <div className="dropdown-menu">
                <div 
                  className={`dropdown-item ${unit === 'celsius' ? 'active' : ''}`}
                  onClick={() => {
                    setUnit('celsius');
                    setShowUnitDropdown(false);
                  }}
                >
                  🌡️ Celsius (°C)
                </div>
                <div 
                  className={`dropdown-item ${unit === 'fahrenheit' ? 'active' : ''}`}
                  onClick={() => {
                    setUnit('fahrenheit');
                    setShowUnitDropdown(false);
                  }}
                >
                  🌡️ Fahrenheit (°F)
                </div>
              </div>
            )}
          </div>

          {/* Selector de Idioma */}
          <div className="menu-item dropdown" ref={languageRef}>
            <span 
              className="dropdown-trigger"
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            >
              {getLanguageFlag()} {getLanguageName()} ▼
            </span>
            {showLanguageDropdown && (
              <div className="dropdown-menu">
                {languages.map((lang) => (
                  <div 
                    key={lang.code}
                    className={`dropdown-item ${language === lang.code ? 'active' : ''}`}
                    onClick={() => {
                      setLanguage(lang.code);
                      setShowLanguageDropdown(false);
                    }}
                  >
                    {lang.flag} {lang.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopMenu;