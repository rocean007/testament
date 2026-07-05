import Image from "next/image";
import { Globe } from "lucide-react";
import { BUSINESS_NAME } from "@/lib/constants";
import { HEADER_HEIGHT_PX } from "./layoutConstants";

export function Header() {
  return (
    <header
      className="sticky top-0 z-50 border-b border-black/5 bg-white/85 backdrop-blur-md"
      style={{ height: HEADER_HEIGHT_PX }}
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.jpg"
            alt="Annapurna Sewa Logo"
            width={48}
            height={48}
            priority
            fetchPriority="high"
            className="rounded-full"
          />
          <div className="min-w-0">
            <p className="truncate text-lg font-bold text-dark sm:text-xl">{BUSINESS_NAME}</p>
            <p className="hidden truncate text-xs text-muted sm:block">
              <span className="font-nepali">अन्नपूर्ण सेवा</span> · Professional Business Services
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 rounded-full border border-black/10 px-3 py-1.5 text-xs font-semibold text-muted">
          <Globe className="size-3.5" aria-hidden="true" />
          <span>
            EN / <span className="font-nepali">ने</span>
          </span>
        </div>
      </div>
    </header>
  );
}
