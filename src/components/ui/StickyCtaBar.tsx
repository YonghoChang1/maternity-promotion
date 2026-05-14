"use client";

import { useEffect, useState } from "react";
import { scrollToId } from "@/components/ui/CTA";

export function StickyCtaBar() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const formEl = document.getElementById("form-section");
      const formY = formEl ? formEl.offsetTop : 9999;
      setVisible(y > 600 && y < formY - 200);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className={"sticky-cta" + (visible ? " visible" : "")}>
      <span>주수만 알려주시면 가능 여부 바로 확인해드려요</span>
      <button onClick={() => scrollToId("form-section")}>일정표 받기 →</button>
    </div>
  );
}
