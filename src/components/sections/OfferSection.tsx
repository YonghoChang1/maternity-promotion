"use client";

import { offerContent } from "@/data/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CTA, scrollToId } from "@/components/ui/CTA";

function BenefitIcon({ idx }: { idx: number }) {
  const size = 28;
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  const icons = [
    // 0: planner — speech bubble + dot
    <svg key="i0" {...common}>
      <path d="M4 6c0-1.1.9-2 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-4 3v-3H6a2 2 0 0 1-2-2V6Z" />
      <circle cx="9" cy="10" r="0.6" fill="currentColor" />
      <circle cx="12" cy="10" r="0.6" fill="currentColor" />
      <circle cx="15" cy="10" r="0.6" fill="currentColor" />
    </svg>,
    // 1: schedule — circular arrow
    <svg key="i1" {...common}>
      <path d="M20 12a8 8 0 1 1-2.5-5.8" />
      <path d="M20 4v3.5h-3.5" />
    </svg>,
    // 2: continuity — overlapping circles
    <svg key="i2" {...common}>
      <circle cx="9" cy="12" r="5.5" />
      <circle cx="15" cy="12" r="5.5" />
    </svg>,
    // 3: gift box
    <svg key="i3" {...common}>
      <rect x="4" y="9" width="16" height="11" rx="1" />
      <path d="M3 9h18" />
      <path d="M12 9v11" />
      <path d="M8 9c-1.5 0-2.5-1-2.5-2.5S6.5 4 8 4c2 0 4 5 4 5s2-5 4-5c1.5 0 2.5 1 2.5 2.5S17.5 9 16 9" />
    </svg>,
  ];
  return <div className="benefit-icon">{icons[idx] ?? icons[0]}</div>;
}

export function OfferSection() {
  const c = offerContent;
  return (
    <section className="offer" id="offer-section">
      <div className="container">
        <div className="offer-head">
          <div className="reveal">
            <Eyebrow>{c.eyebrow}</Eyebrow>
            <h2 className="offer-title">
              {c.title[0]}
              <br />
              <em>{c.title[1]}</em>
            </h2>
          </div>
          <div className="offer-meta reveal reveal-delay-1">
            <span className="badge">{c.badge}</span>
            <span>{c.badgeSub}</span>
          </div>
        </div>

        <div className="offer-promises">
          {c.promises.map((p, i) => (
            <article
              key={p.label}
              className={`promise promise-${i + 1} reveal`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="promise-inner">
                {p.kind === "numeric" ? (
                  <>
                    <span className="promise-orb" />
                    <div className="promise-label">
                      <span className="ico">{p.icon}</span>
                      <span className="lbl">{p.label}</span>
                    </div>
                    <div className="big-num">
                      <span className="strike">{p.strike}</span>
                      {p.big}
                      <span className="suffix">{p.suffix}</span>
                    </div>
                    <div className="promise-text">
                      <h3>{p.title}</h3>
                      <p>{p.body}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="promise-photo">
                      <img src={p.img} alt={p.title} loading="lazy" />
                      <span className="label-pill">
                        <span className="swatch" />
                        {p.label}
                      </span>
                    </div>
                    <div className="promise-content">
                      <div className="promise-label">
                        <span
                          className="ico"
                          style={{ width: 36, height: 36, fontSize: 16 }}
                        >
                          {p.icon}
                        </span>
                      </div>
                      <h3>{p.title}</h3>
                      <p>{p.body}</p>
                    </div>
                  </>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="benefits" data-layout="grid">
          <div className="benefits-head reveal">
            <h3>{c.benefitsTitle}</h3>
            <span className="more">+04 MORE</span>
          </div>
          <div className="benefits-list">
            {c.benefits.map((b, i) => (
              <article
                key={b.title}
                className="benefit reveal"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <BenefitIcon idx={i} />
                <div className="txt">
                  <div className="txt-head">
                    <h4>{b.title}</h4>
                  </div>
                  <p>{b.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="offer-foot reveal">
          <p className="offer-foot-info">{c.notice}</p>
          <div className="offer-foot-cta">
            <CTA onClick={() => scrollToId("form-section")}>{c.cta}</CTA>
            <span className="sub">{c.ctaSub}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
