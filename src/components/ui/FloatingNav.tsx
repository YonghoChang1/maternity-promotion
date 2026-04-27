"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

/**
 * 플로팅 네비.
 * - Hero가 화면에서 벗어나면 상단에 Pill 형태로 등장
 * - 현재 뷰포트 중앙 영역에 있는 섹션을 자동 하이라이트
 * - 마지막 "신청하기"는 Primary 스타일
 */
const NAV_ITEMS: { id: string; label: string; primary?: boolean }[] = [
  { id: "empathy-section", label: "공감" },
  { id: "offer-section", label: "혜택" },
  { id: "gallery-section", label: "사례" },
  { id: "faq-section", label: "Q&A" },
  { id: "form-section", label: "신청하기", primary: true },
];

export function FloatingNav() {
  const [visible, setVisible] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Hero가 화면에서 벗어나면 Nav 표시
  useEffect(() => {
    const hero = document.getElementById("hero-section");
    if (!hero) return;

    const io = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0, rootMargin: "-80px 0px 0px 0px" },
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  // 현재 활성 섹션 추적
  useEffect(() => {
    const sections = NAV_ITEMS.map((item) =>
      document.getElementById(item.id),
    ).filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
    );
    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          key="floating-nav"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-4 left-1/2 z-50 hidden md:flex items-center gap-1 p-1.5 rounded-full border border-[var(--border)]"
          style={{
            transform: "translateX(-50%)",
            background: "rgba(255, 255, 255, 0.88)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            boxShadow:
              "0 8px 24px rgba(77, 52, 39, 0.08), 0 2px 6px rgba(77, 52, 39, 0.04)",
          }}
          aria-label="페이지 섹션 네비게이션"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.id;

            if (item.primary) {
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item.id)}
                  className="px-4 py-2 rounded-full text-[13px] font-medium text-white transition-colors duration-300 ml-0.5"
                  style={{
                    background: "var(--terracotta)",
                    letterSpacing: "-0.005em",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "var(--terracotta-dark)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "var(--terracotta)";
                  }}
                >
                  {item.label}
                </a>
              );
            }

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={`px-3.5 py-2 rounded-full text-[13px] transition-colors duration-300 ${
                  isActive
                    ? "text-[var(--ink)]"
                    : "text-[var(--graphite)] hover:text-[var(--ink)]"
                }`}
                style={{
                  background: isActive
                    ? "rgba(26, 23, 20, 0.06)"
                    : "transparent",
                  letterSpacing: "-0.005em",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(26, 23, 20, 0.04)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.background =
                      "transparent";
                  }
                }}
              >
                {item.label}
              </a>
            );
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
