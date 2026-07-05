"use client";

import { useState } from "react";
import { z } from "zod";
import { Button, Dialog, DialogTrigger, Heading, Modal } from "react-aria-components";
import { Plane, Search, X } from "lucide-react";
import type { Airport } from "@/lib/airports";
import { useCooldown } from "@/components/ui/useCooldown";
import { useToast } from "@/components/ui/ToastProvider";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { AirportAutocomplete } from "./AirportAutocomplete";
import { buildFlightMessage } from "./flightMessage";

const PASSENGER_OPTIONS = ["1", "2", "3", "4", "5+"] as const;

const DetailsSchema = z
  .object({
    travelDate: z.string().refine((value) => {
      const selected = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return !Number.isNaN(selected.getTime()) && selected >= today;
    }, "Please choose today or a future date"),
    passengers: z.enum(PASSENGER_OPTIONS),
    tripType: z.enum(["oneway", "roundtrip"]),
  });

function tomorrow(): string {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date.toISOString().split("T")[0]!;
}

export function FlightBookingModal() {
  const [from, setFrom] = useState<Airport | null>(null);
  const [to, setTo] = useState<Airport | null>(null);
  const [travelDate, setTravelDate] = useState(tomorrow);
  const [passengers, setPassengers] = useState<(typeof PASSENGER_OPTIONS)[number]>("1");
  const [tripType, setTripType] = useState<"oneway" | "roundtrip">("oneway");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const attempt = useCooldown();
  const { showToast } = useToast();

  function reset() {
    setFrom(null);
    setTo(null);
    setTravelDate(tomorrow());
    setPassengers("1");
    setTripType("oneway");
    setErrors({});
  }

  function handleSubmit(e: React.FormEvent, close: () => void) {
    e.preventDefault();
    const nextErrors: Record<string, string> = {};

    if (!from) nextErrors.from = "Please select a departure airport";
    if (!to) nextErrors.to = "Please select an arrival airport";
    if (from && to && from.id === to.id) nextErrors.to = "Departure and arrival airports cannot be the same";

    const detailsResult = DetailsSchema.safeParse({ travelDate, passengers, tripType });
    if (!detailsResult.success) {
      const fieldErrors = detailsResult.error.flatten().fieldErrors;
      if (fieldErrors.travelDate?.[0]) nextErrors.travelDate = fieldErrors.travelDate[0];
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0 || !from || !to) return;

    if (!attempt()) {
      showToast("Please wait a moment before sending another request");
      return;
    }

    const message = buildFlightMessage({ from, to, travelDate: new Date(travelDate), passengers, tripType });
    window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
    showToast(`Flight booking request sent for ${from.city} to ${to.city}`);
    close();
    reset();
  }

  return (
    <DialogTrigger>
      <Button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-white transition-transform outline-none hover:scale-[1.02] data-[focus-visible]:ring-2 data-[focus-visible]:ring-primary-dark data-[focus-visible]:ring-offset-2">
        <Search className="size-4" aria-hidden="true" />
        Book Flight Ticket
      </Button>
      <Modal
        isDismissable
        className="fixed inset-0 z-[110] flex items-center justify-center p-4 data-[entering]:animate-modal-in"
      >
        <div className="fixed inset-0 -z-10 bg-black/40" aria-hidden="true" />
        <Dialog className="max-h-[85vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6 shadow-brand outline-none">
          {({ close }) => (
            <>
              <div className="mb-4 flex items-start justify-between gap-3">
                <Heading slot="title" className="flex items-center gap-2 text-lg font-bold text-dark">
                  <Plane className="size-5 text-primary" aria-hidden="true" />
                  Flight Ticket Booking
                </Heading>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close modal"
                  className="rounded-full p-1 text-muted hover:bg-black/5"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              </div>

              <form onSubmit={(e) => handleSubmit(e, close)} className="flex flex-col gap-4">
                <div>
                  <AirportAutocomplete
                    label="Departure From"
                    placeholder="e.g., Kathmandu, Nepal"
                    selected={from}
                    onChange={setFrom}
                    isInvalid={Boolean(errors.from)}
                  />
                  {errors.from && <p className="mt-1 text-xs text-secondary-dark">{errors.from}</p>}
                </div>

                <div>
                  <AirportAutocomplete
                    label="Destination To"
                    placeholder="e.g., Doha, Qatar"
                    selected={to}
                    onChange={setTo}
                    isInvalid={Boolean(errors.to)}
                  />
                  {errors.to && <p className="mt-1 text-xs text-secondary-dark">{errors.to}</p>}
                </div>

                <div>
                  <label htmlFor="travelDate" className="text-sm font-medium text-dark">
                    Preferred Travel Date
                  </label>
                  <input
                    id="travelDate"
                    type="date"
                    min={tomorrow()}
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-black/15 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                  {errors.travelDate && (
                    <p className="mt-1 text-xs text-secondary-dark">{errors.travelDate}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="passengers" className="text-sm font-medium text-dark">
                      Passengers
                    </label>
                    <select
                      id="passengers"
                      value={passengers}
                      onChange={(e) => setPassengers(e.target.value as (typeof PASSENGER_OPTIONS)[number])}
                      className="mt-1.5 w-full rounded-lg border border-black/15 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    >
                      {PASSENGER_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option} {option === "5+" ? "(Contact us)" : option === "1" ? "Passenger" : "Passengers"}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="tripType" className="text-sm font-medium text-dark">
                      Trip Type
                    </label>
                    <select
                      id="tripType"
                      value={tripType}
                      onChange={(e) => setTripType(e.target.value as "oneway" | "roundtrip")}
                      className="mt-1.5 w-full rounded-lg border border-black/15 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="oneway">One Way</option>
                      <option value="roundtrip">Round Trip</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
                >
                  <WhatsAppIcon className="size-4" />
                  Send Request via WhatsApp
                </button>
              </form>
            </>
          )}
        </Dialog>
      </Modal>
    </DialogTrigger>
  );
}
