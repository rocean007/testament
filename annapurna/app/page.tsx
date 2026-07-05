import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import { buildJsonLd } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { NoticeBar } from "@/components/notice/NoticeBar";
import { WelcomeOverlay } from "@/components/welcome/WelcomeOverlay";
import { FeeCalculator } from "@/components/calculator/FeeCalculator";
import { FlagsMarquee } from "@/components/marquee/FlagsMarquee";
import { Hero } from "@/components/hero/Hero";
import { Services } from "@/components/services/Services";
import { Stats } from "@/components/stats/Stats";
import { Team } from "@/components/team/Team";
import { Faq } from "@/components/faq/Faq";
import { ReturnPolicy } from "@/components/policy/ReturnPolicy";
import { Footer } from "@/components/footer/Footer";

const TITLE = "Work Permit Renewal & Flight Tickets Nepal | Annapurna Sewa Kathmandu";
const DESCRIPTION =
  "Renew your Nepal work permit (Shram Swikriti) online in 24 hours. Book confirmed flight tickets to Dubai, Doha & Kuala Lumpur. Certified agents in Kathmandu. Call: +977-9802398981";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "work permit renewal Nepal",
    "shram swikriti navikarana",
    "online Nepal work permit",
    "flight ticket booking Kathmandu",
    "cheap flights Kathmandu Dubai Doha",
    "shram swikriti 2081 82",
    "Nepal migrant worker services",
  ],
  authors: [{ name: "Annapurna Sewa | Certified Immigration & Travel Agent, Kathmandu" }],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: TITLE,
    description:
      "Renew your Nepal work permit (Shram Swikriti) in 24 hours. Book cheap flights to Dubai, Doha & KL. Certified agents in Kathmandu, Nepal.",
    type: "website",
    url: SITE_URL,
    siteName: "Annapurna Sewa",
    locale: "en_US",
    images: [
      {
        url: "/logo.jpg",
        width: 200,
        height: 200,
        alt: "Annapurna Sewa — Work Permit Renewal & Flight Ticket Booking, Kathmandu",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description:
      "Renew your Nepal work permit (Shram Swikriti) in 24 hours. Book cheap flights to Dubai, Doha & KL. Certified agents in Kathmandu.",
    images: ["/logo.jpg"],
  },
  other: {
    "geo.region": "NP-BA",
    "geo.placename": "Kathmandu, Nepal",
    "geo.position": "27.7172;85.3240",
    ICBM: "27.7172, 85.3240",
  },
};

export default function HomePage() {
  const jsonLd = buildJsonLd();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <WelcomeOverlay />
      <Header />
      <main>
        <NoticeBar />
        <FlagsMarquee />
        <Hero />
        <Services />
        <Stats />
        <Team />
        <Faq />
        <ReturnPolicy />
      </main>
      <Footer />
      <FeeCalculator />
    </>
  );
}
