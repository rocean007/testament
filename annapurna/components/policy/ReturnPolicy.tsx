import { CheckCircle2, Info, Landmark, ShieldCheck, TriangleAlert } from "lucide-react";
import { RETURN_POLICY } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";

const TONE_CLASSES: Record<string, { border: string; icon: string; iconColor: string }> = {
  success: { border: "border-mountain", icon: "success", iconColor: "text-mountain" },
  warning: { border: "border-accent", icon: "warning", iconColor: "text-accent" },
  info: { border: "border-primary", icon: "info", iconColor: "text-primary" },
};

const TONE_ICONS = {
  success: CheckCircle2,
  warning: TriangleAlert,
  info: Landmark,
} as const;

export function ReturnPolicy() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <Reveal>
        <div className="rounded-3xl border border-black/8 bg-white p-6 sm:p-10">
          <div className="flex flex-col items-center text-center">
            <ShieldCheck className="size-8 text-primary" aria-hidden="true" />
            <h2 className="mt-3 text-xl font-bold text-dark sm:text-2xl">{RETURN_POLICY.title}</h2>
            <p className="mt-2 text-sm text-muted">{RETURN_POLICY.subtitle}</p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {RETURN_POLICY.cards.map((card) => {
              const tone = TONE_CLASSES[card.tone]!;
              const ToneIcon = TONE_ICONS[card.tone as keyof typeof TONE_ICONS];
              return (
                <div key={card.badge} className={`rounded-lg border-l-4 bg-light p-5 ${tone.border}`}>
                  <div className={`flex items-center gap-2 text-sm font-bold ${tone.iconColor}`}>
                    <ToneIcon className="size-4" aria-hidden="true" />
                    {card.badge}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-dark/80">{card.text}</p>
                </div>
              );
            })}
          </div>

          <p className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-muted">
            <Info className="size-3.5" aria-hidden="true" />
            {RETURN_POLICY.note}
          </p>
        </div>
      </Reveal>
    </section>
  );
}
