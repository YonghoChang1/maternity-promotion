"use client";

import { Icon } from "@iconify/react";
import { motion } from "motion/react";
import { offerContent } from "@/data/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useInView } from "@/hooks/useInView";

const scrollToForm = () => {
  const el = document.getElementById("form-section");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

// Photo + accent mapping for each promise
const promiseDecor = [
  {
    // 비용 — 거대한 숫자 타이포
    kind: "numeric" as const,
    number: "10만",
    suffix: "원 할인",
    accent: "var(--terracotta)",
    accentSoft: "var(--terracotta-light)",
  },
  {
    // 체력 — 드레스 사진 배경
    kind: "photo" as const,
    photo: "/assets/photos/dresses/YOO_2262_1jpg0011.jpg",
    alt: "스튜디오 드레스 피팅",
    accent: "var(--sage)",
    accentSoft: "var(--sage-light)",
  },
  {
    // 시간 — 플래너 실사
    kind: "photo" as const,
    photo: "/assets/photos/consulting/image_fx (16).jpg",
    alt: "플래너가 일정을 설명하는 장면",
    accent: "var(--ink)",
    accentSoft: "var(--mist)",
  },
];

// Benefits with small photo thumbnails
const benefitDecor = [
  "/assets/photos/consulting/u6738593276_a_korean_woman_wedding_planner_pointing_at_a_tabl_e21e18ed-9536-4fac-b28a-205d77f41167_1.png",
  "/assets/photos/convention/u6738593276_wide_interior_shot_of_a_bright_Korean_wedding_con_dc0db044-ea55-4f21-b371-3ba6f64fe528_3.png",
  "/assets/photos/couples/006.jpg",
  "/assets/photos/hero/Gemini_Generated_Image_56k7c856k7c856k7.png",
];

export function OfferSection() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section
      id="offer-section"
      className="relative w-full bg-[var(--paper)]"
      style={{ paddingBlock: "var(--section-py)" }}
    >
      <div
        ref={ref}
        className="mx-auto"
        style={{
          maxWidth: "var(--container-max)",
          paddingInline: "var(--container-px)",
        }}
      >
        {/* ======== Header — asymmetric ======== */}
        <div className="grid grid-cols-12 gap-6 md:gap-8 items-end">
          <div className="col-span-12 md:col-span-8">
            <Eyebrow variant="sage">{offerContent.eyebrow}</Eyebrow>
            <h2
              className="mt-6 md:mt-8 font-medium leading-[1.1] break-keep-all text-[var(--ink)] max-w-4xl"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2rem, 5vw, 4rem)",
                letterSpacing: "-0.025em",
              }}
            >
              {offerContent.title}
            </h2>
          </div>
          <div className="hidden md:flex col-span-4 justify-end pb-2">
            <div className="text-right text-[13px] text-[var(--graphite-light)] max-w-[200px]">
              <span className="inline-flex items-center gap-2 mb-1">
                <Icon
                  icon="solar:verified-check-bold"
                  width={16}
                  height={16}
                  className="text-[var(--sage-dark)]"
                />
                모든 혜택 중복 적용
              </span>
              <p className="break-keep-all">
                임신확인서 또는 산모수첩으로 확인해 드려요
              </p>
            </div>
          </div>
        </div>

        {/* ======== Bento: 3 promises ======== */}
        <div className="mt-16 md:mt-24 grid grid-cols-12 gap-4 md:gap-5">
          {offerContent.promises.map((p, idx) => {
            const decor = promiseDecor[idx];

            // First card (비용) — LARGE with numeric focus
            if (idx === 0) {
              return (
                <motion.article
                  key={p.label}
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  transition={{
                    duration: 0.9,
                    delay: idx * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="col-span-12 md:col-span-7 md:row-span-2 p-1.5 rounded-[var(--radius-2xl)] bg-[var(--ink)]/5 ring-1 ring-[var(--ink)]/6"
                >
                  <div
                    className="relative h-full rounded-[calc(var(--radius-2xl)-0.375rem)] p-8 md:p-12 overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${decor.accentSoft} 0%, var(--bone) 60%, var(--paper) 100%)`,
                      boxShadow: "var(--shadow-inner-highlight)",
                    }}
                  >
                    {/* Decorative orb */}
                    <div
                      aria-hidden
                      className="absolute -top-20 -right-20 w-[280px] h-[280px] rounded-full blur-3xl opacity-60"
                      style={{
                        background: `radial-gradient(circle, ${decor.accent}55 0%, transparent 70%)`,
                        animation: "float 8s ease-in-out infinite",
                      }}
                    />

                    <div className="relative z-10 flex flex-col h-full min-h-[320px]">
                      <div className="flex items-center gap-3 mb-6">
                        <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/80 text-[var(--terracotta-dark)] ring-1 ring-[var(--border)]">
                          <Icon icon={p.icon} width={20} height={20} />
                        </span>
                        <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--terracotta-dark)] font-semibold">
                          {p.label}
                        </span>
                      </div>

                      {/* BIG numeric treatment */}
                      <div className="mb-6 md:mb-8">
                        <div
                          className="font-medium leading-none break-keep-all text-[var(--ink)]"
                          style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(4rem, 10vw, 7.5rem)",
                            letterSpacing: "-0.04em",
                          }}
                        >
                          {decor.number}
                          <span
                            className="inline-block ml-3 md:ml-4 text-[0.3em] align-top text-[var(--graphite)] font-normal tracking-normal"
                            style={{ fontFamily: "var(--font-sans)" }}
                          >
                            {decor.suffix}
                          </span>
                        </div>
                      </div>

                      <h3
                        className="text-xl md:text-2xl font-medium text-[var(--ink)] leading-snug break-keep-all"
                        style={{ fontFamily: "var(--font-serif)" }}
                      >
                        {p.title}
                      </h3>
                      <p className="mt-4 text-[15px] leading-relaxed text-[var(--graphite)] break-keep-all max-w-md">
                        {p.body}
                      </p>
                    </div>
                  </div>
                </motion.article>
              );
            }

            // Cards 2, 3 — photo background
            return (
              <motion.article
                key={p.label}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{
                  duration: 0.9,
                  delay: idx * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="col-span-12 md:col-span-5 p-1.5 rounded-[var(--radius-2xl)] bg-[var(--ink)]/5 ring-1 ring-[var(--ink)]/6"
              >
                <div className="relative rounded-[calc(var(--radius-2xl)-0.375rem)] overflow-hidden group">
                  {/* Photo */}
                  <div className="aspect-[5/4] md:aspect-auto md:h-[240px] lg:h-[280px] relative overflow-hidden bg-[var(--mist)]">
                    <img
                      src={decor.kind === "photo" ? decor.photo : ""}
                      alt={decor.kind === "photo" ? decor.alt : ""}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.04]"
                      style={{ transitionTimingFunction: "var(--ease-smooth)" }}
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, transparent 40%, rgba(10,10,10,0.55) 100%)",
                      }}
                    />
                    <span className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/85 backdrop-blur-sm px-3 py-1.5 text-[10.5px] uppercase tracking-[0.18em] text-[var(--ink)] font-semibold">
                      <span
                        className="inline-block w-1 h-1 rounded-full"
                        style={{ background: decor.accent }}
                      />
                      {p.label}
                    </span>
                  </div>

                  {/* Content below photo */}
                  <div
                    className="p-6 md:p-7 bg-white"
                    style={{ boxShadow: "var(--shadow-inner-highlight)" }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full"
                        style={{
                          background: `${decor.accentSoft}`,
                          color: decor.accent,
                        }}
                      >
                        <Icon icon={p.icon} width={18} height={18} />
                      </span>
                      <h3
                        className="text-lg md:text-xl font-medium text-[var(--ink)] leading-snug break-keep-all"
                        style={{ fontFamily: "var(--font-serif)" }}
                      >
                        {p.title}
                      </h3>
                    </div>
                    <p className="text-[14.5px] leading-relaxed text-[var(--graphite)] break-keep-all">
                      {p.body}
                    </p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* ======== Benefits — zig-zag list ======== */}
        <div className="mt-24 md:mt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-baseline justify-between gap-6 mb-12 md:mb-16"
          >
            <h3
              className="text-xl md:text-2xl font-medium text-[var(--ink)] break-keep-all"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {offerContent.benefitsTitle}
            </h3>
            <span
              className="text-[11px] uppercase tracking-[0.2em] text-[var(--graphite-light)] font-mono tabular-nums hidden md:inline"
              style={{ fontFeatureSettings: '"tnum"' }}
            >
              +04 MORE
            </span>
          </motion.div>

          <div className="divide-y divide-[var(--border)]">
            {offerContent.benefits.map((b, idx) => {
              const isOdd = idx % 2 === 1;
              return (
                <motion.article
                  key={b.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.4 + idx * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`py-8 md:py-10 grid grid-cols-12 gap-5 md:gap-8 items-center ${
                    isOdd ? "md:pl-[10%]" : ""
                  }`}
                >
                  {/* 번호 */}
                  <div className="col-span-2 md:col-span-1">
                    <span
                      className="font-mono text-[12px] tabular-nums text-[var(--graphite-light)] tracking-wider"
                      style={{ fontFeatureSettings: '"tnum"' }}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* 썸네일 */}
                  <div className="col-span-10 md:col-span-3">
                    <div className="relative aspect-square md:aspect-[4/5] rounded-[var(--radius-md)] overflow-hidden bg-[var(--mist)]">
                      <img
                        src={benefitDecor[idx]}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* 텍스트 */}
                  <div className="col-span-12 md:col-span-8">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[var(--sage)]/12 text-[var(--sage-dark)]">
                        <Icon icon={b.icon} width={18} height={18} />
                      </span>
                      <h4
                        className="text-lg md:text-xl font-medium text-[var(--ink)] leading-snug break-keep-all"
                        style={{ fontFamily: "var(--font-serif)" }}
                      >
                        {b.title}
                      </h4>
                    </div>
                    <p className="text-[15px] leading-relaxed text-[var(--graphite)] break-keep-all max-w-xl">
                      {b.body}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* ======== Notice + CTA ======== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 md:mt-28 grid grid-cols-12 gap-6 md:gap-8 items-center"
        >
          <div className="col-span-12 md:col-span-7">
            <div className="flex items-start gap-4">
              <Icon
                icon="solar:info-circle-linear"
                width={22}
                height={22}
                className="text-[var(--sage-dark)] shrink-0 mt-0.5"
              />
              <p className="text-sm md:text-[15px] leading-relaxed text-[var(--graphite)] break-keep-all">
                {offerContent.notice}
              </p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-5 flex flex-col md:items-end gap-2">
            <MagneticButton onClick={scrollToForm} variant="primary">
              {offerContent.ctaText}
            </MagneticButton>
            <span className="text-[13px] text-[var(--graphite-light)] md:pr-2">
              {offerContent.ctaSub}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
