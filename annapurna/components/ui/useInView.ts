"use client";

import { useEffect, useRef, useState } from "react";

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * The one scroll-reveal hook used by every section. Returns a ref to attach
 * to the element and whether it's in view — short-circuits to "always
 * visible" when the user prefers reduced motion, so no section has to
 * remember to check that individually.
 */
export function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      // window.matchMedia only exists client-side, so this one-time mount
      // sync can't be done via a lazy useState initializer without an SSR crash.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsInView(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -30px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
}
