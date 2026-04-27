"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

export function StickyCtaBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 800);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToForm = () => {
    const form = document.getElementById("form-section");
    if (form) form.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="fixed bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 px-4"
      style={{
        transform: visible
          ? "translate(-50%, 0)"
          : "translate(-50%, 120%)",
        opacity: visible ? 1 : 0,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      aria-hidden={!visible}
    >
      <div className="p-1.5 rounded-full bg-[var(--ink)]/8 ring-1 ring-[var(--ink)]/10 backdrop-blur-xl shadow-[var(--shadow-xl)]">
        <div className="flex items-center gap-2 md:gap-3 rounded-full bg-[var(--ink)]/95 backdrop-blur-xl pl-5 pr-2 py-2">
          <div className="flex items-center gap-2.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--sage)] animate-[pulse-dot_2s_ease-in-out_infinite]" />
            <p className="text-[13px] md:text-sm font-medium text-white whitespace-nowrap">
              지금 상담 신청하기
            </p>
          </div>
          <button
            onClick={scrollToForm}
            className="inline-flex items-center gap-1.5 rounded-full bg-white text-[var(--ink)] px-4 py-2 text-[13px] md:text-sm font-medium hover:scale-[1.02] active:scale-[0.98] transition-transform"
            style={{
              transitionDuration: "var(--duration-base)",
              transitionTimingFunction: "var(--ease-smooth)",
            }}
          >
            문의
            <Icon icon="solar:arrow-right-linear" width={14} height={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
