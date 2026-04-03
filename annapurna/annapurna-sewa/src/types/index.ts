export interface Airport {
  name: string;
  city: string;
  country: string;
  code: string;
}

export interface Country {
  name: string;
  flag: string;
}

export interface FlightFormData {
  from: string;
  to: string;
  date: string;
  passengers: string;
  tripType: string;
}

export interface FaqItem {
  question: string;
  answer: React.ReactNode;
  delay?: number;
}

export interface FeeResult {
  sameCompany: number;
  companyChange: number;
}
