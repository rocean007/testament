import { describe, expect, it } from "vitest";
import { getAirportById } from "@/lib/airports";
import { buildFlightMessage } from "./flightMessage";

describe("buildFlightMessage", () => {
  const from = getAirportById("KTM")!;
  const to = getAirportById("DOH")!;

  it("includes both airports, formatted date, trip type, and passenger count", () => {
    const message = buildFlightMessage({
      from,
      to,
      travelDate: new Date(2026, 7, 15),
      passengers: "2",
      tripType: "roundtrip",
    });

    expect(message).toContain("Kathmandu, Nepal (KTM)");
    expect(message).toContain("Doha, Qatar (DOH)");
    expect(message).toContain("August 15, 2026");
    expect(message).toContain("Round Trip");
    expect(message).toContain("Passengers: 2");
  });

  it("labels a one-way trip correctly", () => {
    const message = buildFlightMessage({
      from,
      to,
      travelDate: new Date(2026, 0, 1),
      passengers: "1",
      tripType: "oneway",
    });
    expect(message).toContain("One Way Trip");
  });
});
