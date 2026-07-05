import { formatNpr, FEE_SCHEDULE } from "./fees";

export interface FaqEntry {
  question: string;
  answer: string;
}

// ---------- Service-card mini FAQ (work permit card) ----------

export const WORK_PERMIT_MINI_FAQ: FaqEntry[] = [
  {
    question: "अबश्यक कागजात के के हुन त ?",
    answer:
      "आवश्यक कागजातहरू:\n" +
      "✅ पासपोर्ट\n" +
      "✅ भिसा / भिसा कार्ड\n" +
      "✅ आगमन (Arrival) र प्रस्थान (Departure) स्ट्याम्प\n" +
      "✅ कम्पनी नाम परिवर्तन भएको भए नयाँ एग्रिमेन्ट पेपर अनिवार्य",
  },
  {
    question: "श्रम स्वीकृति गरेर जाँदा केके फाइदा श्रमिकलाई हुन्छ ?",
    answer:
      "वैदेशिक रोजगारमा विदेश जानु अघि श्रम स्वीकृति गरेर जानाले श्रमिकलाई तलका फाइदाहरू हुन्छ:\n\n" +
      "1. कानुनी सुरक्षा: श्रम स्वीकृति लिँदा श्रमिकलाई काम गर्ने देशको सरकारबाट कानुनी सुरक्षा मिल्छ। यसले श्रमिकलाई काम गर्दा कुनै समस्या परेमा कानुनी सहारा दिने काम गर्छ।\n" +
      "2. सही तलब र कामका शर्तहरू: श्रम स्वीकृतिमा श्रमिकलाई निर्धारित तलब र काम गर्ने घण्टा, छुट्टी, कार्य वातावरण जस्ता शर्तहरू सुनिश्चित गरिन्छ।\n" +
      "3. कामको स्थिरता: बिना श्रम स्वीकृतिका काम अवैध मानिन्छ, जसले श्रमिकलाई कानुनी समस्यामा पुर्‍याउन सक्छ। स्वीकृति लिँदा काम स्थिर र वैध (लिगल) हुन्छ।\n" +
      "4. स्वास्थ्य र सुरक्षा: श्रम स्वीकृति लिँदा श्रमिकलाई स्वास्थ्य बीमा र काम गर्ने क्रममा सुरक्षा सुनिश्चित गरिन्छ।\n" +
      "5. कसैसँग ठगीको डर कम: श्रम स्वीकृति लिएको श्रमिकलाई ठगीको सामना गर्नुपर्ने सम्भावना कम हुन्छ, किनकि यो वैध (लिगल) प्रक्रिया हो।\n\n" +
      "यसैले, श्रम स्वीकृति गरेर जानाले श्रमिकलाई सुरक्षित, कानुनी, र सन्तुलित कार्य वातावरण दिन्छ। श्रम स्वीकृति बिना विदेशमा काम गर्न जानु कानुनी समस्या निम्त्याउन सक्छ र तपाईंको हक अधिकार सुरक्षित रहन सक्दैन।",
  },
];

// ---------- Main FAQ section (category-tabbed) ----------

export const PERMIT_FAQ: FaqEntry[] = [
  {
    question: "वर्क पर्मिट नवीकरण कसरि गर्ने?",
    answer: "अनलाइन फर्म भर्नुहोस् → आवश्यक कागजात अपलोड गर्नुहोस् → शुल्क भुक्तानी गर्नुहोस् → प्रगति ट्र्याक गर्नुहोस्।",
  },
  {
    question: "कति समयमा नवीकरण हुन्छ?",
    answer: "सामान्यतया 7–15 कार्य दिनमा पूरा हुन्छ।",
  },
  {
    question: "पुलिस रिपोर्टका लागि आवश्यक कागजातहरू के के हुन्?",
    answer:
      "* पासपोर्ट साइज फोटो\n" +
      "* नागरिकताको अगाडि–पछाडिको फोटो\n" +
      "* पासपोर्ट (भएमा)\n" +
      "* नेपालको सक्रिय मोबाइल नम्बर र इमेल आइडी\n" +
      "* विवाहित भएमा विवाह दर्ताको फोटो\n" +
      "* आमा–बुवा तथा हजुरबा–आमाको पूरा नाम\n" +
      "* स्थायी ठेगाना\n\n" +
      "सूचना: यो प्रक्रिया तपाईँले आफैँ अनलाइनमार्फत गर्न सक्नुहुन्छ। सहजीकरण आवश्यक भएमा मात्र कागजातहरू पठाइदिनुहोला।",
  },
  {
    question: "फेस-टू-फेस जानुपर्छ कि?",
    answer: "हाम्रो अनलाइन सेवा पूर्ण डिजिटल छ। केही विशेष अवस्थामा मात्र कार्यालय जानुपर्ने हुन सक्छ।",
  },
  {
    question: "फीस कति हुन्छ?",
    answer: "न्यूनतम खर्चमै सेवा उपलब्ध छ। शुल्क तपाईंको आवेदन अनुसार फरक पर्न सक्छ।",
  },
  {
    question: "नवीकरण स्टाटस कसरी ट्र्याक गर्ने?",
    answer:
      "तपाईं नेपाल सरकारको वैदेशिक रोजगार विभागको आधिकारिक वेबसाइट https://www.feo.gov.np मा गएर " +
      "“अन्तिम श्रम स्वीकृति खोजी” भन्ने सेक्सनमा\n" +
      "✨ आफ्नो पासपोर्ट नम्बर राखेर\n" +
      "🔍 तुरुन्तै हेर्न सक्नुहुन्छ कि श्रम स्वीकृति भएको छ कि छैन।",
  },
];

