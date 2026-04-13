import React from 'react';

function Footer() {
  const footerStyle = {
    marginTop: '40px',
    padding: '20px',
    textAlign: 'center',
    fontSize: '12px',
    opacity: 0.8,
    borderTop: '1px solid rgba(255,255,255,0.2)'
  };

  return (
    <footer style={footerStyle}>
      Weather data © OpenWeather
    </footer>
  );
}

export default Footer;