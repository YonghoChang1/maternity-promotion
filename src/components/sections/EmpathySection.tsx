"use client";

import { Fragment } from "react";
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
              <div className="ec-img">
                <img src={card.img} alt={card.title} loading="lazy" />
              </div>
              <div className="ec-body">
                <span className="ec-num">{String(i + 1).padStart(2, "0")} / 03</span>
                <h3 className="ec-title">{card.title}</h3>
                <p>{card.body}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="empathy-closing reveal">
          <p className="empathy-closing-text">
            {c.closing}{" "}
            {c.closingHighlights.map((h, i) => (
              <Fragment key={h}>
                <strong>{h}</strong>
                {i < c.closingHighlights.length - 1 ? ", " : "."}
              </Fragment>
            ))}
          </p>
          <span className="empathy-closing-pill">3 PROMISES</span>
        </div>
      </div>
    </section>
  );
}
