"use client";

import { empathyContent } from "@/data/content";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function EmpathySection() {
  const c = empathyContent;
  return (
    <section className="empathy" id="empathy-section" data-layout="stack">
      <div className="container">
        <div className="empathy-head">
          <div className="reveal">
            <Eyebrow>{c.eyebrow}</Eyebrow>
            <h2 className="empathy-title">
              {c.title[0]}
              <br />
              {c.title[1]}
            </h2>
          </div>
          <p className="empathy-meta reveal reveal-delay-1">{c.meta}</p>
        </div>

        <div className="empathy-cards">
          {c.cards.map((card, i) => (
            <article
              key={card.title}
              className="ec reveal"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="ec-body">
                <span className="ec-num">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="ec-title">{card.title}</h3>
                <p>{card.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
