"use client";

import { Check, FileText, Plane } from "lucide-react";
import { SERVICES } from "@/lib/content";
import { WORK_PERMIT_MINI_FAQ } from "@/lib/faq-data";
import { WHATSAPP_MESSAGES } from "@/lib/constants";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { useCooldown } from "@/components/ui/useCooldown";
import { useToast } from "@/components/ui/ToastProvider";
import { FaqAccordion } from "@/components/ui/Disclosure";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { FlightBookingModal } from "@/components/booking/FlightBookingModal";

const ICONS = {
  "file-contract": FileText,
  plane: Plane,
} as const;

export function ServiceCard({ service }: { service: (typeof SERVICES)[number] }) {
  const attempt = useCooldown();
  const { showToast } = useToast();
  const Icon = ICONS[service.icon];

  return (
    <div className="flex flex-col rounded-2xl border border-black/8 bg-white p-6 sm:p-8">
      <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="size-6" aria-hidden="true" />
      </div>
      <h3 className="font-nepali mt-4 text-xl font-bold text-dark">{service.titleNepali}</h3>
      <p className="font-nepali mt-1 text-sm text-muted">
        {service.subtitleNepali} <span className="text-black/30">·</span> {service.subtitleEnglish}
      </p>

      <ul className="font-nepali mt-4 space-y-1.5 text-sm text-dark/80">
        {service.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2">
            <Check className="size-4 shrink-0 text-mountain" aria-hidden="true" />
            {feature}
          </li>
        ))}
      </ul>

      {service.hasMiniFaq && (
        <div className="mt-5">
          <FaqAccordion items={WORK_PERMIT_MINI_FAQ} groupId={`mini-faq-${service.id}`} />
        </div>
      )}

      <div className="mt-6 flex-1" />

      <p className="font-nepali text-sm text-dark/70">
        {service.questionNepali}
        <br />
        <span className="text-xs text-muted">{service.hintNepali}</span>
      </p>

      {service.id === "flight-ticket" ? (
        <FlightBookingModal />
      ) : (
        <button
          type="button"
          onClick={() => {
            if (!attempt()) {
              showToast("Please wait a moment before sending another request");
              return;
            }
            window.open(buildWhatsAppUrl(WHATSAPP_MESSAGES.workPermit), "_blank", "noopener,noreferrer");
            showToast("Work permit renewal request sent via WhatsApp");
          }}
          className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
        >
          <WhatsAppIcon className="size-4" />
          {service.ctaLabel}
        </button>
      )}
    </div>
  );
}
