import { Mail, MapPin, Phone } from "lucide-react";
import {
  ADDRESS_DISPLAY,
  BUSINESS_NAME,
  EMAIL,
  MAILTO_LINK,
  MAPS_URL,
  PHONE_DISPLAY,
  PHONE_E164,
  WHATSAPP_NUMBER,
} from "@/lib/constants";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function Footer() {
  return (
    <footer className="bg-dark py-12 text-white">
      <div className="mx-auto grid max-w-5xl gap-10 px-4 sm:grid-cols-2 sm:px-6">
        <div>
          <h3 className="text-xl font-bold">{BUSINESS_NAME}</h3>
          <p className="mt-1 text-sm text-white/70">Professional Business Services • Reliable &amp; Trustworthy</p>

          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center gap-2 text-sm text-white/80 hover:text-white"
          >
            <MapPin className="size-4 shrink-0" aria-hidden="true" />
            {ADDRESS_DISPLAY}
          </a>
          <a href={MAILTO_LINK} className="mt-2 flex items-center gap-2 text-sm text-white/80 hover:text-white">
            <Mail className="size-4 shrink-0" aria-hidden="true" />
            {EMAIL}
          </a>
          <a
            href={`tel:${PHONE_E164}`}
            className="mt-2 flex items-center gap-2 text-sm text-white/80 hover:text-white"
          >
            <Phone className="size-4 shrink-0" aria-hidden="true" />
            {PHONE_DISPLAY}
          </a>
        </div>

        <div className="flex flex-col items-start gap-3 sm:items-end">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105"
          >
            <WhatsAppIcon className="size-4" />
            Contact us on WhatsApp
          </a>
          <p className="text-sm text-white/60">Quick Response • Professional Service</p>
        </div>
      </div>

      <p className="mt-10 text-center text-xs text-white/40">
        © {new Date().getFullYear()} {BUSINESS_NAME}. All rights reserved.
      </p>
    </footer>
  );
}
