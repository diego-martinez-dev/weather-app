import React from 'react';

function TemperatureIndicator({ temp, minTemp = -45, maxTemp = 54 }) {
  // Calcular el porcentaje de la temperatura en el rango
  const percentage = ((temp - minTemp) / (maxTemp - minTemp)) * 100;
  const clampedPercentage = Math.min(100, Math.max(0, percentage));
  
  // Determinar el color según la temperatura
  const getColorByTemp = (temperature) => {
    if (temperature <= -29) return '#0033cc';
    if (temperature <= -12) return '#1a66ff';
    if (temperature <= 4) return '#66ccff';
    if (temperature <= 21) return '#99ff99';
    if (temperature <= 38) return '#ffcc00';
    if (temperature <= 54) return '#ff6600';
    return '#ff0000';
  };
  
  const indicatorColor = getColorByTemp(temp);
  
  // Rangos de temperatura
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
      <div className="temp-range-bar">
        {ranges.map((range, index) => (
          <div
            key={index}
            className="temp-range-segment"
            style={{
              flex: 1,
              backgroundColor: getColorByTemp(range.value),
            }}
          />
        ))}
      </div>
      
      <div className="temp-marks">
        {ranges.map((range, index) => (
          <span key={index} className="temp-mark">
            {range.label}
          </span>
        ))}
      </div>
      
      <div className="temp-pointer-container">
        <div
          className="temp-pointer"
          style={{
            left: `${clampedPercentage}%`,
            backgroundColor: indicatorColor,
          }}
        >
          <div className="temp-pointer-arrow"></div>
          <span className="temp-pointer-value">{Math.round(temp)}°C</span>
        </div>
      </div>
      
      <div className="temp-hint">
        Haga clic en una temperatura para ver detalles de la ubicación
      </div>
    </div>
  );
}

export default TemperatureIndicator;