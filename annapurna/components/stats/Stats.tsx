"use client";

import { Award, Globe, Heart, Users } from "lucide-react";
import { STATS } from "@/lib/content";
import { useCountUp } from "./useCountUp";

const ICONS = {
  "globe-americas": Globe,
  users: Users,
  award: Award,
  heart: Heart,
} as const;

function StatItem({ stat }: { stat: (typeof STATS)[number] }) {
  const { ref, display } = useCountUp<HTMLDivElement>(stat.value, { suffix: stat.suffix });
  const Icon = ICONS[stat.icon];

  return (
    <div ref={ref} className="flex flex-col items-center gap-2 text-center">
      <Icon className="size-6 text-white/50" aria-hidden="true" />
      <span className="text-3xl font-bold text-white">{display}</span>
      <span className="text-sm text-white/60">{stat.label}</span>
    </div>
  );
}

export function Stats() {
  return (
    <section className="bg-dark py-12">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-4 sm:grid-cols-4 sm:px-6">
        {STATS.map((stat) => (
          <StatItem key={stat.label} stat={stat} />
        ))}
      </div>
    </section>
  );
}
