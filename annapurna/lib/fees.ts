// Nepal "Shram Swikriti" (work permit) renewal fee schedule.
// Source: Nepal Department of Foreign Employment (DoFE), FY 2081/82.
// These figures also drive the calculator-derived FAQ answers in lib/faq-data.ts
// so the two never drift apart the way they did in the legacy hand-duplicated copy.

export const AGE_MIN = 16;
export const AGE_MAX = 70;
export const AGE_THRESHOLD = 35;
export const FEE_SCHEDULE_LABEL = "FY 2081/82";

export interface FeeAmount {
  sameCompany: number;
  changedCompany: number;
}

export const FEE_SCHEDULE: Record<"upTo35" | "above35", FeeAmount> = {
  upTo35: { sameCompany: 8284, changedCompany: 8434 },
  above35: { sameCompany: 9507, changedCompany: 9657 },
};

export function isAgeInRange(age: number): boolean {
  return Number.isFinite(age) && age >= AGE_MIN && age <= AGE_MAX;
}

export function getFee(age: number): FeeAmount {
  return age <= AGE_THRESHOLD ? FEE_SCHEDULE.upTo35 : FEE_SCHEDULE.above35;
}

/**
 * Age in whole completed years as of `today`, given a birth date.
 * Matches the "age last birthday" convention used by DoFE for fee tiering.
 */
export function calculateAge(birthDate: Date, today: Date): number {
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age;
}

export function formatNpr(amount: number): string {
  return `रु ${amount.toLocaleString("en-IN")}`;
}
