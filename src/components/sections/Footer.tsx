import { Icon } from "@iconify/react";
import { footerContent } from "@/data/content";

export function Footer() {
  return (
    <footer className="relative w-full bg-[var(--ink)] text-white/75 border-t border-white/10">
      <div
        className="mx-auto py-16 md:py-20"
        style={{
          maxWidth: "var(--container-max)",
          paddingInline: "var(--container-px)",
        }}
      >
        <div className="grid grid-cols-12 gap-8 items-start">
          {/* Wordmark + tagline */}
          <div className="col-span-12 md:col-span-6">
            <div className="flex items-baseline gap-2.5">
              <span
                className="text-2xl md:text-[1.75rem] font-bold tracking-tight text-white"
                style={{ letterSpacing: "-0.02em" }}
              >
                DIRECT
              </span>
              <span
                className="text-xl md:text-2xl italic text-white/50"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Wedding
              </span>
            </div>
            <p className="mt-4 text-[14px] md:text-[15px] leading-relaxed text-white/55 break-keep-all max-w-md">
              {footerContent.tagline}
            </p>
          </div>

          {/* Contact */}
          <div className="col-span-6 md:col-span-3">
            <p className="text-[10.5px] uppercase tracking-[0.2em] text-white/40 font-medium mb-3">
              CONTACT
            </p>
            <a
              href={`tel:${footerContent.contactCenter}`}
              className="inline-flex items-center gap-2 text-lg md:text-xl font-medium text-white hover:text-[var(--sage-light)] transition-colors"
              style={{
                fontFamily: "var(--font-serif)",
                transitionDuration: "var(--duration-base)",
                transitionTimingFunction: "var(--ease-smooth)",
              }}
            >
              <Icon
                icon="solar:phone-calling-linear"
                width={18}
                height={18}
                className="text-[var(--sage)]"
              />
              {footerContent.contactCenter}
            </a>
          </div>

          {/* Legal */}
          <div className="col-span-6 md:col-span-3">
            <p className="text-[10.5px] uppercase tracking-[0.2em] text-white/40 font-medium mb-3">
              LEGAL
            </p>
            <a
              href={footerContent.privacyLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-[14.5px] text-white/75 hover:text-white transition-colors"
              style={{
                transitionDuration: "var(--duration-base)",
                transitionTimingFunction: "var(--ease-smooth)",
              }}
            >
              {footerContent.privacyLinkText}
              <Icon
                icon="solar:arrow-right-up-linear"
                width={14}
                height={14}
              />
            </a>
          </div>
        </div>

        <div className="mt-14 md:mt-16 pt-6 border-t border-white/8 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[12px] text-white/35 break-keep-all">
            © {new Date().getFullYear()} {footerContent.company}. All rights
            reserved.
          </p>
          <p className="text-[11px] uppercase tracking-[0.22em] text-white/30 font-mono tabular-nums">
            EST. 2006 — SEOUL
          </p>
        </div>
      </div>
    </footer>
  );
}
