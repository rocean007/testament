"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { BUSINESS_NAME } from "@/lib/constants";

const AUTO_DISMISS_MS = 8000;
const FADE_OUT_MS = 600;
const MOBILE_BREAKPOINT = 768;
const SESSION_KEY = "annapurna-welcome-shown";

export function WelcomeOverlay() {
  const [mounted, setMounted] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
    const alreadyShown = sessionStorage.getItem(SESSION_KEY) === "1";

    if (isMobile || alreadyShown) {
      return;
    }

    sessionStorage.setItem(SESSION_KEY, "1");
    // One-time mount sync gated on browser-only APIs (window, sessionStorage).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    const dismissTimer = setTimeout(() => setExiting(true), AUTO_DISMISS_MS);
    return () => clearTimeout(dismissTimer);
  }, []);

  useEffect(() => {
    if (!exiting) return;
    const removeTimer = setTimeout(() => setMounted(false), FADE_OUT_MS);
    return () => clearTimeout(removeTimer);
  }, [exiting]);

  if (!mounted) return null;

  return (
    <div
      role="presentation"
      aria-hidden="true"
      className={cn(
        "fixed inset-0 z-[200] flex flex-col items-center justify-center gap-6 bg-light transition-opacity duration-600",
        exiting ? "pointer-events-none opacity-0" : "opacity-100",
      )}
    >
      <div className="relative h-[100px] w-[257px] animate-plane-fly">
        <Image src="/plane.png" alt="" fill sizes="257px" className="object-contain" priority />
      </div>

      <div className="flex flex-col items-center gap-3 text-center animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
        <Image src="/logo.jpg" alt="" width={72} height={72} className="rounded-full shadow-brand" />
        <h1 className="text-2xl font-bold text-dark">Welcome to {BUSINESS_NAME}</h1>
        <p className="text-sm text-muted">Your Trusted Partner for Professional Services</p>
      </div>
    </div>
  );
}
