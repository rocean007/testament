"use client";

import { FileText, Plane } from "lucide-react";
import { MAIN_FAQ_CATEGORIES } from "@/lib/faq-data";
import { FaqAccordion } from "@/components/ui/Disclosure";
import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/Tabs";

const ICONS = {
  plane: Plane,
  "file-contract": FileText,
} as const;

export function Faq() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h2 className="text-center text-2xl font-bold text-dark sm:text-3xl">
        Frequently Asked Questions — Work Permit Renewal &amp; Flight Booking Nepal
      </h2>

      <Tabs defaultSelectedKey={MAIN_FAQ_CATEGORIES[0].id} className="mt-8">
        <TabList aria-label="FAQ category" className="justify-center">
          {MAIN_FAQ_CATEGORIES.map((category) => {
            const Icon = ICONS[category.icon];
            return (
              <Tab key={category.id} id={category.id}>
                <Icon className="size-4" aria-hidden="true" />
                {category.label}
              </Tab>
            );
          })}
        </TabList>

        {MAIN_FAQ_CATEGORIES.map((category) => (
          <TabPanel key={category.id} id={category.id}>
            <FaqAccordion items={category.items} groupId={`faq-${category.id}`} />
          </TabPanel>
        ))}
      </Tabs>
    </section>
  );
}
