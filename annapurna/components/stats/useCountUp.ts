"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/components/ui/useInView";

interface UseCountUpOptions {
  suffix?: string;
  duration?: number;
}

/**
 * Counts up to `target` once the element scrolls into view. Takes the target
 * number and suffix as props rather than parsing a display string at runtime.
 */
export function useCountUp<T extends HTMLElement>(target: number, options: UseCountUpOptions = {}) {
  const { suffix = "", duration = 1500 } = options;
  const { ref, isInView } = useInView<T>(0.4);
  const [display, setDisplay] = useState(`0${suffix}`);

  useEffect(() => {
    if (!isInView) return;

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // One-time mount sync gated on a browser-only API — see useInView.ts.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplay(`${target.toLocaleString("en-US")}${suffix}`);
      return;
    }

    const steps = 50;
    const increment = target / steps;
    const stepDuration = duration / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(target, Math.round(increment * step));
      setDisplay(`${current.toLocaleString("en-US")}${suffix}`);
      if (step >= steps || current >= target) {
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isInView, target, suffix, duration]);

  return { ref, display };
}