export const FLIGHT_FAQ: FaqEntry[] = [
  {
    question: "टिकट बुकिङ कसरि गर्ने?",
    answer: "तपाईंले हाम्रो वेबसाइटमा उडान खोज्नुभयो → उपयुक्त फ्लाइट चयन → विवरण भर्नुहोस् → भुक्तानी गर्नुहोस्।",
  },
  {
    question: "भुक्तानीका विकल्पहरू के के छन्?",
    answer: "हामीले बैंक कार्ड, मोबाइल बैंकिङ, e-wallet र नेट बैंकिङ विकल्पहरू समर्थन गर्छौं।",
  },
  {
    question: "क्यान्सल र रिफन्ड नीतिहरू के छन्?",
    answer: "टिकट अनुसार फरक हुन्छ। हाम्रो सिस्टमले तत्काल रिफन्ड वा क्रेडिट विकल्प देखाउँछ।",
  },
  {
    question: "बुकिङ कन्फर्म भएको कसरी थाहा पाउने?",
    answer: "सफल भुक्तानीपछि तपाईंको ईमेल र SMS मा कन्फर्मेसन पठाइन्छ।",
  },
  {
    question: "फ्लाइट समय/गेट परिवर्तन भए के गर्ने?",
    answer: "हाम्रो साइटमा \"My Bookings\" बाट अपडेट हेर्न सक्नुहुन्छ। तत्काल नोटिफिकेशन पनि पठाइन्छ।",
  },
  {
    question: "सस्तो टिकट पाउने सुझाव के छन्?",
    answer: "अग्रिम बुकिङ गर्नुहोस्, फ्लेक्सिबल मितिहरू रोज्नुहोस्, र अफर/डिस्काउन्ट हेर्नुहोस्।",
  },
];

export const MAIN_FAQ_CATEGORIES = [
  { id: "flight", label: "Flight Ticket Booking", icon: "plane", items: FLIGHT_FAQ },
  { id: "permit", label: "Work Permit Renewal", icon: "file-contract", items: PERMIT_FAQ },
] as const;

// ---------- Calculator-derived FAQ, generated from lib/fees.ts so it can never drift ----------

export function buildCalculatorFaq(): FaqEntry[] {
  const { upTo35, above35 } = FEE_SCHEDULE;
  return [
    {
      question: "How to renew work permit (Shram Swikriti) in Nepal?",
      answer:
        "Fill the online form on the DoFE portal, upload required documents (passport, visa, arrival/departure stamps, new agreement if company changed), pay the renewal fee, and track progress. Contact Annapurna Sewa for expert facilitation.",
    },
    {
      question: "How long does Nepal work permit renewal take?",
      answer: "Nepal work permit renewal (Shram Swikriti navikarana) typically takes 7 to 15 working days to complete.",
    },
    {
      question: "What is the work permit renewal fee in Nepal 2081/82?",
      answer:
        `Nepal Shram Swikriti renewal fee: Age 35 and below — ${formatNpr(upTo35.sameCompany)} (same company) or ` +
        `${formatNpr(upTo35.changedCompany)} (company change). Age above 35 — ${formatNpr(above35.sameCompany)} (same company) or ` +
        `${formatNpr(above35.changedCompany)} (company change).`,
    },
    {
      question: "What documents are needed for work permit renewal in Nepal?",
      answer:
        "Required documents: Passport, Visa or Visa Card, Arrival and Departure stamps, and new agreement paper if company has changed (mandatory).",
    },
    {
      question: "Where to book cheap flights from Kathmandu to Dubai, Doha, and Kuala Lumpur?",
      answer:
        "Annapurna Sewa offers best-price guaranteed flight ticket booking from Kathmandu (KTM) to Dubai (DXB), Doha (DOH), Kuala Lumpur (KUL), Riyadh (RUH), and all major international destinations. Contact via WhatsApp.",
    },
  ];
}
