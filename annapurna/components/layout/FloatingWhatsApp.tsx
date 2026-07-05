"use client";

import { WHATSAPP_MESSAGES } from "@/lib/constants";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { useCooldown } from "@/components/ui/useCooldown";
import { useToast } from "@/components/ui/ToastProvider";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function FloatingWhatsApp() {
  const attempt = useCooldown();
  const { showToast } = useToast();

  return (
    <button
      type="button"
      aria-label="Contact on WhatsApp"
      onClick={() => {
        if (!attempt()) {
          showToast("Please wait a moment before sending another request");
          return;
        }
        window.open(buildWhatsAppUrl(WHATSAPP_MESSAGES.general), "_blank", "noopener,noreferrer");
        showToast("Opening WhatsApp chat");
      }}
      className="fixed bottom-6 right-6 z-40 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-brand transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]"
    >
      <WhatsAppIcon className="size-7" />
    </button>
  );
}
