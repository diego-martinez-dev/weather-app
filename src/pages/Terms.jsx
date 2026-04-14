import React from 'react';
import './LegalPages.css';

function Terms() {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <h1>Términos de Uso</h1>
        <p className="last-updated">Última actualización: 13 de abril de 2026</p>

        <section>
          <h2>1. Aceptación de los Términos</h2>
          <p>Al acceder y utilizar esta aplicación del clima, aceptas cumplir con estos Términos de Uso. Si no estás de acuerdo con alguna parte de estos términos, no debes utilizar nuestra aplicación.</p>
        </section>

        <section>
          <h2>2. Uso de la Aplicación</h2>
          <p>Nuestra aplicación proporciona información meteorológica en tiempo real. Te comprometes a:</p>
          <ul>
            <li>Usar la aplicación solo para fines legales</li>
            <li>No sobrecargar nuestros servidores con solicitudes excesivas</li>
            <li>No intentar acceder a áreas restringidas de la aplicación</li>
          </ul>
        </section>

        <section>
          <h2>3. Precisión de la Información</h2>
          <p>La información meteorológica es proporcionada por OpenWeatherMap. Si bien nos esforzamos por ofrecer datos precisos, no garantizamos la exactitud, integridad o actualidad de la información. El clima puede cambiar rápidamente y los datos pueden tener retrasos.</p>
        </section>

        <section>
          <h2>4. Limitación de Responsabilidad</h2>
          <p>No somos responsables por daños directos, indirectos, incidentales o consecuentes que puedan resultar del uso o la imposibilidad de usar nuestra aplicación, incluyendo decisiones basadas en la información meteorológica proporcionada.</p>
        </section>

        <section>
          <h2>5. Modificaciones</h2>
          <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en esta página.</p>
        </section>

        <section>
          <h2>6. Contacto</h2>
          <p>Si tienes preguntas sobre estos términos, contáctanos a través de nuestro formulario de contacto.</p>
        </section>
      </div>
    </div>
  );
}

export default Terms;