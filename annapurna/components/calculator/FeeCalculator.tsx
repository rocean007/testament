"use client";

import { useState } from "react";
import { Button, Dialog, DialogTrigger, Heading, Modal } from "react-aria-components";
import { Calculator, X } from "lucide-react";
import { AGE_MAX, AGE_MIN, calculateAge, formatNpr, getFee, isAgeInRange } from "@/lib/fees";
import { cn } from "@/lib/cn";
import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/Tabs";

function defaultBirthDateValue(): string {
  const today = new Date();
  const defaultDate = new Date(today.getFullYear() - 35, today.getMonth(), today.getDate());
  return defaultDate.toISOString().split("T")[0]!;
}

function todayValue(): string {
  return new Date().toISOString().split("T")[0]!;
}

export function FeeCalculator() {
  const [ageInput, setAgeInput] = useState("35");
  const [dateInput, setDateInput] = useState(defaultBirthDateValue);
  const [result, setResult] = useState<{ age: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleCalculateFromAge() {
    const age = parseInt(ageInput, 10);
    if (!isAgeInRange(age)) {
      setError(`कृपया ${AGE_MIN} देखि ${AGE_MAX} वर्षको बीचमा उमेर प्रविष्ट गर्नुहोस्।`);
      setResult(null);
      return;
    }
    setError(null);
    setResult({ age });
  }

  function handleCalculateFromDate() {
    if (!dateInput) {
      setError("कृपया जन्म मिति चयन गर्नुहोस्।");
      setResult(null);
      return;
    }
    const age = calculateAge(new Date(dateInput), new Date());
    if (!isAgeInRange(age)) {
      setError(`कृपया ${AGE_MIN} देखि ${AGE_MAX} वर्षको बीचमा जन्ममिति प्रविष्ट गर्नुहोस्।`);
      setResult(null);
      return;
    }
    setAgeInput(String(age));
    setError(null);
    setResult({ age });
  }

  const fee = result ? getFee(result.age) : null;

  return (
    <DialogTrigger>
      <Button className="fixed bottom-6 left-6 z-40 flex items-center gap-2 rounded-full bg-primary px-5 py-3.5 text-sm font-semibold text-white shadow-brand transition-transform outline-none hover:scale-105 data-[focus-visible]:ring-2 data-[focus-visible]:ring-primary-dark data-[focus-visible]:ring-offset-2">
        <Calculator className="size-4" aria-hidden="true" />
        <span className="hidden sm:inline">Fee Calculator</span>
        <span className="sm:hidden">Calculator</span>
      </Button>
      <Modal
        isDismissable
        className="fixed inset-0 z-[110] flex items-center justify-center p-4 data-[entering]:animate-modal-in"
      >
        <div className="fixed inset-0 -z-10 bg-black/40" aria-hidden="true" />
        <Dialog className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-brand outline-none">
          {({ close }) => (
            <>
              <div className="mb-4 flex items-start justify-between gap-3">
                <Heading slot="title" className="font-nepali text-lg font-bold text-dark">
                  श्रम स्वीकृति कैलकुलेटर
                </Heading>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close calculator"
                  className="rounded-full p-1 text-muted hover:bg-black/5"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              </div>

              <Tabs>
                <TabList aria-label="Calculate by">
                  <Tab id="age" className="font-nepali">
                    उमेर बाट (Age)
                  </Tab>
                  <Tab id="date" className="font-nepali">
                    जन्ममिति बाट (Birthdate)
                  </Tab>
                </TabList>

                <TabPanel id="age">
                  <label htmlFor="ageInput" className="font-nepali block text-sm font-medium text-dark">
                    उमेर (Age in years)
                  </label>
                  <input
                    id="ageInput"
                    type="number"
                    min={AGE_MIN}
                    max={AGE_MAX}
                    value={ageInput}
                    onChange={(e) => setAgeInput(e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-black/15 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                  <button
                    type="button"
                    onClick={handleCalculateFromAge}
                    className="mt-3 w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-white hover:bg-primary-dark"
                  >
                    Calculate Fee
                  </button>
                </TabPanel>

                <TabPanel id="date">
                  <label htmlFor="dateInput" className="font-nepali block text-sm font-medium text-dark">
                    जन्म मिति (Birth Date)
                  </label>
                  <input
                    id="dateInput"
                    type="date"
                    max={todayValue()}
                    value={dateInput}
                    onChange={(e) => setDateInput(e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-black/15 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                  <button
                    type="button"
                    onClick={handleCalculateFromDate}
                    className="mt-3 w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-white hover:bg-primary-dark"
                  >
                    Calculate Fee
                  </button>
                </TabPanel>
              </Tabs>

              {error && (
                <p role="alert" className="font-nepali mt-4 text-sm font-medium text-secondary-dark">
                  {error}
                </p>
              )}

              {fee && (
                <div
                  className={cn(
                    "mt-4 space-y-2 rounded-xl bg-light p-4 transition-all",
                    "animate-fade-in-up",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-nepali text-sm text-muted">पुरानो कम्पनी भएको भए</span>
                    <span className="text-lg font-bold text-mountain">{formatNpr(fee.sameCompany)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-nepali text-sm text-muted">कम्पनी परिवर्तन भएको भए</span>
                    <span className="text-lg font-bold text-mountain">{formatNpr(fee.changedCompany)}</span>
                  </div>
                </div>
              )}
            </>
          )}
        </Dialog>
      </Modal>
    </DialogTrigger>
  );
}
