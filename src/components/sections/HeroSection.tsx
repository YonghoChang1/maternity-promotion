"use client";

import { heroContent } from "@/data/content";
import { CTA, scrollToId } from "@/components/ui/CTA";

export function HeroSection() {
  const c = heroContent;
  return (
    <section className="hero" id="hero" data-layout="split">
      <div className="hero-image">
        <img src="/img/hero-poster.png" alt="임산부 웨딩 촬영" />
      </div>

      <header className="hero-nav">
        <div className="container">
          <a href="#hero" className="logo">
            <span className="mark">D</span>
            <span>다이렉트결혼준비</span>
          </a>
          <div className="nav-right">
            <a
              className="nav-link"
              href="#offer-section"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("offer-section");
              }}
            >
              혜택
            </a>
            <a
              className="nav-link"
              href="#faq-section"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("faq-section");
              }}
            >
              FAQ
            </a>
            <a className="phone" href="tel:1666-8639">
              <span>☎</span>
              1666-8639
            </a>
          </div>
        </div>
      </header>

      <div className="container hero-grid">
        <div className="hero-content">
          <span className="hero-eyebrow reveal">
            <span className="pulse" />
            {c.eyebrow}
          </span>

          <h1 className="hero-headline reveal reveal-delay-1">
            {c.headline[0]}
            <br />
            {c.headline[1]}
            <em>{c.headline[2]}</em>
            {c.headline[3]}
          </h1>

          <p className="hero-sub reveal reveal-delay-2">{c.sub}</p>

          <div className="hero-cta reveal reveal-delay-3">
            <CTA onClick={() => scrollToId("form-section")}>{c.cta}</CTA>
            <span className="hero-cta-meta">
              <span className="meta-dot" />
              {c.ctaSub}
            </span>
          </div>
        </div>
      </div>

      <button
        className="scroll-hint"
        onClick={() => scrollToId("empathy-section")}
        aria-label="다음 섹션"
      >
        <span>scroll</span>
        <span className="arrow-line" />
      </button>
    </section>
  );
}
