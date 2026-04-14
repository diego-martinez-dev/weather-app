import React from 'react';
import { useTranslation } from 'react-i18next';
import './LegalPages.css';

function Cookies() {
  const { t } = useTranslation();

  return (
    <div className="legal-page">
      <div className="legal-container">
        <h1>{t('legal.cookies.title')}</h1>
        <p className="last-updated">{t('legal.cookies.last_update')}</p>

        <section>
          <h2>{t('legal.cookies.what_title')}</h2>
          <p>{t('legal.cookies.what_text')}</p>
        </section>

        <section>
          <h2>{t('legal.cookies.we_use_title')}</h2>
          <p>{t('legal.cookies.we_use_text')}</p>
          
          <h3>{t('legal.cookies.technical_title')}</h3>
          <ul>
            <li>{t('legal.cookies.technical_item1')}</li>
            <li>{t('legal.cookies.technical_item2')}</li>
          </ul>
          
          <h3>{t('legal.cookies.third_party_title')}</h3>
          <ul>
            <li>{t('legal.cookies.third_party_item1')}</li>
          </ul>
        </section>

        <section>
          <h2>{t('legal.cookies.manage_title')}</h2>
          <p>{t('legal.cookies.manage_text')}</p>
          <ul>
            <li>{t('legal.cookies.manage_item1')}</li>
            <li>{t('legal.cookies.manage_item2')}</li>
            <li>{t('legal.cookies.manage_item3')}</li>
            <li>{t('legal.cookies.manage_item4')}</li>
          </ul>
          <p>{t('legal.cookies.manage_note')}</p>
        </section>

        <section>
          <h2>{t('legal.cookies.consent_title')}</h2>
          <p>{t('legal.cookies.consent_text')}</p>
        </section>

        <section>
          <h2>{t('legal.cookies.changes_title')}</h2>
          <p>{t('legal.cookies.changes_text')}</p>
        </section>
      </div>
    </div>
  );
}

export default Cookies;