import React from 'react';
import { openWhatsApp } from '../utils';

interface Props {
  onNotify: (msg: string) => void;
  canClick: (id: string, cb?: (s: number) => void) => boolean;
}

export const Footer: React.FC<Props> = ({ onNotify, canClick }) => {
  const handleFooterWA = () => {
    if (!canClick('floating', s => onNotify(`Please wait ${s}s`))) return;
    openWhatsApp('नमस्कार सर, म फ्लाइट र श्रम स्वीकृति नवीकरण सम्बन्धमा सम्पर्क गरेको हुँ।');
    onNotify('Opening WhatsApp chat');
  };

  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo animate-on-scroll">
            <h3>Annapurna Sewa</h3>
            <p>Professional Business Services • Reliable &amp; Trustworthy</p>
            <a href="https://www.google.com/maps?q=Shivapuri School,+Kathmandu,+Nepal" style={{ textDecoration: 'none', color: 'inherit' }}>
              <p style={{ marginTop: 10, fontSize: '0.9rem' }}>
                <i className="fas fa-map-marker-alt" style={{ background: 'linear-gradient(135deg,#EA4335,#FBBC05)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }} />
                {' '}Shivapuri School, Kathmandu, Nepal
              </p>
            </a>
            <a href="mailto:meroaspl@gmail.com?subject=Inquiry%20from%20Annapurna%20Sewa%20Website" className="email-link">
              <p style={{ fontSize: '0.9rem' }}>
                <i className="fas fa-envelope" style={{ background: 'linear-gradient(135deg,#EA4335,#FBBC05)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }} />
                {' '}meroaspl@gmail.com
              </p>
            </a>
            <a href="tel:+9779802398984" style={{ textDecoration: 'none', color: 'inherit' }}>
              <p style={{ fontSize: '0.9rem' }}>
                <i className="fas fa-phone" style={{ background: 'linear-gradient(135deg,#EA4335,#FBBC05)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }} />
                {' '}+9779802398984
              </p>
            </a>
          </div>

          <div className="footer-contact animate-on-scroll" style={{ transitionDelay: '0.2s' }}>
            <a href="https://wa.me/9779802398981" className="whatsapp-contact" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-whatsapp" /> Contact us on WhatsApp
            </a>
            <p style={{ marginTop: 15, opacity: 0.9 }}>Quick Response • Professional Service</p>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp */}
      <div
        className="floating-icon"
        onClick={handleFooterWA}
        role="button"
        aria-label="Contact on WhatsApp"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && handleFooterWA()}
        style={{ bottom: 30, right: 30 }}
      >
        <i className="fab fa-whatsapp" />
      </div>
    </footer>
  );
};
