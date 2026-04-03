import React, { useEffect, useRef, useState } from 'react';

interface StatItem {
  icon: string;
  iconClass: string;
  value: string;
  label: string;
}

const STATS: StatItem[] = [
  { icon: 'fas fa-globe-americas', iconClass: 'globe-icon', value: '17', label: 'Countries Served' },
  { icon: 'fas fa-users', iconClass: 'project-icon', value: '100000+', label: 'People Visited' },
  { icon: 'fas fa-award', iconClass: 'experience-icon', value: '2+', label: 'Years Experience' },
  { icon: 'fas fa-heart', iconClass: 'satisfaction-icon', value: '98%', label: 'Client Satisfaction' },
];

function useCountUp(target: string, active: boolean) {
  const [display, setDisplay] = useState('0');
  const counted = useRef(false);

  useEffect(() => {
    if (!active || counted.current) return;
    counted.current = true;

    const hasSuffix = /[+%]/.test(target);
    const suffix = hasSuffix ? target.replace(/\d/g, '') : '';
    const num = parseInt(target);
    if (isNaN(num)) { setDisplay(target); return; }

    let current = 0;
    const steps = 50;
    const inc = num / steps;
    const interval = 1500 / steps;
    const timer = setInterval(() => {
      current = Math.min(current + inc, num);
      setDisplay(`${Math.floor(current)}${suffix}`);
      if (current >= num) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, [active, target]);

  return display;
}

const StatCard: React.FC<StatItem & { delay: number }> = ({ icon, iconClass, value, label, delay }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const displayValue = useCountUp(value, visible);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`stat-item${visible ? ' visible' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="icon-container">
        <i className={`${icon} ${iconClass}`} />
      </div>
      <div className="stat-number">{displayValue}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

export const StatsSection: React.FC = () => (
  <div className="stats">
    {STATS.map((s, i) => (
      <StatCard key={s.label} {...s} delay={(i + 1) * 0.1} />
    ))}
  </div>
);
