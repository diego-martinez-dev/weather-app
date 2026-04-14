import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer style={{ 
      marginTop: '40px', 
      padding: '20px', 
      textAlign: 'center', 
      fontSize: '12px', 
      opacity: 0.8,
      borderTop: '1px solid #ddd'
    }}>
      <div style={{ marginBottom: '10px' }}>
        <Link to="/terms" style={{ color: '#666', margin: '0 10px', textDecoration: 'none' }}>Términos de uso</Link>
        <Link to="/privacy" style={{ color: '#666', margin: '0 10px', textDecoration: 'none' }}>Política de privacidad</Link>
        <Link to="/cookies" style={{ color: '#666', margin: '0 10px', textDecoration: 'none' }}>Política de cookies</Link>
        <Link to="/data-sources" style={{ color: '#666', margin: '0 10px', textDecoration: 'none' }}>Fuentes de datos</Link>
      </div>
      <div>
        Weather data © OpenWeather | © 2026 WeatherApp - Tu clima en tiempo real
      </div>
    </footer>
  );
}

export default Footer;