import { footerContent } from "@/data/content";

export function Footer() {
  const c = footerContent;
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <span className="word">DIRECT</span>
              <span className="sub">Wedding</span>
            </div>
            <p className="footer-tagline">{c.tagline}</p>
          </div>
          <div className="footer-col">
            <p className="label">CONTACT</p>
            <a href={`tel:${c.contactCenter}`}>☎ {c.contactCenter}</a>
          </div>
          <div className="footer-col">
            <p className="label">LEGAL</p>
            <a className="legal-link" href={c.privacyLink} target="_blank" rel="noreferrer">
              개인정보처리방침 ↗
            </a>
          </div>
        </div>
        <div className="footer-foot">
          <span>
            © {new Date().getFullYear()} {c.company}. All rights reserved.
          </span>
          <span className="est">EST. 2006 — SEOUL</span>
        </div>
      </div>
    </footer>
  );
}
