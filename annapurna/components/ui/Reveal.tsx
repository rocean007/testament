"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useInView } from "./useInView";

const VARIANT_CLASSES = {
  up: "translate-y-4 opacity-0",
  left: "-translate-x-6 opacity-0",
  right: "translate-x-6 opacity-0",
  scale: "scale-95 opacity-0",
} as const;

interface RevealProps {
  children: ReactNode;
  variant?: keyof typeof VARIANT_CLASSES;
  delay?: number;
  className?: string;
}

export function Reveal({ children, variant = "up", delay = 0, className }: RevealProps) {
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn(
        // "js-reveal" is targeted by a <noscript> rule in layout.tsx so
        // content stays fully visible if JS never runs at all.
        "js-reveal transition-all duration-700 ease-out",
        isInView ? "translate-x-0 translate-y-0 scale-100 opacity-100" : VARIANT_CLASSES[variant],
        className,
      )}
      style={{ transitionDelay: isInView ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
