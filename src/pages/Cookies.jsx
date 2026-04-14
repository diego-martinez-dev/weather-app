import React from 'react';
import './LegalPages.css';

function Cookies() {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <h1>Política de Cookies</h1>
        <p className="last-updated">Última actualización: 13 de abril de 2026</p>

        <section>
          <h2>1. ¿Qué son las Cookies?</h2>
          <p>Las cookies son pequeños archivos de texto que los sitios web almacenan en tu navegador para recordar información sobre tus preferencias y actividades.</p>
        </section>

        <section>
          <h2>2. Cookies que Utilizamos</h2>
          <p>Nuestra aplicación utiliza los siguientes tipos de cookies:</p>
          
          <h3>Cookies Técnicas (Necesarias)</h3>
          <ul>
            <li><strong>localStorage:</strong> Almacena tus ciudades favoritas localmente en tu navegador.</li>
            <li><strong>Preferencias de ubicación:</strong> Recordamos si aceptaste compartir tu ubicación.</li>
          </ul>
          
          <h3>Cookies de Terceros</h3>
          <ul>
            <li><strong>Vercel Analytics:</strong> Cookies anónimas para medir el rendimiento de la aplicación.</li>
          </ul>
        </section>

        <section>
          <h2>3. Gestión de Cookies</h2>
          <p>Puedes gestionar las cookies desde tu navegador:</p>
          <ul>
            <li><strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies y otros datos de sitios</li>
            <li><strong>Firefox:</strong> Opciones → Privacidad y seguridad → Cookies y datos del sitio</li>
            <li><strong>Safari:</strong> Preferencias → Privacidad → Cookies y datos de sitios web</li>
            <li><strong>Edge:</strong> Configuración → Cookies y permisos del sitio</li>
          </ul>
          <p>Nota: Al desactivar cookies, las ciudades favoritas no se guardarán entre sesiones.</p>
        </section>

        <section>
          <h2>4. Consentimiento</h2>
          <p>Al utilizar nuestra aplicación, aceptas el uso de cookies según esta política. Puedes retirar tu consentimiento en cualquier momento ajustando la configuración de tu navegador.</p>
        </section>

        <section>
          <h2>5. Cambios en la Política</h2>
          <p>Actualizaremos esta política cuando sea necesario. Los cambios se publicarán en esta página con una nueva fecha de "última actualización".</p>
        </section>
      </div>
    </div>
  );
}

export default Cookies;