import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🌤️ WeatherApp
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
              Inicio
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/terms" className={`nav-link ${isActive('/terms') ? 'active' : ''}`}>
              Términos
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/privacy" className={`nav-link ${isActive('/privacy') ? 'active' : ''}`}>
              Privacidad
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/cookies" className={`nav-link ${isActive('/cookies') ? 'active' : ''}`}>
              Cookies
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/data-sources" className={`nav-link ${isActive('/data-sources') ? 'active' : ''}`}>
              Fuentes
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;