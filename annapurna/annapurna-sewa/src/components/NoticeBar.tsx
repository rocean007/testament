import React, { useState } from 'react';

export const NoticeBar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <section className="notice-section">
      <div className="container">
        <div className={`notice-card animate-on-scroll ${collapsed ? 'is-collapsed' : ''}`}>
          <p className="notice-title">
            <span className="notice-title-main">
              <i className="fas fa-bullhorn" />
              <span className="nepali">सूचना (Suchana)</span>
            </span>
            <span className="notice-actions">
              <span className="notice-badge">Important</span>
              <button
                type="button"
                className="notice-toggle"
                aria-expanded={!collapsed}
                onClick={() => setCollapsed(c => !c)}
              >
                {collapsed ? 'Show' : 'Hide'}
              </button>
            </span>
          </p>

          <div className={`notice-details ${collapsed ? '' : ''}`} id="suchanaDetails">
            <p className="notice-text">
              <span className="nepali">
                देश परिवर्तन वा पहिलो पटक श्रमका लागि पुन: मेडिकल र ओरिएन्टेशन आवश्यक हुन्छ।
                यी प्रक्रिया पूरा भएपछि डकुमेन्ट अपडेटको काम अघि बढ्छ।
              </span>
            </p>
            <ul className="notice-list">
              <li><span className="nepali">थप जानकारी: श्रम कल सेन्टर ११४१ (NTC)</span></li>
              <li><span className="nepali">सम्बन्धित घोषणापत्र (Declaration Form) अनिवार्य</span></li>
              <li><span className="nepali">युरोप व्यक्तिगत नयाँ श्रम: कम्पनीको आधिकारिक इमेल आवश्यक</span></li>
              <li><span className="nepali">गल्फ देश व्यक्तिगत नयाँ श्रम: Embassy letter आवश्यक</span></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
