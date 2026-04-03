import React, { useState } from 'react';
import { FEE_STRUCTURE } from '../data';
import { calculateAgeFromDate } from '../utils';
import type { FeeResult } from '../types';

type Tab = 'age' | 'date';

export const Calculator: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>('age');
  const [age, setAge] = useState('35');
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() - 35);
    return d.toISOString().split('T')[0];
  });
  const [result, setResult] = useState<FeeResult | null>(null);

  const calcFee = (a: number): FeeResult => {
    const tier = a <= 35 ? FEE_STRUCTURE.upTo35 : FEE_STRUCTURE.above35;
    return { sameCompany: tier.sameCompany, companyChange: tier.companyChange };
  };

  const handleAgeCalc = () => {
    const a = parseInt(age);
    if (!a || a < 16 || a > 70) { alert('कृपया १६ देखि ७० वर्षको बीचमा उमेर प्रविष्ट गर्नुहोस्।'); return; }
    setResult(calcFee(a));
  };

  const handleDateCalc = () => {
    if (!date) { alert('कृपया जन्म मिति चयन गर्नुहोस्।'); return; }
    const a = calculateAgeFromDate(new Date(date));
    setAge(String(a));
    setResult(calcFee(a));
  };

  return (
    <div className="widget-container">
      <button className="floating-btn" onClick={() => setOpen(o => !o)}>
        <i className="fas fa-calculator" />
        <span className="btn-text">Calculator</span>
      </button>

      {open && (
        <div className="calculator-popup show">
          <div className="popup-header">
            <button className="close-popup" onClick={() => setOpen(false)}>
              <i className="fas fa-times" />
            </button>
            <h3>श्रम स्वीकृति कैलकुलेटर</h3>
          </div>

          <div className="tabs">
            <button className={`tab${tab === 'age' ? ' active' : ''}`} onClick={() => setTab('age')}>
              उमेर बाट (With Age)
            </button>
            <button className={`tab${tab === 'date' ? ' active' : ''}`} onClick={() => setTab('date')}>
              जन्ममिति बाट (With Birthdate)
            </button>
          </div>

          {tab === 'age' && (
            <div className="tab-content active">
              <div className="input-group">
                <label>उमेर (Age in years):</label>
                <input type="number" min={1} max={120} value={age} onChange={e => setAge(e.target.value)} />
              </div>
              <button className="calc-btn" onClick={handleAgeCalc}>
                <i className="fas fa-calculator" /> Calculate Fee
              </button>
            </div>
          )}

          {tab === 'date' && (
            <div className="tab-content active">
              <div className="input-group">
                <label>जन्म मिति (Birth Date):</label>
                <input type="date" value={date} max={new Date().toISOString().split('T')[0]} onChange={e => setDate(e.target.value)} />
              </div>
              <button className="calc-btn" onClick={handleDateCalc}>
                <i className="fas fa-calculator" /> Calculate Fee
              </button>
            </div>
          )}

          {result && (
            <div className="results show">
              <div className="result-title">पुरानो कम्पनी भएको भए</div>
              <div className="result-amount">रु {result.sameCompany.toLocaleString('en-IN')}</div>
              <div className="result-title">कम्पनी परिवर्तन भएको भए</div>
              <div className="result-amount">रु {result.companyChange.toLocaleString('en-IN')}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
