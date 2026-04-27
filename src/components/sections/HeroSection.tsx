"use client";

import { Icon } from "@iconify/react";
import { motion } from "motion/react";
import { heroContent } from "@/data/content";
import { MagneticButton } from "@/components/ui/MagneticButton";

const scrollToForm = () => {
  const el = document.getElementById("form-section");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const scrollToEmpathy = () => {
  const el = document.getElementById("empathy-section");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

/**
 * 영상(0417.mp4) / 포스터(Gemini AI 컷)의 배경색과 매칭한 세이지-민트.
 * 영상 좌측 에지를 mask로 부드럽게 페이드하여 경계선 제거.
 */
const HERO_BG = "#C2D2C0";
const VIDEO_SRC = "/assets/photos/hero/0417.mp4";
const VIDEO_POSTER = "/assets/photos/hero/Gemini_Generated_Image_56k7c856k7c856k7.png";

export function HeroSection() {
  return (
    <section
      id="hero-section"
      className="relative w-full min-h-[100dvh] overflow-hidden"
      style={{ background: HERO_BG }}
    >
      {/* ============ Top Bar ============ */}
      <header className="absolute top-0 left-0 right-0 z-30">
        <div
          className="mx-auto flex items-center justify-between py-6 md:py-8"
          style={{
            maxWidth: "var(--container-max)",
            paddingInline: "var(--container-px)",
          }}
        >
          <a
            href="/"
            className="inline-flex items-center"
            aria-label="다이렉트결혼준비"
          >
            <img
              src="/assets/brand/logo/logo_white%20bg%20version.png"
              alt="다이렉트결혼준비"
              className="h-8 md:h-9 w-auto select-none"
              draggable={false}
            />
          </a>
          <a
            href="tel:1666-8639"
            className="hidden md:inline-flex items-center gap-2 text-sm text-[var(--graphite)] hover:text-[var(--ink)] transition-colors"
            style={{
              transitionDuration: "var(--duration-base)",
              transitionTimingFunction: "var(--ease-smooth)",
            }}
          >
            <Icon icon="solar:phone-calling-linear" width={16} height={16} />
            1666-8639
          </a>
        </div>
      </header>

      {/* ============ RIGHT: Sharp video — 풀 높이, 좌측 에지 mask 페이드 ============ */}
      <div
        className="hidden md:block absolute top-0 bottom-0 right-0 w-[50%] lg:w-[52%] z-0"
        style={{
          background: HERO_BG,
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, black 90px, black 100%)",
          maskImage:
            "linear-gradient(90deg, transparent 0%, black 90px, black 100%)",
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="block w-full h-full object-cover"
          poster={VIDEO_POSTER}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      </div>

      {/* ============ Mobile: Video top full width ============ */}
      <div
        className="md:hidden relative w-full aspect-[4/5] z-0"
        style={{ background: HERO_BG }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="block w-full h-full object-cover"
          poster={VIDEO_POSTER}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      </div>

      {/* ============ LEFT: Content ============ */}
      <div
        className="relative z-10 mx-auto min-h-[100dvh] grid grid-cols-1 md:grid-cols-12 md:items-center pt-10 md:pt-0 pb-24 md:pb-24"
        style={{
          maxWidth: "var(--container-max)",
          paddingInline: "var(--container-px)",
        }}
      >
        <div className="md:col-span-6 lg:col-span-6 md:pt-28 md:pb-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10.5px] md:text-[11px] uppercase tracking-[0.2em] font-medium bg-[var(--ink)]/5 text-[var(--graphite)] ring-1 ring-[var(--ink)]/6"
          >
            <span className="inline-block w-1 h-1 rounded-full bg-[var(--sage-dark)]" />
            {heroContent.eyebrow}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 md:mt-6 font-medium leading-[1.15] break-keep-all text-[var(--ink)]"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.75rem, 4.3vw, 3.85rem)",
              letterSpacing: "-0.02em",
              whiteSpace: "pre-line",
            }}
          >
            {heroContent.headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 md:mt-8 text-[15px] md:text-base leading-relaxed text-[var(--graphite)] break-keep-all max-w-lg"
            style={{ whiteSpace: "pre-line" }}
          >
            {heroContent.subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 md:mt-10 flex flex-col items-start gap-3"
          >
            <MagneticButton onClick={scrollToForm} variant="primary">
              {heroContent.ctaPrimary}
            </MagneticButton>
            <span className="inline-flex items-center gap-2 pl-2 text-[13px] text-[var(--graphite-light)]">
              <Icon
                icon="solar:clock-circle-linear"
                width={14}
                height={14}
                className="text-[var(--sage-dark)]"
              />
              {heroContent.ctaSecondary}
            </span>
          </motion.div>
        </div>

        <div className="hidden md:block md:col-span-6 lg:col-span-6" />
      </div>

      {/* ============ Scroll hint ============ */}
      <button
        onClick={scrollToEmpathy}
        aria-label="다음 섹션으로 이동"
        className="absolute bottom-6 left-6 md:left-1/2 md:-translate-x-1/2 z-20 flex flex-col items-center gap-2 text-[var(--graphite-light)] hover:text-[var(--ink)] transition-colors"
        style={{
          transitionDuration: "var(--duration-base)",
          transitionTimingFunction: "var(--ease-smooth)",
        }}
      >
        <span className="text-[10px] uppercase tracking-[0.25em]">Scroll</span>
        <Icon
          icon="solar:alt-arrow-down-linear"
          width={16}
          height={16}
          style={{ animation: "scrollHint 2s ease-in-out infinite" }}
        />
      </button>
    </section>
  );
}
