import { SERVICES } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceCard } from "./ServiceCard";

export function Services() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="grid gap-6 sm:grid-cols-2">
        {SERVICES.map((service, index) => (
          <Reveal key={service.id} variant={index === 0 ? "left" : "right"}>
            <ServiceCard service={service} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
