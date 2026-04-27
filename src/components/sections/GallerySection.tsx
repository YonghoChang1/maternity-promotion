"use client";

import { motion } from "motion/react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { useInView } from "@/hooks/useInView";

// Asymmetric magazine grid — 실제 커플 스튜디오 컷
const galleryItems = [
  {
    src: "/assets/photos/couples/A002.jpg",
    alt: "스튜디오 웨딩 촬영",
    span: "col-span-6 md:col-span-4 row-span-2 aspect-[3/4]",
  },
  {
    src: "/assets/photos/couples/042.jpg",
    alt: "야외 가든 웨딩",
    span: "col-span-6 md:col-span-3 aspect-square",
  },
  {
    src: "/assets/photos/couples/19.jpg",
    alt: "자연광 실내 촬영",
    span: "col-span-12 md:col-span-5 aspect-[4/3]",
  },
  {
    src: "/assets/photos/couples/29.jpg",
    alt: "아뮤즈 하우스 촬영",
    span: "col-span-6 md:col-span-3 aspect-square",
  },
  {
    src: "/assets/photos/couples/006.jpg",
    alt: "부게인빌라 웨딩 스튜디오",
    span: "col-span-6 md:col-span-4 aspect-[3/4]",
  },
  {
    src: "/assets/photos/couples/fia 008.jpg",
    alt: "피아 스튜디오 촬영",
    span: "col-span-12 md:col-span-5 aspect-[4/3]",
  },
  {
    src: "/assets/photos/couples/014.jpg",
    alt: "실내 스튜디오 단독 컷",
    span: "col-span-6 md:col-span-3 aspect-[3/4]",
  },
  {
    src: "/assets/photos/couples/0005-2025_서울로라_샘플vol.2-14786-1.jpg",
    alt: "서울 로라 스튜디오 가든",
    span: "col-span-6 md:col-span-4 aspect-[4/3]",
  },
];

export function GallerySection() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.05 });

  return (
    <section
      id="gallery-section"
      className="relative w-full bg-[var(--ink)] text-white overflow-hidden"
      style={{ paddingBlock: "var(--section-py)" }}
    >
      {/* Decorative ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/4 w-[600px] h-[600px] rounded-full blur-3xl opacity-[0.12]"
        style={{
          background:
            "radial-gradient(circle, var(--sage) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl opacity-[0.10]"
        style={{
          background:
            "radial-gradient(circle, var(--terracotta) 0%, transparent 70%)",
        }}
      />

      <div
        ref={ref}
        className="relative mx-auto"
        style={{
          maxWidth: "var(--container-max)",
          paddingInline: "var(--container-px)",
        }}
      >
        {/* Header — editorial magazine style */}
        <div className="grid grid-cols-12 gap-6 mb-16 md:mb-20 items-end">
          <div className="col-span-12 md:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Eyebrow variant="light">REAL WEDDINGS</Eyebrow>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
              animate={
                inView
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : { opacity: 0, y: 30, filter: "blur(6px)" }
              }
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 md:mt-8 font-medium leading-[1.1] break-keep-all"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2rem, 5.2vw, 4.25rem)",
                letterSpacing: "-0.025em",
              }}
            >
              임산부여도<br />
              이렇게 예쁜 웨딩을.
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-12 md:col-span-5 md:pl-8"
          >
            <p className="text-[15px] md:text-base leading-relaxed text-white/70 break-keep-all max-w-md">
              다이렉트와 함께한 실제 부부들의 웨딩 컷.
              주수에 맞춘 스케줄, 체력에 맞춘 동선, 보정된 피팅으로
              만삭에도, 출산 후에도 이런 기록이 가능해요.
            </p>
          </motion.div>
        </div>

        {/* ======== Magazine Grid ======== */}
        <div className="grid grid-cols-12 auto-rows-[120px] md:auto-rows-[160px] gap-3 md:gap-4">
          {galleryItems.map((item, idx) => (
            <motion.figure
              key={item.src}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={
                inView
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0, y: 40, scale: 0.96 }
              }
              transition={{
                duration: 0.9,
                delay: 0.15 + (idx % 4) * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`${item.span} relative overflow-hidden rounded-[var(--radius-md)] md:rounded-[var(--radius-lg)] bg-white/5 group`}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s]"
                style={{ transitionTimingFunction: "var(--ease-smooth)" }}
              />
              <div
                aria-hidden
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 60%, rgba(10,10,10,0.5) 100%)",
                  transitionTimingFunction: "var(--ease-smooth)",
                }}
              />
              <span
                className="absolute bottom-3 left-3 md:bottom-4 md:left-4 text-[10.5px] uppercase tracking-[0.2em] text-white/0 group-hover:text-white/90 transition-all duration-700"
                style={{ transitionTimingFunction: "var(--ease-smooth)" }}
              >
                #{String(idx + 1).padStart(2, "0")}
              </span>
            </motion.figure>
          ))}
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.9, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 md:mt-20 flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-white/10"
        >
          <p className="text-[13px] text-white/50 break-keep-all">
            촬영 · 제휴 스튜디오 컷 · Photo credits: BeMy, BougainVillea, Fia,
            Emily L&apos;Amour, Amuse Haus, Seoul Laura
          </p>
          <span className="text-[11px] uppercase tracking-[0.25em] text-white/40 font-mono tabular-nums">
            CAPTURED 2024 — 2025
          </span>
        </motion.div>
      </div>
    </section>
  );
}
