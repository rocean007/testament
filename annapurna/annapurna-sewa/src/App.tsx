import React, { useState } from 'react';
import { WelcomeAnimation } from './components/WelcomeAnimation';
import { Header } from './components/Header';
import { NoticeBar } from './components/NoticeBar';
import { Calculator } from './components/Calculator';
import { CountryMarquee } from './components/CountryMarquee';
import { ServiceCards } from './components/ServiceCards';
import { StatsSection } from './components/StatsSection';
import { FaqSection } from './components/FaqSection';
import { FlightModal } from './components/FlightModal';
import { Footer } from './components/Footer';
import { Notification } from './components/Notification';
import { useScrollProgress, useNotification, useRateLimiter } from './hooks';

export const App: React.FC = () => {
  const { progress, isScrolled } = useScrollProgress();
  const { message, visible, show } = useNotification();
  const { canClick } = useRateLimiter(2000);
  const [flightModalOpen, setFlightModalOpen] = useState(false);

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className="scroll-progress"
        style={{ width: `${progress}%` }}
      />

      <WelcomeAnimation />

      <div className="website-content">
        {/* Language badge */}
        <div className="language-badge">
          <i className="fas fa-globe-asia" />
          <span>EN / <span className="nepali">ने</span></span>
        </div>

        <Header isScrolled={isScrolled} />
        <NoticeBar />
        <Calculator />
        <CountryMarquee />

        {/* Hero */}
        <section className="hero">
          <div className="container">
            <h1 className="animate-on-scroll">वैदेशिक रोजगार एपसँग आबद्ध संस्था</h1>
            <h2 className="animate-on-scroll">Your Trusted Partner for Professional Services</h2>
            <p className="animate-on-scroll" style={{ transitionDelay: '0.2s' }}>
              Get expert assistance with{' '}
              <span className="highlight">Work Permit Renewal Assistance</span> and{' '}
              <span className="highlight">Flight Ticket Booking</span>.{' '}
              आवश्यकता अनुसार छिटो, भरपर्दो र उत्कृष्ट सेवा न्यूनतम सेवा शुल्कमा
            </p>
            <p className="animate-on-scroll" style={{ transitionDelay: '0.4s' }}>
              तपाईंको श्रम नवीकरण गर्ने समय भएको छ? सस्तो टिकट खोज्दै हुनुहुन्छ? हामी तपाईंलाई सहयोग गर्न यहाँ छौं।
            </p>
          </div>
        </section>

        <ServiceCards
          onFlightClick={() => setFlightModalOpen(true)}
          onNotify={show}
          canClick={canClick}
        />

        <StatsSection />
        <FaqSection />

        <FlightModal
          open={flightModalOpen}
          onClose={() => setFlightModalOpen(false)}
          onSuccess={show}
          onError={show}
        />

        <Footer onNotify={show} canClick={canClick} />
      </div>

      <Notification message={message} visible={visible} />
    </>
  );
};
