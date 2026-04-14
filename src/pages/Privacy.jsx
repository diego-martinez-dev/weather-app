import React from 'react';
import { useTranslation } from 'react-i18next';
import './LegalPages.css';

function Privacy() {
  const { t } = useTranslation();

  return (
    <div className="legal-page">
      <div className="legal-container">
        <h1>{t('legal.privacy.title')}</h1>
        <p className="last-updated">{t('legal.privacy.last_update')}</p>

        <section>
          <h2>{t('legal.privacy.info_title')}</h2>
          <p>{t('legal.privacy.info_text')}</p>
          <ul>
            <li>{t('legal.privacy.info_item1')}</li>
            <li>{t('legal.privacy.info_item2')}</li>
            <li>{t('legal.privacy.info_item3')}</li>
          </ul>
        </section>

        <section>
          <h2>{t('legal.privacy.use_title')}</h2>
          <p>{t('legal.privacy.use_text')}</p>
          <ul>
            <li>{t('legal.privacy.use_item1')}</li>
            <li>{t('legal.privacy.use_item2')}</li>
            <li>{t('legal.privacy.use_item3')}</li>
          </ul>
        </section>

        <section>
          <h2>{t('legal.privacy.storage_title')}</h2>
          <p>{t('legal.privacy.storage_text')}</p>
        </section>

        <section>
          <h2>{t('legal.privacy.third_party_title')}</h2>
          <p>{t('legal.privacy.third_party_text')}</p>
          <ul>
            <li>{t('legal.privacy.third_party_item1')}</li>
            <li>{t('legal.privacy.third_party_item2')}</li>
          </ul>
        </section>

        <section>
          <h2>{t('legal.privacy.rights_title')}</h2>
          <p>{t('legal.privacy.rights_text')}</p>
          <ul>
            <li>{t('legal.privacy.rights_item1')}</li>
            <li>{t('legal.privacy.rights_item2')}</li>
            <li>{t('legal.privacy.rights_item3')}</li>
            <li>{t('legal.privacy.rights_item4')}</li>
          </ul>
        </section>

        <section>
          <h2>{t('legal.privacy.contact_title')}</h2>
          <p>{t('legal.privacy.contact_text')}</p>
        </section>
      </div>
    </div>
  );
}

export default Privacy;