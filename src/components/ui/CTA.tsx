"use client";

import type { ReactNode, ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  ghost?: boolean;
};

export function CTA({ children, ghost, ...rest }: Props) {
  const cls = ghost ? "btn btn-ghost" : "btn btn-primary";
  return (
    <button {...rest} className={cls}>
      <span>{children}</span>
      {!ghost && <span className="arrow">→</span>}
    </button>
  );
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.pageYOffset - 8;
  window.scrollTo({ top, behavior: "smooth" });
}
