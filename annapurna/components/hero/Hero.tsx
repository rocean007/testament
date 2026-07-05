import { HERO } from "@/lib/content";

// Deliberately not wrapped in <Reveal> — this is the first thing anyone
// sees, above the fold. Reveal's initial state is invisible until an
// IntersectionObserver fires post-hydration, which is fine for below-the-fold
// sections but would mean the hero is blank in the raw server HTML.
export function Hero() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-20">
      <h1 className="font-nepali text-3xl font-bold text-dark sm:text-4xl">{HERO.titleNepali}</h1>
      <h2 className="mt-3 text-lg font-semibold text-primary sm:text-xl">{HERO.subtitle}</h2>
      <p className="mt-6 text-base leading-relaxed text-dark/80 sm:text-lg">
        {HERO.paragraph1Pre}
        <span className="font-semibold text-secondary">{HERO.paragraph1Highlight1}</span>
        {HERO.paragraph1Mid}
        <span className="font-semibold text-secondary">{HERO.paragraph1Highlight2}</span>
        <span className="font-nepali">{HERO.paragraph1Post}</span>
      </p>
      <p className="font-nepali mt-3 text-base leading-relaxed text-dark/70 sm:text-lg">{HERO.paragraph2}</p>
    </section>
  );
}
