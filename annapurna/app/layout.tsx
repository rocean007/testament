import type { Metadata, Viewport } from "next";
import { Poppins, Noto_Sans_Devanagari } from "next/font/google";
import { SITE_URL } from "@/lib/constants";
import { BackgroundLayer } from "@/components/layout/BackgroundLayer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { ToastProvider } from "@/components/ui/ToastProvider";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-noto-devanagari",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1a4f8b",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${notoDevanagari.variable}`}>
      <body className="relative min-h-screen overflow-x-hidden">
        <noscript>
          <style>{`.js-reveal { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
        <ToastProvider>
          <BackgroundLayer />
          {children}
          <FloatingWhatsApp />
        </ToastProvider>
      </body>
    </html>
  );
}
