"use client";

import { useEffect } from "react";

export function useReveal() {
  useEffect(() => {
    const t = window.setTimeout(() => {
      const els = document.querySelectorAll<HTMLElement>(".reveal");
      const vh = window.innerHeight;
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.95) el.classList.add("visible");
      });
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("visible");
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
      );
      els.forEach((el) => {
        if (!el.classList.contains("visible")) io.observe(el);
      });
      // Stash for cleanup
      (window as unknown as { _revealIO?: IntersectionObserver })._revealIO = io;
    }, 50);
    return () => {
      window.clearTimeout(t);
      const w = window as unknown as { _revealIO?: IntersectionObserver };
      if (w._revealIO) w._revealIO.disconnect();
    };
  }, []);
}
