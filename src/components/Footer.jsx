import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();

  return (
    <footer style={{ marginTop: '40px', padding: '20px', textAlign: 'center', fontSize: '12px', opacity: 0.8, borderTop: '1px solid #ddd' }}>
      <div style={{ marginBottom: '10px' }}>
        <Link to="/terms" style={{ color: '#666', margin: '0 10px', textDecoration: 'none' }}>{t('app.footer.terms')}</Link>
        <Link to="/privacy" style={{ color: '#666', margin: '0 10px', textDecoration: 'none' }}>{t('app.footer.privacy')}</Link>
        <Link to="/cookies" style={{ color: '#666', margin: '0 10px', textDecoration: 'none' }}>{t('app.footer.cookies')}</Link>
        <Link to="/data-sources" style={{ color: '#666', margin: '0 10px', textDecoration: 'none' }}>{t('app.footer.data_sources')}</Link>
      </div>
      <div>{t('app.footer.copyright')}</div>
    </footer>
  );
}

export default Footer;