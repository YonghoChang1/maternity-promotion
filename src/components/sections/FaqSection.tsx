"use client";

import { Icon } from "@iconify/react";
import { motion } from "motion/react";
import { faqContent } from "@/data/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { useInView } from "@/hooks/useInView";

export function FaqSection() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section
      id="faq-section"
      className="relative w-full bg-[var(--bone)]"
      style={{ paddingBlock: "var(--section-py)" }}
    >
      <div
        ref={ref}
        className="mx-auto grid grid-cols-12 gap-6 md:gap-12 lg:gap-20"
        style={{
          maxWidth: "var(--container-max)",
          paddingInline: "var(--container-px)",
        }}
      >
        {/* ======== Left: sticky title ======== */}
        <div className="col-span-12 md:col-span-4 lg:col-span-4">
          <div className="md:sticky md:top-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Eyebrow variant="sage">{faqContent.eyebrow}</Eyebrow>
              <h2
                className="mt-6 md:mt-8 font-medium leading-[1.1] break-keep-all text-[var(--ink)]"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1.85rem, 4.2vw, 3rem)",
                  letterSpacing: "-0.02em",
                }}
              >
                {faqContent.title}
              </h2>

              <p className="mt-6 md:mt-8 text-[14.5px] leading-relaxed text-[var(--graphite)] break-keep-all max-w-sm">
                {faqContent.documentNote}
              </p>

              <div className="mt-8 flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[var(--sage)]/12 text-[var(--sage-dark)]">
                  <Icon
                    icon="solar:document-text-linear"
                    width={18}
                    height={18}
                  />
                </span>
                <div className="text-[13px] text-[var(--graphite-light)]">
                  <span className="block">산모수첩</span>
                  <span className="block">또는 임신확인서</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ======== Right: minimal list accordion ======== */}
        <div className="col-span-12 md:col-span-8 lg:col-span-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <FaqAccordion items={[...faqContent.items]} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
