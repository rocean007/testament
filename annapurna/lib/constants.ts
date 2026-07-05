// Single source of truth for business contact info. Every component that
// needs a phone number, WhatsApp link, email, or address must import from
// here — the legacy site had the phone number hardcoded in three different
// places, two of which disagreed with each other.

export const SITE_URL = "https://annapurnasewa.com";
export const BUSINESS_NAME = "Annapurna Sewa";

/** Digits-only, no "+", for wa.me links. */
export const WHATSAPP_NUMBER = "9779802398981";
/** E.164 format, for tel: links and JSON-LD telephone. */
export const PHONE_E164 = "+9779802398981";
export const PHONE_DISPLAY = "+977 980-2398981";

export const EMAIL = "meroaspl@gmail.com";

export const ADDRESS = {
  streetAddress: "Shivapuri School",
  addressLocality: "Kathmandu",
  addressRegion: "Bagmati Pradesh",
  postalCode: "44600",
  addressCountry: "NP",
};
export const ADDRESS_DISPLAY = "Shivapuri School, Kathmandu, Nepal";
export const MAPS_URL = "https://www.google.com/maps?q=Shivapuri+School,+Kathmandu,+Nepal";

export const GEO = { latitude: 27.7172, longitude: 85.324 };

export const OPENING_HOURS = {
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const,
  opens: "09:00",
  closes: "18:00",
};

export const WHATSAPP_MESSAGES = {
  workPermit: "नमस्कार सर, म श्रम स्वीकृति नवीकरण सम्बन्धमा सम्पर्क गरेको हुँ।",
  general: "नमस्कार सर, म फ्लाइट र श्रम स्वीकृति नवीकरण सम्बन्धमा सम्पर्क गरेको हुँ।",
};

export const MAILTO_LINK = `mailto:${EMAIL}?subject=${encodeURIComponent(
  "Inquiry from Annapurna Sewa Website",
)}&body=${encodeURIComponent(
  "Hello Annapurna Sewa Team,\n\nI would like to inquire about your services.",
)}`;
