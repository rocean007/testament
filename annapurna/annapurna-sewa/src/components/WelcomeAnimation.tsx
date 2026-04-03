import React, { useEffect, useState } from 'react';

export const WelcomeAnimation: React.FC = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Skip on mobile
    if (window.innerWidth < 768) { setVisible(false); return; }

    const t = setTimeout(() => setVisible(false), 8000);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div className="welcome-animation" id="welcomeAnimation">
      <div className="animation-container">
        <div className="trail trail-1" />
        <div className="trail trail-2" />
        <div className="trail trail-3" />
        <div className="plane-wrapper" id="planeWrapper">
          <img className="plane" src="/assets/image.png" alt="Annapurna Sewa Plane" width={250} height={250} />
          <div className="plane-text">Annapurna Sewa</div>
        </div>
        <div className="welcome-text">
          <div className="welcome-logo">
            <img src="/assets/aspl.jpg" alt="Annapurna Sewa Logo" width={100} height={100} />
          </div>
          <h1>Welcome to Annapurna Sewa</h1>
          <p>Your Trusted Partner for Professional Services</p>
        </div>
      </div>
    </div>
  );
};
