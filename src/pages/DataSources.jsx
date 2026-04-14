import React from 'react';
import { useTranslation } from 'react-i18next';
import './LegalPages.css';

function DataSources() {
  const { t } = useTranslation();

  return (
    <div className="legal-page">
      <div className="legal-container">
        <h1>{t('legal.data_sources.title')}</h1>
        <p className="last-updated">{t('legal.data_sources.last_update')}</p>

        <section>
          <h2>{t('legal.data_sources.weather_title')}</h2>
          <p>{t('legal.data_sources.weather_text')}</p>
          <ul>
            <li>{t('legal.data_sources.weather_item1')}</li>
            <li>{t('legal.data_sources.weather_item2')}</li>
            <li>{t('legal.data_sources.weather_item3')}</li>
            <li>{t('legal.data_sources.weather_item4')}</li>
          </ul>
          <p>{t('legal.data_sources.weather_link')}</p>
        </section>

        <section>
          <h2>{t('legal.data_sources.accuracy_title')}</h2>
          <p>{t('legal.data_sources.accuracy_text')}</p>
          <ul>
            <li>{t('legal.data_sources.accuracy_item1')}</li>
            <li>{t('legal.data_sources.accuracy_item2')}</li>
            <li>{t('legal.data_sources.accuracy_item3')}</li>
            <li>{t('legal.data_sources.accuracy_item4')}</li>
          </ul>
        </section>

        <section>
          <h2>{t('legal.data_sources.attribution_title')}</h2>
          <p>{t('legal.data_sources.attribution_text')}</p>
        </section>

        <section>
          <h2>{t('legal.data_sources.limitations_title')}</h2>
          <p>{t('legal.data_sources.limitations_text')}</p>
        </section>

        <section>
          <h2>{t('legal.data_sources.links_title')}</h2>
          <ul>
            <li><a href="https://openweathermap.org/faq" target="_blank" rel="noopener noreferrer">{t('legal.data_sources.links_faq')}</a></li>
            <li><a href="https://openweathermap.org/api" target="_blank" rel="noopener noreferrer">{t('legal.data_sources.links_api')}</a></li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default DataSources;