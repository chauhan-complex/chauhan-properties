"use client";

import { useState } from "react";
import { Icon } from "./icons";
import { cn } from "@/lib/utils";

export default function FaqAccordion({ items }: { items: Array<{ q: string; a: string }> }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="group flex w-full items-start justify-between gap-6 py-5 text-left"
            >
              <span className="flex gap-4">
                <span className="mt-1 font-display text-[0.8rem] text-brass tnum">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "font-display text-[1.12rem] leading-snug font-semibold transition-colors duration-300 md:text-[1.28rem]",
                    isOpen ? "text-moss" : "text-ink group-hover:text-moss",
                  )}
                >
                  {item.q}
                </span>
              </span>
              <span
                className={cn(
                  "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-400",
                  isOpen
                    ? "rotate-45 border-moss bg-moss text-cream"
                    : "border-line text-stone group-hover:border-moss group-hover:text-moss",
                )}
              >
                <Icon name="plus" size={15} />
              </span>
            </button>
            <div
              className={cn(
                "grid transition-all duration-500 ease-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-3xl pb-6 pl-10 text-[0.94rem] leading-relaxed text-stone">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
