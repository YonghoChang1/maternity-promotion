"use client";

import { galleryContent } from "@/data/content";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function GallerySection() {
  const c = galleryContent;
  return (
    <section className="gallery" id="gallery-section">
      <span className="glow-1" />
      <span className="glow-2" />
      <div className="container">
        <div className="gallery-head">
          <div className="reveal">
            <Eyebrow light>{c.eyebrow}</Eyebrow>
            <h2 className="gallery-title">
              {c.title[0]}
              <br />
              {c.title[1]}
            </h2>
          </div>
          <p className="gallery-meta reveal reveal-delay-1">{c.meta}</p>
        </div>

        <div className="gallery-grid">
          {c.items.map((it, i) => (
            <figure
              key={it.src}
              className={`${it.cls} reveal`}
              data-num={`#${String(i + 1).padStart(2, "0")}`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <img src={it.src} alt={it.alt} loading="lazy" />
              {it.caption && <figcaption>{it.caption}</figcaption>}
            </figure>
          ))}
        </div>

        <div className="gallery-foot">
          <span>{c.credit}</span>
          <span className="credit-tag">{c.captured}</span>
        </div>
      </div>
    </section>
  );
}
