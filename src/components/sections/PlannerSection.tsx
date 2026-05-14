"use client";

import { plannerContent } from "@/data/content";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function PlannerSection() {
  const c = plannerContent;
  return (
    <section className="planner" id="planner-section">
      <div className="container planner-grid">
        <div className="planner-photo reveal">
          <img src={c.img} alt={c.name} loading="lazy" />
          <span className="planner-photo-tag">담당 플래너</span>
        </div>
        <div className="planner-body reveal reveal-delay-1">
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <div className="planner-name">
            <h3>{c.name}</h3>
            <span className="planner-role">{c.role}</span>
          </div>
          <blockquote className="planner-quote">
            <p>{c.quote}</p>
          </blockquote>
          <div className="planner-facts">
            {c.facts.map((f) => (
              <div key={f.lbl} className="planner-fact">
                <span className="val">{f.val}</span>
                <span className="lbl">{f.lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
