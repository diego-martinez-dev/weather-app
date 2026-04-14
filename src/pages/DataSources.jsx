import React from 'react';
import './LegalPages.css';

function DataSources() {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <h1>Fuentes de Datos</h1>
        <p className="last-updated">Última actualización: 13 de abril de 2026</p>

        <section>
          <h2>1. Datos Meteorológicos</h2>
          <p>Todos los datos meteorológicos son proporcionados por <strong>OpenWeatherMap</strong>, un servicio líder en información meteorológica global.</p>
          <p>OpenWeatherMap recopila datos de:</p>
          <ul>
            <li>Estaciones meteorológicas oficiales globales</li>
            <li>Satélites meteorológicos</li>
            <li>Radares meteorológicos</li>
            <li>Modelos de predicción numérica del tiempo</li>
          </ul>
          <p>Más información: <a href="https://openweathermap.org/" target="_blank" rel="noopener noreferrer">OpenWeatherMap.org</a></p>
        </section>

        <section>
          <h2>2. Precisión y Actualización</h2>
          <p>Los datos se actualizan regularmente según los ciclos de OpenWeatherMap. La información mostrada incluye:</p>
          <ul>
            <li>Temperatura actual y sensación térmica</li>
            <li>Humedad relativa</li>
            <li>Velocidad y dirección del viento</li>
            <li>Descripción de condiciones climáticas</li>
            <li>Iconos representativos del clima</li>
          </ul>
        </section>

        <section>
          <h2>3. Atribución</h2>
          <p>Esta aplicación utiliza datos de OpenWeatherMap bajo los términos de su licencia. Se requiere atribución, la cual se encuentra visible en el pie de página de nuestra aplicación.</p>
          <p>© 2026 OpenWeatherMap. Todos los derechos reservados.</p>
        </section>

        <section>
          <h2>4. Limitaciones</h2>
          <p>Los datos meteorológicos pueden tener retrasos o variaciones. Para decisiones críticas (viajes, eventos al aire libre, etc.), recomendamos consultar fuentes oficiales adicionales.</p>
        </section>

        <section>
          <h2>5. Enlaces de Interés</h2>
          <ul>
            <li><a href="https://openweathermap.org/faq" target="_blank" rel="noopener noreferrer">Preguntas frecuentes de OpenWeatherMap</a></li>
            <li><a href="https://openweathermap.org/api" target="_blank" rel="noopener noreferrer">Documentación de la API</a></li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default DataSources;