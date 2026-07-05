import type { Airport } from "@/lib/airports";
import { airportLabel } from "@/lib/airports";

export interface FlightBookingDetails {
  from: Airport;
  to: Airport;
  travelDate: Date;
  passengers: string;
  tripType: "oneway" | "roundtrip";
}

export function buildFlightMessage(details: FlightBookingDetails): string {
  const formattedDate = details.travelDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const tripLabel = details.tripType === "roundtrip" ? "Round Trip" : "One Way Trip";

  return (
    "FLIGHT BOOKING REQUEST:\n\n" +
    `• From: ${airportLabel(details.from)}\n` +
    `• To: ${airportLabel(details.to)}\n` +
    `• Travel Date: ${formattedDate}\n` +
    `• Trip Type: ${tripLabel}\n` +
    `• Passengers: ${details.passengers}\n\n` +
    "Please book the flight for me and provide the details."
  );
}
