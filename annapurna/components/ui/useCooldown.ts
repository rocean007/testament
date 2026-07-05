"use client";

import { useRef } from "react";

/**
 * Returns a function that returns true at most once per `cooldownMs`,
 * preventing accidental double-submission of WhatsApp deep links.
 */
export function useCooldown(cooldownMs = 2000) {
  const lastRef = useRef(0);

  return function attempt(): boolean {
    const now = Date.now();
    if (now - lastRef.current < cooldownMs) return false;
    lastRef.current = now;
    return true;
  };
}
