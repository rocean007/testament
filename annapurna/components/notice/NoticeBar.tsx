"use client";

import { useEffect, useRef, useState } from "react";
import { Megaphone } from "lucide-react";
import { cn } from "@/lib/cn";
import { NOTICE } from "@/lib/content";
import { HEADER_HEIGHT_PX } from "@/components/layout/layoutConstants";

const COMPACT_HEIGHT_PX = 56;

/**
 * Collapsible सूचना notice card. Once scrolled past, it collapses into a
 * compact reminder pill that stays pinned just below the header for the rest
 * of the page — implemented with a sentinel + IntersectionObserver instead of
 * the legacy manual getBoundingClientRect math that ran on every scroll tick.
 *
 * The compact pill uses `fixed` (not `sticky`) positioning: `sticky` only
 * stays pinned while its own parent section is in view, which here is just
 * the notice card's own height — nowhere near enough to stay visible while
 * scrolling through the rest of the page. A placeholder reserves the compact
 * pill's height in the original flow position so removing the full card
 * doesn't cause a layout jump.
 */
export function NoticeBar() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isCompact, setIsCompact] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(true);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) setIsCompact(!entry.isIntersecting);
      },
      { rootMargin: `-${HEADER_HEIGHT_PX + 8}px 0px 0px 0px`, threshold: 0 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  function scrollToOriginal() {
    sentinelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setDetailsOpen(true);
  }

  return (
    <section className="mx-auto max-w-6xl px-4 pt-4 sm:px-6">
      <div ref={sentinelRef} aria-hidden="true" />
      <div style={{ height: isCompact ? COMPACT_HEIGHT_PX : 0 }} aria-hidden="true" />

      {isCompact && (
        <div
          className="fixed inset-x-4 z-40 mx-auto max-w-6xl rounded-2xl border border-accent/30 bg-white/95 shadow-brand backdrop-blur-md sm:inset-x-6"
          style={{ top: HEADER_HEIGHT_PX + 8, height: COMPACT_HEIGHT_PX }}
        >
          <button
            type="button"
            onClick={scrollToOriginal}
            className="flex h-full w-full items-center justify-between gap-3 px-4 text-left sm:px-5"
          >
            <span className="flex items-center gap-2 text-sm font-semibold text-dark">
              <Megaphone className="size-4 text-accent" aria-hidden="true" />
              <span className="font-nepali">सूचना (Suchana)</span>
            </span>
            <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-white">Open</span>
          </button>
        </div>
      )}

      <div
        className={cn(
          "rounded-2xl border border-accent/30 bg-accent-light/20 p-4 shadow-sm sm:p-5",
          isCompact && "hidden",
        )}
      >
        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-2 text-sm font-semibold text-dark">
            <Megaphone className="size-4 text-accent" aria-hidden="true" />
            <span className="font-nepali">सूचना (Suchana)</span>
            <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-bold text-white">
              Important
            </span>
          </span>
          <button
            type="button"
            aria-expanded={detailsOpen}
            onClick={() => setDetailsOpen((open) => !open)}
            className="rounded-full border border-black/10 px-3 py-1 text-xs font-semibold text-muted hover:bg-black/5"
          >
            {detailsOpen ? "Hide" : "Show"}
          </button>
        </div>
        {detailsOpen && (
          <div className="mt-3 font-nepali text-sm leading-relaxed text-dark/90">
            <p>{NOTICE.body}</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {NOTICE.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
