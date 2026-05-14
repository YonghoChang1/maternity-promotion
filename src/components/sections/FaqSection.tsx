"use client";

import { useState } from "react";
import { faqContent } from "@/data/content";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function FaqSection() {
  const c = faqContent;
  const [openIdx, setOpenIdx] = useState(0);
  return (
    <section className="faq" id="faq-section">
      <div className="container">
        <aside className="faq-side">
          <div className="sticky-box reveal">
            <Eyebrow>{c.eyebrow}</Eyebrow>
            <h2 className="faq-title">{c.title}</h2>
            <p className="faq-note">{c.note}</p>
            <div className="faq-doc">
              <span className="ico">📄</span>
              <span className="text">
                <strong>산모수첩</strong>
                또는 임신확인서
              </span>
            </div>
          </div>
        </aside>
        <div className="faq-list reveal reveal-delay-1">
          {c.items.map((it, i) => (
            <div
              key={it.q}
              className={"faq-item" + (openIdx === i ? " open" : "")}
            >
              <button
                className="faq-q"
                onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
                aria-expanded={openIdx === i}
              >
                <span>{it.q}</span>
                <span className="toggle">+</span>
              </button>
              <div className="faq-a">
                <p>{it.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
