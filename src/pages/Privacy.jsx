import React from 'react';
import './LegalPages.css';

function Privacy() {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <h1>Política de Privacidad</h1>
        <p className="last-updated">Última actualización: 13 de abril de 2026</p>

        <section>
          <h2>1. Información que Recopilamos</h2>
          <p>Recopilamos la siguiente información:</p>
          <ul>
            <li><strong>Ubicación geográfica:</strong> Con tu permiso, accedemos a tu ubicación para mostrarte el clima local.</li>
            <li><strong>Ciudades favoritas:</strong> Guardamos tus ciudades favoritas en tu navegador (localStorage).</li>
            <li><strong>Datos de uso:</strong> Información anónima sobre cómo interactúas con la aplicación.</li>
          </ul>
        </section>

        <section>
          <h2>2. Cómo Usamos tu Información</h2>
          <p>Usamos tu información para:</p>
          <ul>
            <li>Mostrarte el clima de tu ubicación actual</li>
            <li>Recordar tus ciudades favoritas</li>
            <li>Mejorar nuestra aplicación basándonos en patrones de uso</li>
          </ul>
        </section>

        <section>
          <h2>3. Almacenamiento de Datos</h2>
          <p>Tus datos se almacenan localmente en tu navegador (localStorage). No almacenamos tus datos en servidores externos. Tus ciudades favoritas permanecen solo en tu dispositivo.</p>
        </section>

        <section>
          <h2>4. Servicios de Terceros</h2>
          <p>Utilizamos los siguientes servicios de terceros:</p>
          <ul>
            <li><strong>OpenWeatherMap:</strong> Para obtener datos meteorológicos. Consulta su <a href="https://openweathermap.org/privacy-policy" target="_blank" rel="noopener noreferrer">Política de Privacidad</a>.</li>
            <li><strong>Vercel:</strong> Para alojar nuestra aplicación. Consulta su <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Política de Privacidad</a>.</li>
          </ul>
        </section>

        <section>
          <h2>5. Tus Derechos</h2>
          <p>Tienes derecho a:</p>
          <ul>
            <li>Acceder a tus datos personales</li>
            <li>Solicitar la eliminación de tus datos</li>
            <li>Desactivar la geolocalización en cualquier momento desde tu navegador</li>
            <li>Limpiar tus ciudades favoritas borrando los datos del sitio en tu navegador</li>
          </ul>
        </section>

        <section>
          <h2>6. Contacto</h2>
          <p>Para preguntas sobre esta política, contáctanos en: <strong>privacidad@weatherapp.com</strong></p>
        </section>
      </div>
    </div>
  );
}

export default Privacy;