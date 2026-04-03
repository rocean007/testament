import { useState, useEffect, useRef, useCallback } from 'react';
import { throttle } from '../utils';

// ─── Scroll Progress ───────────────────────────────────────────────────────────
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handler = throttle(() => {
      const total = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setProgress(total > 0 ? Math.min((window.scrollY / total) * 100, 100) : 0);
      setIsScrolled(window.scrollY > 50);
    }, 100) as EventListener;

    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return { progress, isScrolled };
}

// ─── Intersection Observer ─────────────────────────────────────────────────────
export function useInView(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold, rootMargin: '0px 0px -30px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

// ─── Notification ──────────────────────────────────────────────────────────────
export function useNotification(duration = 4000) {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const show = useCallback((text: string) => {
    clearTimeout(timer.current);
    setMessage(text);
    setVisible(true);
    timer.current = setTimeout(() => setVisible(false), duration);
  }, [duration]);

  useEffect(() => () => clearTimeout(timer.current), []);

  return { message, visible, show };
}

// ─── Click Rate Limiter ────────────────────────────────────────────────────────
export function useRateLimiter(cooldown = 2000) {
  const lastClick = useRef<Record<string, number>>({});

  const canClick = useCallback((id: string, onBlocked?: (remaining: number) => void): boolean => {
    const now = Date.now();
    const last = lastClick.current[id] ?? 0;
    const diff = now - last;
    if (diff < cooldown) {
      onBlocked?.(Math.ceil((cooldown - diff) / 1000));
      return false;
    }
    lastClick.current[id] = now;
    return true;
  }, [cooldown]);

  return { canClick };
}

// ─── Airport Autocomplete ──────────────────────────────────────────────────────
import { searchAirports } from '../utils';
import type { Airport } from '../types';
import { debounce } from '../utils';

export function useAirportSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Airport[]>([]);
  const [open, setOpen] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const doSearch = useCallback(
    debounce((q: string) => {
      const r = searchAirports(q);
      setResults(r);
      setOpen(r.length > 0 && q.length >= 2);
    }, 300),
    []
  );

  useEffect(() => { doSearch(query); }, [query, doSearch]);

  const select = useCallback((airport: Airport) => {
    setQuery(`${airport.city}, ${airport.country}`);
    setOpen(false);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  return { query, setQuery, results, open, select, close };
}
