import React from 'react';
import { WorkPermitInlineFaq } from './FaqSection';
import { openWhatsApp } from '../utils';

interface Props {
  onFlightClick: () => void;
  onNotify: (msg: string) => void;
  canClick: (id: string, cb?: (s: number) => void) => boolean;
}

export const ServiceCards: React.FC<Props> = ({ onFlightClick, onNotify, canClick }) => {
  const handleWorkPermit = () => {
    if (!canClick('workPermit', s => onNotify(`Please wait ${s}s before sending another request`))) return;
    const success = openWhatsApp('नमस्कार सर, म श्रम स्वीकृति नवीकरण सम्बन्धमा सम्पर्क गरेको हुँ।');
    if (success) onNotify('Work permit renewal request sent via WhatsApp');
  };

  return (
    <section className="services">
      <div className="container">
        <div className="services-grid">
          {/* Work Permit Card */}
          <div className="service-card slide-in-left">
            <div className="service-icon">
              <i className="fas fa-file-contract" />
            </div>
            <h3>श्रम नवीकरण सहजिकरण</h3>
            <div className="service-subtitle">
              <i className="fas fa-passport" />
              <span>श्रम स्वीकृति नवीकरण सहजिकरण</span> • Professional Assistance
            </div>
            <div className="service-features">
              <ul className="feature-list">
                <li><i className="fas fa-check-circle" /><span className="nepali">न्यूनतम सेवा शुल्क</span></li>
                <li><i className="fas fa-check-circle" /><span className="nepali">छिटो, सजिलो, भरपर्दो</span></li>
                <li><i className="fas fa-check-circle" /><span className="nepali">सजिलो प्रोसेस, फास्ट रिजल्ट</span></li>
              </ul>
              <WorkPermitInlineFaq />
            </div>
            <div className="service-question">
              तपाईंको श्रम नवीकरण गर्ने समय भएको छ? <br />
              <div className="hint">तलको बटनमा क्लिक गर्नुहोस् :</div>
            </div>
            <button className="btn primary-btn" onClick={handleWorkPermit} type="button">
              <i className="fab fa-whatsapp" /> Send WhatsApp Request
            </button>
          </div>

          {/* Flight Ticket Card */}
          <div className="service-card slide-in-right">
            <div className="service-icon">
              <i className="fas fa-plane" />
            </div>
            <h3>Flight Ticket Booking</h3>
            <div className="service-subtitle">
              <i className="fas fa-ticket-alt" />
              <span>विमान टिकट</span> • Best Price Guarantee
            </div>
            <div className="service-features">
              <ul className="feature-list">
                <li><i className="fas fa-check-circle" /><span className="nepali">उत्कृष्ट सेवा</span></li>
                <li><i className="fas fa-check-circle" /><span className="nepali">विश्वसनीय अनुभव</span></li>
                <li><i className="fas fa-check-circle" /><span className="nepali">सस्तो टिकट, खुशी यात्रा</span></li>
              </ul>
            </div>
            <div className="service-question">
              तपाईं सस्तो टिकट खोज्दै हुनुहुन्छ? <br />
              <div className="hint">तलको बटन क्लिक गरि आफूलाई चाहिएको फ्लाइट चयन गर्नुहोस् :</div>
            </div>
            <button className="btn secondary-btn" onClick={onFlightClick} type="button">
              <i className="fas fa-search" /> Book Flight Ticket
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
