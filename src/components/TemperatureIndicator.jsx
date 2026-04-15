import React from 'react';
import './TemperatureIndicator.css';

function TemperatureIndicator({ tempCelsius, tempDisplay, minTemp = -45, maxTemp = 54 }) {
  // Calcular el porcentaje usando la temperatura en Celsius (para la posición)
  const percentage = ((tempCelsius - minTemp) / (maxTemp - minTemp)) * 100;
  const clampedPercentage = Math.min(100, Math.max(0, percentage));
  
  // Determinar el color según la temperatura (usando Celsius)
  const getColorByTemp = (temperature) => {
    if (temperature <= -29) return '#0033cc';
    if (temperature <= -12) return '#1a66ff';
    if (temperature <= 4) return '#66ccff';
    if (temperature <= 21) return '#99ff99';
    if (temperature <= 38) return '#ffcc00';
    if (temperature <= 54) return '#ff6600';
    return '#ff0000';
  };
  
  const indicatorColor = getColorByTemp(tempCelsius);
  
  // Rangos de temperatura (siempre en Celsius para la barra)
  const ranges = [
    { value: -45, label: '-45°C' },
    { value: -29, label: '-29°' },
    { value: -12, label: '-12°' },
    { value: 4, label: '4°' },
    { value: 21, label: '21°' },
    { value: 38, label: '38°' },
    { value: 54, label: '54°' }
  ];
  
  return (
    <div className="temperature-indicator">
      {/* Puntero de temperatura actual */}
      <div className="temp-pointer-container">
        <div
          className="temp-pointer"
          style={{
            left: `${clampedPercentage}%`,
          }}
        >
          <span className="temp-pointer-value">
            {tempDisplay}  {/* ← Mostramos el valor en la unidad actual */}
          </span>
          <div 
            className="temp-pointer-arrow" 
            style={{ borderTopColor: indicatorColor }}
          />
        </div>
      </div>
      
      {/* Barra de colores */}
      <div className="temp-range-bar">
        {ranges.map((range, index) => (
          <div
            key={index}
            className="temp-range-segment"
            style={{
              flex: 1,
              backgroundColor: getColorByTemp(range.value),
            }}
            title={`${range.label}`}
          />
        ))}
      </div>
      
      {/* Marcadores de temperatura */}
      <div className="temp-marks">
        {ranges.map((range, index) => (
          <span key={index} className="temp-mark">
            {range.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default TemperatureIndicator;