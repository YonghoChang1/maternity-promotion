import type { ReactNode } from "react";

export function Eyebrow({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <span className={"eyebrow" + (light ? " is-light" : "")}>
      <span className="dot" />
      {children}
    </span>
  );
}
