interface Props {
  children: React.ReactNode;
  variant?: "sage" | "terracotta" | "ink" | "light";
  className?: string;
}

export function Eyebrow({ children, variant = "sage", className = "" }: Props) {
  const styles =
    variant === "sage"
      ? "bg-[var(--sage)]/12 text-[var(--sage-dark)]"
      : variant === "terracotta"
        ? "bg-[var(--terracotta)]/12 text-[var(--terracotta-dark)]"
        : variant === "light"
          ? "bg-white/10 text-white/80 ring-1 ring-white/15"
          : "bg-[var(--ink)]/8 text-[var(--ink)]";

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10.5px] md:text-[11px] uppercase tracking-[0.2em] font-medium ${styles} ${className}`}
    >
      <span className="inline-block w-1 h-1 rounded-full bg-current opacity-80" />
      {children}
    </span>
  );
}
