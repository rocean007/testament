import React, { useState, useRef, useEffect } from 'react';

// ─── Generic collapsible FAQ item ─────────────────────────────────────────────
interface FaqItemProps {
  question: string;
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  delay?: number;
}

export const FaqItem: React.FC<FaqItemProps> = ({ question, children, active, onClick, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`faq-item${active ? ' active' : ''}${visible ? ' animated' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="faq-question" onClick={onClick} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && onClick()}>
        {question}
        <i className="fas fa-chevron-down" />
      </div>
      <div className="faq-answer">
        {children}
      </div>
    </div>
  );
};

// ─── Work Permit FAQ (inline inside service card) ─────────────────────────────
export const WorkPermitInlineFaq: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const toggle = (i: number) => setActiveIdx(prev => prev === i ? null : i);

  const items = [
    {
      q: 'अबश्यक कागजात के के हुन त ?',
      a: (
        <p><span className="nepali">
          आवश्यक कागजातहरू:<br />
          ✅ पासपोर्ट<br />
          ✅ भिसा / भिसा कार्ड<br />
          ✅ आगमन (Arrival) र प्रस्थान (Departure) स्ट्याम्प<br />
          ✅ कम्पनी नाम परिवर्तन भएको भए नयाँ एग्रिमेन्ट पेपर अनिवार्य
        </span></p>
      ),
    },
    {
      q: 'श्रम स्वीकृति गरेर जाँदा केके फाइदा श्रमिकलाई हुन्छ ?',
      a: (
        <>
          <p><span className="nepali">वैदेशिक रोजगारमा विदेश जानु अघि श्रम स्वीकृति गरेर जानाले श्रमिकलाई तलका फाइदाहरू हुन्छ:</span></p>
          <ol className="faq-list-ordered">
            <li><span className="nepali"><strong>कानुनी सुरक्षा:</strong> श्रम स्वीकृति लिँदा श्रमिकलाई काम गर्ने देशको सरकारबाट कानुनी सुरक्षा मिल्छ।</span></li>
            <li><span className="nepali"><strong>सही तलब र कामका शर्तहरू:</strong> निर्धारित तलब र काम गर्ने घण्टा, छुट्टी, कार्य वातावरण जस्ता शर्तहरू सुनिश्चित गरिन्छ।</span></li>
            <li><span className="nepali"><strong>कामको स्थिरता:</strong> बिना श्रम स्वीकृतिका काम अवैध मानिन्छ। स्वीकृति लिँदा काम स्थिर र वैध हुन्छ।</span></li>
            <li><span className="nepali"><strong>स्वास्थ्य र सुरक्षा:</strong> स्वास्थ्य बीमा र काम गर्ने क्रममा सुरक्षा सुनिश्चित गरिन्छ।</span></li>
            <li><span className="nepali"><strong>ठगीको डर कम:</strong> वैध प्रक्रिया भएकाले ठगीको सामना गर्नुपर्ने सम्भावना कम हुन्छ।</span></li>
          </ol>
          <p><span className="nepali">यसैले, श्रम स्वीकृति गरेर जानाले श्रमिकलाई सुरक्षित, कानुनी, र सन्तुलित कार्य वातावरण दिन्छ।</span></p>
        </>
      ),
    },
  ];

  return (
    <div className="service-faq-list">
      {items.map((item, i) => (
        <div key={i} className={`faq-item${activeIdx === i ? ' active' : ''}`}>
          <div className="faq-question" onClick={() => toggle(i)} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && toggle(i)}>
            {item.q}
            <i className="fas fa-chevron-down" />
          </div>
          <div className="faq-answer">{item.a}</div>
        </div>
      ))}
    </div>
  );
};

// ─── Main FAQ Section ──────────────────────────────────────────────────────────
type Category = 'flight' | 'permit';

const PERMIT_FAQS = [
  { q: 'वर्क पर्मिट नवीकरण कसरि गर्ने?', a: <p><span className="nepali">अनलाइन फर्म भर्नुहोस् → आवश्यक कागजात अपलोड गर्नुहोस् → शुल्क भुक्तानी गर्नुहोस् → प्रगति ट्र्याक गर्नुहोस्।</span></p> },
  { q: 'कति समयमा नवीकरण हुन्छ?', a: <p><span className="nepali">सामान्यतया 7–15 कार्य दिनमा पूरा हुन्छ।</span></p> },
  { q: 'पुलिस रिपोर्टका लागि आवश्यक कागजातहरू के के हुन्?', a: <p><span className="nepali">* पासपोर्ट साइज फोटो<br/>* नागरिकताको अगाडि–पछाडिको फोटो<br/>* पासपोर्ट (भएमा)<br/>* नेपालको सक्रिय मोबाइल नम्बर र इमेल आइडी<br/>* विवाहित भएमा विवाह दर्ताको फोटो<br/>* आमा–बुवा तथा हजुरबा–आमाको पूरा नाम<br/>* स्थायी ठेगाना</span></p> },
  { q: 'फेस-टू-फेस जानुपर्छ कि?', a: <p><span className="nepali">हाम्रो अनलाइन सेवा पूर्ण डिजिटल छ। केही विशेष अवस्थामा मात्र कार्यालय जानुपर्ने हुन सक्छ।</span></p> },
  { q: 'फीस कति हुन्छ?', a: <p><span className="nepali">न्यूनतम खर्चमै सेवा उपलब्ध छ। शुल्क तपाईंको आवेदन अनुसार फरक पर्न सक्छ।</span></p> },
  { q: 'नवीकरण स्टाटस कसरी ट्र्याक गर्ने?', a: <p><span className="nepali">नेपाल सरकारको वैदेशिक रोजगार विभागको आधिकारिक वेबसाइट <a href="https://www.feo.gov.np">https://www.feo.gov.np</a> मा गएर "अन्तिम श्रम स्वीकृति खोजी" मा पासपोर्ट नम्बर राखेर हेर्न सक्नुहुन्छ।</span></p> },
];

const FLIGHT_FAQS = [
  { q: 'टिकट बुकिङ कसरि गर्ने?', a: <p><span className="nepali">तपाईंले हाम्रो वेबसाइटमा उडान खोज्नुभयो → उपयुक्त फ्लाइट चयन → विवरण भर्नुहोस् → भुक्तानी गर्नुहोस्।</span></p> },
  { q: 'भुक्तानीका विकल्पहरू के के छन्?', a: <p><span className="nepali">हामीले बैंक कार्ड, मोबाइल बैंकिङ, e-wallet र नेट बैंकिङ विकल्पहरू समर्थन गर्छौं।</span></p> },
  { q: 'क्यान्सल र रिफन्ड नीतिहरू के छन्?', a: <p><span className="nepali">टिकट अनुसार फरक हुन्छ। हाम्रो सिस्टमले तत्काल रिफन्ड वा क्रेडिट विकल्प देखाउँछ।</span></p> },
  { q: 'बुकिङ कन्फर्म भएको कसरी थाहा पाउने?', a: <p><span className="nepali">सफल भुक्तानीपछि तपाईंको ईमेल र SMS मा कन्फर्मेसन पठाइन्छ।</span></p> },
  { q: 'फ्लाइट समय/गेट परिवर्तन भए के गर्ने?', a: <p><span className="nepali">हाम्रो साइटमा "My Bookings" बाट अपडेट हेर्न सक्नुहुन्छ। तत्काल नोटिफिकेशन पनि पठाइन्छ।</span></p> },
  { q: 'सस्तो टिकट पाउने सुझाव के छन्?', a: <p><span className="nepali">अग्रिम बुकिङ गर्नुहोस्, फ्लेक्सिबल मितिहरू रोज्नुहोस्, र अफर/डिस्काउन्ट हेर्नुहोस्।</span></p> },
];

export const FaqSection: React.FC = () => {
  const [category, setCategory] = useState<Category>('flight');
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const faqs = category === 'flight' ? FLIGHT_FAQS : PERMIT_FAQS;

  const handleCategoryChange = (cat: Category) => {
    setCategory(cat);
    setActiveIdx(null);
  };

  return (
    <section className="faq-section">
      <div className="container">
        <h2 className="faq-title animate-on-scroll">
          Frequently Asked Questions — Work Permit Renewal &amp; Flight Booking Nepal
        </h2>

        <div className="faq-categories">
          <button
            className={`faq-category-btn${category === 'flight' ? ' active' : ''}`}
            onClick={() => handleCategoryChange('flight')}
            type="button"
          >
            <i className="fas fa-plane" /> Flight Ticket Booking
          </button>
          <button
            className={`faq-category-btn${category === 'permit' ? ' active' : ''}`}
            onClick={() => handleCategoryChange('permit')}
            type="button"
          >
            <i className="fas fa-file-contract" /> Work Permit Renewal
          </button>
        </div>

        <div className="faq-content active">
          {faqs.map((item, i) => (
            <FaqItem
              key={`${category}-${i}`}
              question={item.q}
              active={activeIdx === i}
              onClick={() => setActiveIdx(prev => prev === i ? null : i)}
              delay={i * 0.1}
            >
              {item.a}
            </FaqItem>
          ))}
        </div>
      </div>
    </section>
  );
};
