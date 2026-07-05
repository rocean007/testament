"use client";

import {
  Tab as AriaTab,
  TabList as AriaTabList,
  TabPanel as AriaTabPanel,
  Tabs as AriaTabs,
  type TabListProps,
  type TabPanelProps,
  type TabProps,
  type TabsProps,
} from "react-aria-components";
import { cn } from "@/lib/cn";

export function Tabs({ className, ...props }: TabsProps) {
  return <AriaTabs className={cn("w-full", className as string)} {...props} />;
}

export function TabList<T extends object>({ className, ...props }: TabListProps<T>) {
  return (
    <AriaTabList
      className={cn("flex flex-wrap gap-2 border-b border-black/10 pb-2", className as string)}
      {...props}
    />
  );
}

export function Tab({ className, ...props }: TabProps) {
  return (
    <AriaTab
      className={cn(
        "flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-muted outline-none transition-colors",
        "hover:bg-black/5",
        "data-[selected]:bg-primary data-[selected]:text-white data-[selected]:shadow-sm",
        "data-[focus-visible]:ring-2 data-[focus-visible]:ring-primary data-[focus-visible]:ring-offset-2",
        className as string,
      )}
      {...props}
    />
  );
}

export function TabPanel({ className, ...props }: TabPanelProps) {
  return <AriaTabPanel className={cn("pt-6 outline-none", className as string)} {...props} />;
}
