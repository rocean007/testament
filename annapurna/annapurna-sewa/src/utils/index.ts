import { AIRPORTS, WHATSAPP_NUMBER } from '../data';
import type { Airport } from '../types';

export function debounce<T extends (...args: unknown[]) => void>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: unknown[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  }) as T;
}

export function throttle<T extends (...args: unknown[]) => void>(fn: T, limit: number): T {
  let inThrottle = false;
  return ((...args: unknown[]) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => { inThrottle = false; }, limit);
    }
  }) as T;
}

export function openWhatsApp(message: string): boolean {
  try {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    return true;
  } catch {
    return false;
  }
}

export function searchAirports(query: string): Airport[] {
  if (!query || query.trim().length < 2) return [];
  const term = query.toLowerCase().trim();
  return AIRPORTS
    .filter(a => `${a.city} ${a.country} ${a.name} ${a.code}`.toLowerCase().includes(term))
    .sort((a, b) => {
      const aMatch = a.city.toLowerCase().startsWith(term);
      const bMatch = b.city.toLowerCase().startsWith(term);
      return aMatch === bMatch ? 0 : aMatch ? -1 : 1;
    })
    .slice(0, 10);
}

export function isValidAirport(value: string): boolean {
  if (!value.includes(',')) return false;
  const normalized = value.toLowerCase().trim();
  return AIRPORTS.some(a => `${a.city}, ${a.country}`.toLowerCase() === normalized);
}

export function sanitizeInput(input: string, maxLength = 100): string {
  return input
    .trim()
    .replace(/[<>"'`]/g, '')
    .replace(/[^\w\s,.-]/g, '')
    .substring(0, maxLength);
}

export function calculateAgeFromDate(birthDate: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
  return age;
}

export function getTomorrowDateString(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
}

export function getTodayDateString(): string {
  return new Date().toISOString().split('T')[0];
}
