export interface Airport {
  /** IATA code — unique, used as the stable id for selection/matching. */
  id: string;
  name: string;
  city: string;
  country: string;
}

export const AIRPORTS: Airport[] = [
  // Nepal
  { id: "KTM", name: "Tribhuvan International Airport", city: "Kathmandu", country: "Nepal" },
  { id: "PKR", name: "Pokhara International Airport", city: "Pokhara", country: "Nepal" },
  { id: "BWA", name: "Gautam Buddha International Airport", city: "Bhairahawa", country: "Nepal" },

  // Middle East (common for Nepali employment)
  { id: "DOH", name: "Hamad International Airport", city: "Doha", country: "Qatar" },
  { id: "DXB", name: "Dubai International Airport", city: "Dubai", country: "UAE" },
  { id: "AUH", name: "Abu Dhabi International Airport", city: "Abu Dhabi", country: "UAE" },
  { id: "DMM", name: "King Fahd International Airport", city: "Dammam", country: "Saudi Arabia" },
  { id: "JED", name: "King Abdulaziz International Airport", city: "Jeddah", country: "Saudi Arabia" },
  { id: "RUH", name: "King Khalid International Airport", city: "Riyadh", country: "Saudi Arabia" },
  { id: "KWI", name: "Kuwait International Airport", city: "Kuwait City", country: "Kuwait" },
  { id: "BAH", name: "Bahrain International Airport", city: "Manama", country: "Bahrain" },
  { id: "MCT", name: "Muscat International Airport", city: "Muscat", country: "Oman" },

  // Asia
  { id: "DEL", name: "Indira Gandhi International Airport", city: "Delhi", country: "India" },
  { id: "BOM", name: "Chhatrapati Shivaji Maharaj International Airport", city: "Mumbai", country: "India" },
  { id: "KUL", name: "Kuala Lumpur International Airport", city: "Kuala Lumpur", country: "Malaysia" },
  { id: "SIN", name: "Singapore Changi Airport", city: "Singapore", country: "Singapore" },
  { id: "BKK", name: "Suvarnabhumi Airport", city: "Bangkok", country: "Thailand" },
  { id: "HKG", name: "Hong Kong International Airport", city: "Hong Kong", country: "China" },
  { id: "ICN", name: "Incheon International Airport", city: "Seoul", country: "South Korea" },
  { id: "NRT", name: "Tokyo Narita International Airport", city: "Tokyo", country: "Japan" },
  { id: "PEK", name: "Beijing Capital International Airport", city: "Beijing", country: "China" },
  { id: "PVG", name: "Shanghai Pudong International Airport", city: "Shanghai", country: "China" },

  // Europe
  { id: "LHR", name: "Heathrow Airport", city: "London", country: "UK" },
  { id: "CDG", name: "Charles de Gaulle Airport", city: "Paris", country: "France" },
  { id: "FRA", name: "Frankfurt Airport", city: "Frankfurt", country: "Germany" },
  { id: "AMS", name: "Amsterdam Airport Schiphol", city: "Amsterdam", country: "Netherlands" },
  { id: "IST", name: "Istanbul Airport", city: "Istanbul", country: "Turkey" },

  // North America
  { id: "JFK", name: "John F. Kennedy International Airport", city: "New York", country: "USA" },
  { id: "LAX", name: "Los Angeles International Airport", city: "Los Angeles", country: "USA" },
  { id: "YYZ", name: "Toronto Pearson International Airport", city: "Toronto", country: "Canada" },
  { id: "YVR", name: "Vancouver International Airport", city: "Vancouver", country: "Canada" },

  // Australia
  { id: "SYD", name: "Sydney Kingsford Smith Airport", city: "Sydney", country: "Australia" },
  { id: "MEL", name: "Melbourne Airport", city: "Melbourne", country: "Australia" },

  // Other popular destinations
  { id: "CGK", name: "Soekarno-Hatta International Airport", city: "Jakarta", country: "Indonesia" },
  { id: "MNL", name: "Ninoy Aquino International Airport", city: "Manila", country: "Philippines" },
  { id: "CMB", name: "Colombo Bandaranaike International Airport", city: "Colombo", country: "Sri Lanka" },
  { id: "DAC", name: "Dhaka Hazrat Shahjalal International Airport", city: "Dhaka", country: "Bangladesh" },
];

export function airportLabel(airport: Airport): string {
  return `${airport.city}, ${airport.country} (${airport.id})`;
}

export function searchAirports(query: string, limit = 10): Airport[] {
  const term = query.trim().toLowerCase();
  if (term.length < 2) return [];

  return AIRPORTS.filter((airport) => {
    const haystack = `${airport.city} ${airport.country} ${airport.name} ${airport.id}`.toLowerCase();
    return haystack.includes(term);
  })
    .sort((a, b) => {
      const aStarts = a.city.toLowerCase().startsWith(term);
      const bStarts = b.city.toLowerCase().startsWith(term);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      return 0;
    })
    .slice(0, limit);
}

export function getAirportById(id: string): Airport | undefined {
  return AIRPORTS.find((airport) => airport.id === id);
}
