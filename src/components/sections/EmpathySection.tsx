"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { empathyContent } from "@/data/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { useInView } from "@/hooks/useInView";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * 항목별 우측 썸네일.
 * empathyContent.cards 배열 순서와 1:1 매핑.
 * (이미지 교체는 이 배열만 수정하면 됨)
 */
const cardImages: { src: string; alt: string }[] = [
  {
    src: "/assets/photos/couples/02.jpg",
    alt: "피곤한 표정으로 웨딩 카탈로그를 넘겨보는 임산부",
  },
  {
    src: "/assets/photos/consulting/KakaoTalk_20250424_125539069_02.jpg",
    alt: "박람회 부스에서 플래너와 상담 중인 예비 부부",
  },
  {
    src: "/assets/photos/couples/04.jpg",
    alt: "손을 맞잡고 대화하는 예비 부부",
  },
];

export function EmpathySection() {
  const { ref: pinInViewRef, inView: pinInView } = useInView<HTMLDivElement>({
    threshold: 0.1,
  });
  const pinRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  // pinRef과 pinInViewRef 하나로 합치기 위한 콜백
  const setPinRefs = (node: HTMLDivElement | null) => {
    pinRef.current = node;
    pinInViewRef.current = node;
  };

  useGSAP(
    () => {
      if (!pinRef.current) return;

      const mm = gsap.matchMedia();

      // 데스크톱에서만 Pin + Progress 적용
      mm.add("(min-width: 768px)", () => {
        const st = ScrollTrigger.create({
          trigger: pinRef.current!,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.4,
          onUpdate: (self) => {
            const p = self.progress;

            if (progressFillRef.current) {
              progressFillRef.current.style.width = `${p * 100}%`;
            }

            // 0 ~ 0.34 → 0, 0.34 ~ 0.67 → 1, 0.67 ~ 1 → 2
            const next = p >= 0.67 ? 2 : p >= 0.34 ? 1 : 0;
            setActiveIdx((prev) => (prev !== next ? next : prev));
          },
        });

        return () => st.kill();
      });

      return () => mm.revert();
    },
    { scope: pinRef },
  );

  const totalLabel = String(empathyContent.cards.length).padStart(2, "0");

  return (
    <section
      id="empathy-section"
      className="relative w-full bg-white"
    >
      {/* ===== 데스크톱: Pin + Progress (헤더 포함) ===== */}
      <div
        ref={setPinRefs}
        className="relative hidden md:block"
        style={{ height: "300vh" }}
      >
        <div
          className="sticky top-0 overflow-hidden"
          style={{ height: "100dvh" }}
        >
          <div
            className="mx-auto h-full"
            style={{
              maxWidth: "var(--container-max)",
              paddingInline: "var(--container-px)",
              paddingBlock: "clamp(2rem, 4vh, 3.5rem)",
            }}
          >
            <div className="grid grid-cols-12 gap-10 lg:gap-16 h-full items-center">
              {/* === 좌측: 헤더 + 진행 바 + 아이템 === */}
              <div className="col-span-7 flex flex-col">
                {/* Eyebrow + Title */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={
                    pinInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
                  }
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Eyebrow variant="terracotta">
                    {empathyContent.eyebrow}
                  </Eyebrow>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                  animate={
                    pinInView
                      ? { opacity: 1, y: 0, filter: "blur(0px)" }
                      : { opacity: 0, y: 24, filter: "blur(6px)" }
                  }
                  transition={{
                    duration: 0.9,
                    delay: 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="mt-4 font-medium leading-tight break-keep-all text-[var(--ink)] max-w-2xl"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.75rem, 3.8vw, 3rem)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {empathyContent.title}
                </motion.h2>

                {/* 카드 패널 — 진행바(상단 가로) + 아이템 */}
                <div
                  className="mt-10 lg:mt-14 rounded-[var(--radius-xl)] overflow-hidden"
                  style={{ background: "var(--paper)" }}
                >
                  {/* 상단 가로 진행 바 */}
                  <div
                    className="relative w-full"
                    style={{
                      height: "2px",
                      background: "var(--border)",
                    }}
                    aria-hidden="true"
                  >
                    <div
                      ref={progressFillRef}
                      className="absolute top-0 left-0 h-full"
                      style={{
                        width: "0%",
                        background: "var(--terracotta)",
                        transition: "width 0.08s linear",
                      }}
                    />
                  </div>

                  {/* 스택된 아이템 컨테이너 */}
                  <div
                    className="relative"
                    style={{
                      minHeight: "clamp(220px, 30vh, 300px)",
                    }}
                  >
                    {empathyContent.cards.map((card, idx) => {
                      const position =
                        idx === activeIdx
                          ? "active"
                          : idx < activeIdx
                            ? "prev"
                            : "next";

                      return (
                        <motion.article
                          key={card.title}
                          initial={false}
                          animate={{
                            opacity: position === "active" ? 1 : 0,
                            y:
                              position === "active"
                                ? 0
                                : position === "prev"
                                  ? -28
                                  : 28,
                            filter:
                              position === "active"
                                ? "blur(0px)"
                                : "blur(4px)",
                          }}
                          transition={{
                            duration: 0.7,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="absolute inset-0 flex flex-col"
                          style={{
                            padding:
                              "clamp(1.75rem, 2.6vw, 2.5rem) clamp(1.75rem, 2.6vw, 2.5rem)",
                            pointerEvents:
                              position === "active" ? "auto" : "none",
                          }}
                          aria-hidden={position !== "active"}
                        >
                          <span
                            className="font-mono tabular-nums tracking-wider mb-4 text-[var(--terracotta-dark)]"
                            style={{
                              fontFeatureSettings: '"tnum"',
                              fontSize: "12px",
                              letterSpacing: "0.12em",
                            }}
                          >
                            {String(idx + 1).padStart(2, "0")} &nbsp;/&nbsp;{" "}
                            {totalLabel}
                          </span>
                          <h3
                            className="font-medium text-[var(--ink)] leading-tight break-keep-all mb-4"
                            style={{
                              fontFamily: "var(--font-serif)",
                              fontSize: "clamp(1.45rem, 2.4vw, 2.125rem)",
                              letterSpacing: "-0.015em",
                            }}
                          >
                            {card.title}
                          </h3>
                          <p
                            className="leading-relaxed text-[var(--graphite)] break-keep-all max-w-xl"
                            style={{
                              fontSize: "clamp(0.95rem, 1vw, 1.0625rem)",
                              lineHeight: 1.7,
                            }}
                          >
                            {card.body}
                          </p>
                        </motion.article>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* === 우측: 풀 하이트 썸네일 === */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={
                  pinInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.96 }
                }
                transition={{
                  duration: 1,
                  delay: 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="col-span-5 relative aspect-[3/4] rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--shadow-xl)]"
                style={{ background: "var(--mist)" }}
              >
                {cardImages.map((img, idx) => (
                  <motion.img
                    key={img.src}
                    src={img.src}
                    alt={img.alt}
                    loading={idx === 0 ? "eager" : "lazy"}
                    decoding="async"
                    initial={false}
                    animate={{
                      opacity: idx === activeIdx ? 1 : 0,
                      scale: idx === activeIdx ? 1 : 1.05,
                    }}
                    transition={{
                      duration: 0.9,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ))}

                {/* 스텝 인디케이터 */}
                <div className="absolute bottom-5 left-5 flex gap-1.5">
                  {empathyContent.cards.map((_, idx) => (
                    <span
                      key={idx}
                      className="h-[3px] rounded-full"
                      style={{
                        width: idx === activeIdx ? "32px" : "16px",
                        background:
                          idx === activeIdx
                            ? "rgba(255,255,255,0.95)"
                            : "rgba(255,255,255,0.4)",
                        transition:
                          "width 0.5s cubic-bezier(0.16, 1, 0.3, 1), background 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== 모바일: 평범하게 쌓이는 리스트 ===== */}
      <div
        className="md:hidden mx-auto"
        style={{
          maxWidth: "var(--container-max)",
          paddingInline: "var(--container-px)",
          paddingBlockStart: "clamp(2.5rem, 6vw, 4rem)",
          paddingBlockEnd: "clamp(2rem, 5vw, 3.5rem)",
        }}
      >
        {/* 모바일 헤더 */}
        <MobileHeader />

        {/* 카드 리스트 */}
        <div className="space-y-10 mt-10">
          {empathyContent.cards.map((card, idx) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div
                className="relative aspect-[3/4] rounded-[var(--radius-xl)] overflow-hidden mb-5 shadow-[var(--shadow-lg)]"
                style={{ background: "var(--mist)" }}
              >
                <img
                  src={cardImages[idx].src}
                  alt={cardImages[idx].alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4">
                  <span
                    className="inline-block px-2.5 py-1 rounded-full font-mono tabular-nums tracking-wider text-[11px] bg-white/90 text-[var(--terracotta-dark)] backdrop-blur-sm"
                    style={{ fontFeatureSettings: '"tnum"' }}
                  >
                    {String(idx + 1).padStart(2, "0")} / {totalLabel}
                  </span>
                </div>
              </div>
              <h3
                className="font-medium text-[var(--ink)] leading-tight break-keep-all mb-3 text-2xl"
                style={{
                  fontFamily: "var(--font-serif)",
                  letterSpacing: "-0.015em",
                }}
              >
                {card.title}
              </h3>
              <p className="text-base leading-relaxed text-[var(--graphite)] break-keep-all">
                {card.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/** 모바일용 Eyebrow + Title 헤더 */
function MobileHeader() {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <Eyebrow variant="terracotta">{empathyContent.eyebrow}</Eyebrow>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
        animate={
          inView
            ? { opacity: 1, y: 0, filter: "blur(0px)" }
            : { opacity: 0, y: 24, filter: "blur(6px)" }
        }
        transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="mt-4 font-medium leading-tight break-keep-all text-[var(--ink)]"
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(1.75rem, 7vw, 2.5rem)",
          letterSpacing: "-0.02em",
        }}
      >
        {empathyContent.title}
      </motion.h2>
    </div>
  );
}
