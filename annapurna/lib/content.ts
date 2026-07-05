// Static site copy — transcribed verbatim from the legacy site content.

export const NOTICE = {
  title: "सूचना (Suchana)",
  badge: "Important",
  body: "देश परिवर्तन वा पहिलो पटक श्रमका लागि पुन: मेडिकल र ओरिएन्टेशन आवश्यक हुन्छ। यी प्रक्रिया पूरा भएपछि डकुमेन्ट अपडेटको काम अघि बढ्छ।",
  items: [
    "थप जानकारी: श्रम कल सेन्टर ११४१ (NTC)",
    "सम्बन्धित घोषणापत्र (Declaration Form) अनिवार्य",
    "युरोप व्यक्तिगत नयाँ श्रम: कम्पनीको आधिकारिक इमेल आवश्यक",
    "गल्फ देश व्यक्तिगत नयाँ श्रम: Embassy letter आवश्यक",
  ],
};

export const HERO = {
  titleNepali: "वैदेशिक रोजगार एपसँग आबद्ध संस्था",
  subtitle: "Your Trusted Partner for Professional Services",
  paragraph1Pre: "Get expert assistance with ",
  paragraph1Highlight1: "Work Permit Renewal Assistance",
  paragraph1Mid: " and ",
  paragraph1Highlight2: "Flight Ticket Booking",
  paragraph1Post:
    ". आवश्यकता अनुसार छिटो, भरपर्दो र उत्कृष्ट सेवा न्यूनतम सेवा शुल्कमा",
  paragraph2:
    "तपाईंको श्रम नवीकरण गर्ने समय भएको छ? सस्तो टिकट खोज्दै हुनुहुन्छ? हामी तपाईंलाई सहयोग गर्न यहाँ छौं।",
};

export const SERVICES = [
  {
    id: "work-permit",
    icon: "file-contract",
    titleNepali: "श्रम नवीकरण सहजिकरण",
    subtitleIcon: "passport",
    subtitleNepali: "श्रम स्वीकृति नवीकरण सहजिकरण",
    subtitleEnglish: "Professional Assistance",
    features: ["न्यूनतम सेवा शुल्क", "छिटो, सजिलो, भरपर्दो", "सजिलो प्रोसेस, फास्ट रिजल्ट"],
    hasMiniFaq: true,
    questionNepali: "तपाईंको श्रम नवीकरण गर्ने समय भएको छ?",
    hintNepali: "तलको बटनमा क्लिक गर्नुहोस् :",
    ctaLabel: "Send WhatsApp Request",
    ctaIcon: "whatsapp",
  },
  {
    id: "flight-ticket",
    icon: "plane",
    titleNepali: "Flight Ticket Booking",
    subtitleIcon: "ticket-alt",
    subtitleNepali: "विमान टिकट",
    subtitleEnglish: "Best Price Guarantee",
    features: ["उत्कृष्ट सेवा", "विश्वसनीय अनुभव", "सस्तो टिकट, खुशी यात्रा"],
    hasMiniFaq: false,
    questionNepali: "तपाईं सस्तो टिकट खोज्दै हुनुहुन्छ?",
    hintNepali: "तलको बटन क्लिक गरि आफूलाई चाहिएको फ्लाइट चयन गर्नुहोस् :",
    ctaLabel: "Book Flight Ticket",
    ctaIcon: "search",
  },
] as const;

export const STATS = [
  { icon: "globe-americas", value: 17, suffix: "", label: "Countries Served" },
  { icon: "users", value: 100000, suffix: "+", label: "People Visited" },
  { icon: "award", value: 2, suffix: "+", label: "Years Experience" },
  { icon: "heart", value: 98, suffix: "%", label: "Client Satisfaction" },
] as const;

export const TEAM = [
  { name: "Suraj Adhikari", role: "Co-founder & Operations", initials: "SA", accent: "blue" },
  { name: "Sabita Adhikari", role: "Client Relations", initials: "SA", accent: "teal" },
  { name: "Roshani Lamichane", role: "Document Processing", initials: "RL", accent: "amber" },
] as const;

export const RETURN_POLICY = {
  title: "Return Policy — अन्नपूर्ण सेवा प्राली",
  subtitle: "Transparent, fair, and customer-first refund policy",
  cards: [
    {
      tone: "success",
      icon: "check",
      badge: "Our Mistake",
      text: "If any error is made by our team while providing services through अन्नपूर्ण सेवा प्राली, we will provide a full service charge refund.",
    },
    {
      tone: "warning",
      icon: "exclamation-triangle",
      badge: "Customer Error",
      text: "If the issue is caused intentionally or due to incorrect information by the customer, NPR 250 will be deducted and the remaining balance refunded.",
    },
    {
      tone: "info",
      icon: "university",
      badge: "Refund Method",
      text: "The refund amount will only be transferred to the same account from which the original payment was made.",
    },
  ],
  note: "This policy applies to all services provided by Annapurna Sewa.",
} as const;
