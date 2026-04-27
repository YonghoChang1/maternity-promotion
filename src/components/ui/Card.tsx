interface Props {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "section";
  variant?: "surface" | "bone" | "ink" | "mist";
  bezel?: boolean;
}

/**
 * Double-bezel card architecture (Supanova premium aesthetic):
 * outer shell (ring + padding) + inner core (content background)
 */
export function Card({
  children,
  className = "",
  as: Tag = "div",
  variant = "surface",
  bezel = true,
}: Props) {
  const shellBg =
    variant === "ink"
      ? "bg-white/4 ring-1 ring-white/8"
      : variant === "bone"
        ? "bg-[var(--ink)]/4 ring-1 ring-[var(--ink)]/6"
        : variant === "mist"
          ? "bg-[var(--ink)]/4 ring-1 ring-[var(--ink)]/5"
          : "bg-[var(--ink)]/5 ring-1 ring-[var(--ink)]/6";

  const coreBg =
    variant === "ink"
      ? "bg-[var(--ink-soft)] text-[var(--paper)]"
      : variant === "bone"
        ? "bg-[var(--bone)]"
        : variant === "mist"
          ? "bg-[var(--mist-soft)]"
          : "bg-[var(--surface)]";

  if (!bezel) {
    return (
      <Tag
        className={`rounded-[var(--radius-lg)] p-6 md:p-8 ${coreBg} ${className}`}
      >
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      className={`p-1.5 rounded-[var(--radius-xl)] ${shellBg} ${className}`}
    >
      <div
        className={`rounded-[calc(var(--radius-xl)-0.375rem)] p-6 md:p-8 h-full ${coreBg}`}
        style={{ boxShadow: variant === "surface" ? "var(--shadow-inner-highlight)" : undefined }}
      >
        {children}
      </div>
    </Tag>
  );
}
