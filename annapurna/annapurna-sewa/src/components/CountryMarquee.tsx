import React, { useRef } from 'react';
import { COUNTRIES } from '../data';

export const CountryMarquee: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = 'paused';
  };
  const handleMouseLeave = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = 'running';
  };

  const items = [...COUNTRIES, ...COUNTRIES]; // double for seamless loop

  return (
    <div className="marquee-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="marquee-track" ref={trackRef}>
        {items.map((c, i) => (
          <div key={`${c.name}-${i}`} className="country-item">
            <span className="country-flag">{c.flag}</span>
            <span className="country-name">{c.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
