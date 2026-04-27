"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "motion/react";

interface FaqItem {
  q: string;
  a: string;
}

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="flex flex-col divide-y divide-[var(--border)]">
      {items.map((item, idx) => {
        const open = openIdx === idx;
        return (
          <div key={idx} className="overflow-hidden">
            <button
              onClick={() => setOpenIdx(open ? null : idx)}
              className="group w-full flex items-start justify-between gap-6 py-6 md:py-7 text-left transition-colors"
              aria-expanded={open}
              style={{
                transitionDuration: "var(--duration-base)",
                transitionTimingFunction: "var(--ease-smooth)",
              }}
            >
              <span className="flex items-start gap-4 flex-1">
                <span
                  className="mt-1 shrink-0 font-mono text-[12px] tracking-wider text-[var(--graphite-light)] tabular-nums"
                  style={{ fontFeatureSettings: '"tnum"' }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span
                  className="text-lg md:text-xl font-medium leading-snug break-keep-all text-[var(--ink)] group-hover:text-[var(--sage-dark)] transition-colors"
                  style={{
                    fontFamily: "var(--font-serif)",
                    transitionDuration: "var(--duration-base)",
                    transitionTimingFunction: "var(--ease-smooth)",
                  }}
                >
                  {item.q}
                </span>
              </span>
              <span
                className="mt-1.5 inline-flex items-center justify-center w-9 h-9 rounded-full bg-[var(--ink)]/4 text-[var(--ink)] shrink-0 transition-transform"
                style={{
                  transform: open ? "rotate(45deg)" : "rotate(0)",
                  transitionDuration: "var(--duration-base)",
                  transitionTimingFunction: "var(--ease-smooth)",
                }}
              >
                <Icon icon="solar:add-square-linear" width={18} height={18} />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{ overflow: "hidden" }}
                >
                  <div className="pl-10 pr-14 pb-7 text-[15px] md:text-base text-[var(--graphite)] leading-relaxed break-keep-all max-w-2xl">
                    {item.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
