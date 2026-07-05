import { TEAM } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";

const ACCENT_CLASSES: Record<string, string> = {
  blue: "bg-primary",
  teal: "bg-mountain",
  amber: "bg-accent",
};

export function Team() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="flex items-baseline justify-between border-b border-black/10 pb-4">
        <div>
          <p className="text-xs font-semibold tracking-wide text-muted uppercase">Our Team</p>
          <h2 className="mt-1 text-2xl font-bold text-dark sm:text-3xl">
            Meet the people behind Annapurna Sewa
          </h2>
        </div>
        <p className="hidden max-w-[220px] text-right text-sm text-muted sm:block">
          Dedicated professionals committed to your success
        </p>
      </div>

      <div className="mt-8 grid gap-x-6 gap-y-8 sm:grid-cols-3">
        {TEAM.map((member, index) => (
          <Reveal key={member.name} variant={index === 0 ? "left" : index === 2 ? "right" : "scale"}>
            <div className="flex items-center gap-4">
              <div
                className={`flex size-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${ACCENT_CLASSES[member.accent]}`}
              >
                {member.initials}
              </div>
              <div>
                <p className="font-semibold text-dark">{member.name}</p>
                <p className="text-sm text-muted">{member.role}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
