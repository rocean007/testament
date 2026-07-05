import { describe, expect, it } from "vitest";
import { AGE_MAX, AGE_MIN, calculateAge, FEE_SCHEDULE, formatNpr, getFee, isAgeInRange } from "./fees";

describe("getFee", () => {
  it("returns the upTo35 tier at exactly 35", () => {
    expect(getFee(35)).toEqual(FEE_SCHEDULE.upTo35);
  });

  it("returns the above35 tier at exactly 36", () => {
    expect(getFee(36)).toEqual(FEE_SCHEDULE.above35);
  });

  it("returns the upTo35 tier for a young age", () => {
    expect(getFee(16)).toEqual(FEE_SCHEDULE.upTo35);
  });

  it("returns the above35 tier for an old age", () => {
    expect(getFee(70)).toEqual(FEE_SCHEDULE.above35);
  });
});

describe("isAgeInRange", () => {
  it("accepts the documented boundaries", () => {
    expect(isAgeInRange(AGE_MIN)).toBe(true);
    expect(isAgeInRange(AGE_MAX)).toBe(true);
  });

  it("rejects values just outside the boundaries", () => {
    expect(isAgeInRange(AGE_MIN - 1)).toBe(false);
    expect(isAgeInRange(AGE_MAX + 1)).toBe(false);
  });

  it("rejects NaN", () => {
    expect(isAgeInRange(NaN)).toBe(false);
  });
});

describe("calculateAge", () => {
  it("returns a whole year difference when birthday already passed this year", () => {
    expect(calculateAge(new Date(1990, 5, 1), new Date(2026, 6, 5))).toBe(36);
  });

  it("has not had the birthday yet this year (month boundary)", () => {
    expect(calculateAge(new Date(1990, 11, 1), new Date(2026, 6, 5))).toBe(35);
  });

  it("handles same-month day boundary — birthday later this month", () => {
    expect(calculateAge(new Date(1990, 6, 20), new Date(2026, 6, 5))).toBe(35);
  });

  it("handles same-month day boundary — birthday earlier this month", () => {
    expect(calculateAge(new Date(1990, 6, 1), new Date(2026, 6, 5))).toBe(36);
  });

  it("handles the exact birthday date", () => {
    expect(calculateAge(new Date(1990, 6, 5), new Date(2026, 6, 5))).toBe(36);
  });

  it("handles a leap-year birthdate (Feb 29) evaluated on a non-leap year", () => {
    expect(calculateAge(new Date(1996, 1, 29), new Date(2026, 2, 1))).toBe(30);
    expect(calculateAge(new Date(1996, 1, 29), new Date(2026, 1, 28))).toBe(29);
  });
});

describe("formatNpr", () => {
  it("formats with the rupee prefix and thousands separators", () => {
    expect(formatNpr(8284)).toBe("रु 8,284");
    expect(formatNpr(100)).toBe("रु 100");
  });
});
