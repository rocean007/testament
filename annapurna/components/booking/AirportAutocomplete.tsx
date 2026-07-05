"use client";

import { useState } from "react";
import { Plane } from "lucide-react";
import { ComboBox, Input, Label, ListBox, ListBoxItem, Popover } from "react-aria-components";
import { airportLabel, getAirportById, searchAirports, type Airport } from "@/lib/airports";
import { cn } from "@/lib/cn";

interface AirportAutocompleteProps {
  label: string;
  placeholder: string;
  selected: Airport | null;
  onChange: (airport: Airport | null) => void;
  isInvalid?: boolean;
}

export function AirportAutocomplete({
  label,
  placeholder,
  selected,
  onChange,
  isInvalid,
}: AirportAutocompleteProps) {
  const [inputValue, setInputValue] = useState(selected ? airportLabel(selected) : "");
  const items = searchAirports(inputValue);

  return (
    <ComboBox
      aria-label={label}
      items={items}
      inputValue={inputValue}
      selectedKey={selected?.id ?? null}
      isInvalid={isInvalid}
      allowsEmptyCollection
      onInputChange={(value) => {
        setInputValue(value);
        if (value === "") onChange(null);
      }}
      onSelectionChange={(key) => {
        const airport = key ? getAirportById(String(key)) : null;
        onChange(airport ?? null);
        setInputValue(airport ? airportLabel(airport) : "");
      }}
      className="flex flex-col gap-1.5"
    >
      <Label className="text-sm font-medium text-dark">{label}</Label>
      <Input
        placeholder={placeholder}
        className={cn(
          "w-full rounded-lg border border-black/15 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20",
          isInvalid && "border-secondary focus:border-secondary focus:ring-secondary/20",
        )}
      />
      <Popover className="w-[--trigger-width] rounded-lg border border-black/10 bg-white shadow-brand data-[entering]:animate-popup-in">
        <ListBox className="max-h-60 overflow-y-auto p-1 outline-none">
          {(airport: Airport) => (
            <ListBoxItem
              id={airport.id}
              textValue={airportLabel(airport)}
              className="cursor-pointer rounded-md px-3 py-2 text-sm text-dark outline-none data-[focused]:bg-primary/10 data-[hovered]:bg-primary/10"
            >
              <div className="font-medium">
                {airport.city}, {airport.country}{" "}
                <span className="text-primary">({airport.id})</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted">
                <Plane className="size-3" aria-hidden="true" />
                {airport.name}
              </div>
            </ListBoxItem>
          )}
        </ListBox>
      </Popover>
      {items.length === 0 && inputValue.trim().length >= 2 && (
        <p className="text-xs text-muted">No airports found</p>
      )}
    </ComboBox>
  );
}
