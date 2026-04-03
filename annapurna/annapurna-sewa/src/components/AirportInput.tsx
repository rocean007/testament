import React, { useRef, useEffect } from 'react';
import { useAirportSearch } from '../hooks';
import type { Airport } from '../types';

interface Props {
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  label: string;
  icon: string;
  hint: string;
}

export const AirportInput: React.FC<Props> = ({ id, value, onChange, placeholder, label, icon, hint }) => {
  const { query, setQuery, results, open, select, close } = useAirportSearch();
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync internal query → parent
  useEffect(() => { onChange(query); }, [query]);

  // Sync parent value → internal (on mount only)
  useEffect(() => { if (value && !query) setQuery(value); }, []);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) close();
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [close]);

  const handleSelect = (airport: Airport) => {
    select(airport);
    onChange(`${airport.city}, ${airport.country}`);
  };

  return (
    <div className="form-group">
      <label htmlFor={id}>
        <i className={icon} /> {label}
      </label>
      <div className="autocomplete-container" ref={containerRef}>
        <input
          id={id}
          type="text"
          className="form-control with-autocomplete"
          placeholder={placeholder}
          value={query}
          onChange={e => setQuery(e.target.value)}
          autoComplete="off"
          required
        />
        <i className="fas fa-search search-icon" />
        {open && (
          <div className="autocomplete-dropdown" role="listbox" style={{ display: 'block' }}>
            {results.map(a => (
              <div
                key={a.code}
                className="autocomplete-item"
                role="option"
                onClick={() => handleSelect(a)}
              >
                <div className="airport-name">
                  {a.city}, {a.country}{' '}
                  <span style={{ color: 'var(--primary)', fontSize: '0.85rem' }}>({a.code})</span>
                </div>
                <div className="airport-location">
                  <i className="fas fa-plane" aria-hidden="true" /> {a.name}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="form-note">{hint}</div>
    </div>
  );
};
