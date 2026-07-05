"use client";

import {
  Button,
  Disclosure as AriaDisclosure,
  DisclosureGroup,
  DisclosurePanel,
  Heading,
} from "react-aria-components";
import { cn } from "@/lib/cn";

export interface AccordionEntry {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: AccordionEntry[];
  groupId: string;
  className?: string;
}

/**
 * The one shared accordion used everywhere in the site (service mini-FAQ and
 * the main FAQ section) — replaces two independently hand-rolled, ARIA-incomplete
 * implementations in the legacy site.
 */
export function FaqAccordion({ items, groupId, className }: FaqAccordionProps) {
  return (
    <DisclosureGroup className={cn("flex flex-col gap-2", className)}>
      {items.map((item, index) => (
        <AriaDisclosure
          key={`${groupId}-${index}`}
          id={`${groupId}-${index}`}
          className="overflow-hidden rounded-xl border border-black/10 bg-white/60"
        >
          {({ isExpanded }) => (
            <>
              <Heading className="m-0">
                <Button
                  slot="trigger"
                  className={cn(
                    "flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold text-dark outline-none transition-colors",
                    "hover:bg-black/5",
                    "data-[focus-visible]:ring-2 data-[focus-visible]:ring-primary data-[focus-visible]:ring-inset",
                  )}
                >
                  <span>{item.question}</span>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    className={cn(
                      "size-4 flex-shrink-0 transition-transform duration-200",
                      isExpanded && "rotate-180",
                    )}
                  >
                    <path
                      d="M5 7.5l5 5 5-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Button>
              </Heading>
              <DisclosurePanel className="px-4 pb-4 text-sm leading-relaxed whitespace-pre-line text-muted">
                {item.answer}
              </DisclosurePanel>
            </>
          )}
        </AriaDisclosure>
      ))}
    </DisclosureGroup>
  );
}
