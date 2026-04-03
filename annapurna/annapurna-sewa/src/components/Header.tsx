import React from 'react';

interface Props { isScrolled: boolean; }

export const Header: React.FC<Props> = ({ isScrolled }) => (
  <header
    id="mainHeader"
    style={{
      background: isScrolled
        ? 'rgba(255,255,255,0.98)'
        : 'linear-gradient(135deg,#fafafa 0%,#f5f5f5 50%,#eeeeee 100%)',
      backdropFilter: 'blur(20px)',
      borderBottom: '2px solid rgba(59,130,246,0.2)',
      padding: '1.5rem 0',
      position: 'sticky', top: 0, zIndex: 100,
      boxShadow: isScrolled ? '0 10px 30px rgba(0,0,0,0.12)' : '0 5px 25px rgba(0,0,0,0.08)',
      transition: 'all 0.3s ease',
    }}
  >
    <div className="container">
      <div className="header-content">
        <div className="logo">
          <div className="logo-image">
            <img src="/assets/aspl.jpg" alt="Annapurna Sewa Logo" width={60} height={60} loading="eager" />
          </div>
          <div className="logo-text">
            <p className="logo-name">Annapurna Sewa</p>
            <p>
              <i className="fas fa-mountain" /> <span className="nepali">अन्नपूर्ण सेवा</span> | Professional Business Services
            </p>
          </div>
        </div>
      </div>
    </div>
  </header>
);
