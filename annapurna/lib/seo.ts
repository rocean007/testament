import {
  ADDRESS,
  BUSINESS_NAME,
  EMAIL,
  GEO,
  OPENING_HOURS,
  PHONE_E164,
  SITE_URL,
  WHATSAPP_NUMBER,
} from "./constants";
import { buildCalculatorFaq } from "./faq-data";

export function buildJsonLd() {
  const organization = {
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${SITE_URL}/#organization`,
    name: BUSINESS_NAME,
    url: SITE_URL,
    image: `${SITE_URL}/logo.jpg`,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.jpg` },
    telephone: PHONE_E164,
    email: EMAIL,
    address: { "@type": "PostalAddress", ...ADDRESS },
    geo: { "@type": "GeoCoordinates", ...GEO },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: OPENING_HOURS.days,
      opens: OPENING_HOURS.opens,
      closes: OPENING_HOURS.closes,
    },
    priceRange: "$$",
    areaServed: [
      { "@type": "Country", name: "Nepal" },
      { "@type": "Country", name: "United Arab Emirates" },
      { "@type": "Country", name: "Qatar" },
      { "@type": "Country", name: "Malaysia" },
      { "@type": "Country", name: "Saudi Arabia" },
      { "@type": "Country", name: "Kuwait" },
      { "@type": "Country", name: "Oman" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Work Permit Renewal Support",
            alternateName: "Shram Swikriti Navikarana",
            description:
              "Professional Nepal work permit (Shram Swikriti) renewal assistance for migrant workers going to UAE, Qatar, Malaysia, and Saudi Arabia.",
            areaServed: ["Nepal", "UAE", "Qatar", "Malaysia", "Saudi Arabia"],
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "International Flight Ticket Booking",
            description:
              "Book cheap international flight tickets from Kathmandu (KTM) to Dubai, Doha, Kuala Lumpur, Riyadh and worldwide destinations at best price.",
            areaServed: "Worldwide",
          },
        },
      ],
    },
    sameAs: [`https://wa.me/${WHATSAPP_NUMBER}`],
  };

  const faqPage = {
    "@type": "FAQPage",
    mainEntity: buildCalculatorFaq().map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: { "@type": "Answer", text: entry.answer },
    })),
  };

  const website = {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: `${BUSINESS_NAME} — Work Permit Renewal & Flight Ticket Booking Nepal`,
    description:
      "Nepal work permit renewal (Shram Swikriti navikarana) and international flight ticket booking service in Kathmandu.",
    inLanguage: ["en", "ne"],
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organization, faqPage, website],
  };
}
