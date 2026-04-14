import React from 'react';
import { useTranslation } from 'react-i18next';
import './LegalPages.css';

function Terms() {
  const { t } = useTranslation();

  return (
    <div className="legal-page">
      <div className="legal-container">
        <h1>{t('legal.terms.title')}</h1>
        <p className="last-updated">{t('legal.terms.last_update')}</p>
        <section>
          <h2>{t('legal.terms.acceptance')}</h2>
          <p>{t('legal.terms.acceptance_text')}</p>
        </section>
        <section>
          <h2>{t('legal.terms.use_title')}</h2>
          <p>{t('legal.terms.use_text')}</p>
          <ul>
            <li>{t('legal.terms.use_item1')}</li>
            <li>{t('legal.terms.use_item2')}</li>
            <li>{t('legal.terms.use_item3')}</li>
          </ul>
        </section>
        <section>
          <h2>{t('legal.terms.accuracy_title')}</h2>
          <p>{t('legal.terms.accuracy_text')}</p>
        </section>
        <section>
          <h2>{t('legal.terms.liability_title')}</h2>
          <p>{t('legal.terms.liability_text')}</p>
        </section>
        <section>
          <h2>{t('legal.terms.modifications_title')}</h2>
          <p>{t('legal.terms.modifications_text')}</p>
        </section>
        <section>
          <h2>{t('legal.terms.contact_title')}</h2>
          <p>{t('legal.terms.contact_text')}</p>
        </section>
      </div>
    </div>
  );
}

export default Terms;