import { describe, expect, it } from "vitest";
import { airportLabel, getAirportById, searchAirports } from "./airports";

describe("searchAirports", () => {
  it("returns nothing for queries under 2 characters", () => {
    expect(searchAirports("k")).toEqual([]);
    expect(searchAirports("")).toEqual([]);
  });

  it("matches by city, country, or IATA code case-insensitively", () => {
    expect(searchAirports("doha").some((a) => a.id === "DOH")).toBe(true);
    expect(searchAirports("QATAR").some((a) => a.id === "DOH")).toBe(true);
    expect(searchAirports("dxb").some((a) => a.id === "DXB")).toBe(true);
  });

  it("prioritizes city-starts-with matches first", () => {
    const results = searchAirports("ka");
    const ktm = results.findIndex((a) => a.id === "KTM");
    expect(ktm).toBeGreaterThanOrEqual(0);
    expect(results[0]!.city.toLowerCase().startsWith("ka")).toBe(true);
  });

  it("caps results at the given limit", () => {
    expect(searchAirports("a", 3).length).toBeLessThanOrEqual(3);
  });
});

describe("getAirportById", () => {
  it("finds an airport by its IATA code", () => {
    expect(getAirportById("KTM")?.city).toBe("Kathmandu");
  });

  it("returns undefined for an unknown code", () => {
    expect(getAirportById("ZZZ")).toBeUndefined();
  });
});

describe("airportLabel", () => {
  it("formats as City, Country (CODE)", () => {
    const ktm = getAirportById("KTM")!;
    expect(airportLabel(ktm)).toBe("Kathmandu, Nepal (KTM)");
  });
});
