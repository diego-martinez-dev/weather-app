import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSettings } from '../contexts/SettingsContext';
import './TopMenu.css';

function TopMenu() {
  const { t } = useTranslation();
  const { unit, setUnit, language, setLanguage, country, getTempSymbol } = useSettings();
  
  const [showUnitDropdown, setShowUnitDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  
  const unitRef = useRef(null);
  const languageRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (unitRef.current && !unitRef.current.contains(event.target)) {
        setShowUnitDropdown(false);
      }
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setShowLanguageDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const countries = [
    { code: 'ES', flag: '🇪🇸' },
    { code: 'CO', flag: '🇨🇴' },
    { code: 'MX', flag: '🇲🇽' },
    { code: 'AR', flag: '🇦🇷' },
    { code: 'US', flag: '🇺🇸' },
    { code: 'UK', flag: '🇬🇧' },
  ];

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

  return (
    <div className="top-menu">
      <div className="top-menu-container">
        <div className="menu-logo">🌤️ WeatherApp</div>
        <div className="menu-right">
          <div className="menu-item">
            <span className="country-code">{getCountryFlag()} {country}</span>
          </div>

          <div className="menu-item dropdown" ref={unitRef}>
            <span className="dropdown-trigger" onClick={() => setShowUnitDropdown(!showUnitDropdown)}>
              {getTempSymbol()} ▼
            </span>
            {showUnitDropdown && (
              <div className="dropdown-menu">
                <div className={`dropdown-item ${unit === 'celsius' ? 'active' : ''}`} onClick={() => { setUnit('celsius'); setShowUnitDropdown(false); }}>
                  🌡️ {t('app.menu.celsius')} (°C)
                </div>
                <div className={`dropdown-item ${unit === 'fahrenheit' ? 'active' : ''}`} onClick={() => { setUnit('fahrenheit'); setShowUnitDropdown(false); }}>
                  🌡️ {t('app.menu.fahrenheit')} (°F)
                </div>
              </div>
            )}
          </div>

          <div className="menu-item dropdown" ref={languageRef}>
            <span className="dropdown-trigger" onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}>
              {languages.find(l => l.code === language)?.flag || '🇪🇸'} {languages.find(l => l.code === language)?.name || 'Español'} ▼
            </span>
            {showLanguageDropdown && (
              <div className="dropdown-menu">
                {languages.map((lang) => (
                  <div key={lang.code} className={`dropdown-item ${language === lang.code ? 'active' : ''}`} onClick={() => { setLanguage(lang.code); setShowLanguageDropdown(false); }}>
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