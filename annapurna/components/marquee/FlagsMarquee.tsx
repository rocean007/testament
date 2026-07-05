import { DESTINATIONS } from "@/lib/countries";

export function FlagsMarquee() {
  // Rendered once, doubled here intentionally for a seamless CSS loop —
  // the legacy site doubled this by accident across two separate scripts
  // (ending up 4x), this is the correct single source of the doubling.
  const looped = [...DESTINATIONS, ...DESTINATIONS];

  return (
    <div className="group overflow-hidden border-y border-black/5 bg-dark py-3">
      <div className="flex w-max animate-marquee gap-3 motion-reduce:animate-none group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]">
        {looped.map((destination, index) => (
          <div
            key={`${destination.name}-${index}`}
            className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white/90"
          >
            <span aria-hidden="true" className="text-xl">
              {destination.flag}
            </span>
            <span>{destination.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
