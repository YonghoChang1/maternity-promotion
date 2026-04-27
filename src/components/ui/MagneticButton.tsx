"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { Icon } from "@iconify/react";
import { useRef } from "react";

interface Props {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  showArrow?: boolean;
  type?: "button" | "submit";
}

export function MagneticButton({
  children,
  href,
  onClick,
  className = "",
  variant = "primary",
  showArrow = true,
  type = "button",
}: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 18 });
  const springY = useSpring(y, { stiffness: 180, damping: 18 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.18);
    y.set((e.clientY - cy) * 0.18);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Double-bezel architecture: outer shell + inner core
  const shellBg =
    variant === "primary"
      ? "bg-[var(--ink)]/5 ring-1 ring-[var(--ink)]/10"
      : variant === "ghost"
        ? "bg-transparent"
        : "bg-white/60 ring-1 ring-[var(--border)]";

  const coreBg =
    variant === "primary"
      ? "bg-[var(--ink)] text-[var(--paper)]"
      : variant === "ghost"
        ? "bg-transparent text-[var(--ink)]"
        : "bg-white text-[var(--ink)]";

  const arrowBg =
    variant === "primary"
      ? "bg-white/15"
      : variant === "ghost"
        ? "bg-[var(--ink)]/8"
        : "bg-[var(--ink)]/6";

  const content = (
    <motion.button
      ref={ref}
      type={type}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`group inline-flex p-1 rounded-full ${shellBg} ${className}`}
    >
      <span
        className={`relative inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-[15px] md:text-base font-medium min-h-[48px] overflow-hidden ${coreBg}`}
        style={{ boxShadow: variant === "primary" ? "var(--shadow-inner-highlight)" : undefined }}
      >
        <span className="relative z-10">{children}</span>
        {showArrow && (
          <span
            className={`relative z-10 inline-flex items-center justify-center w-8 h-8 rounded-full transition-transform duration-500 group-hover:translate-x-1 ${arrowBg}`}
            style={{ transitionTimingFunction: "var(--ease-smooth)" }}
          >
            <Icon icon="solar:arrow-right-linear" width={16} height={16} />
          </span>
        )}
        {variant === "primary" && (
          <span
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-25"
            style={{
              background:
                "linear-gradient(110deg, transparent 0%, transparent 40%, rgba(255,255,255,0.35) 50%, transparent 60%, transparent 100%)",
              backgroundSize: "200% auto",
              animation: "shimmer 4s linear infinite",
            }}
          />
        )}
      </span>
    </motion.button>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {content}
      </a>
    );
  }
  return content;
}
