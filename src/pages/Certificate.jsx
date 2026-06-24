import s from "../styles/Sections.module.css";
import { certificates } from "../data/portfolioData";

export default function Certificate() {
  return (
    <section id="certificate" className={s.sertifikat}>
      <div className="reveal">
        <p className="section-label">Achievement</p>
        <h2 className="section-title">Certificate &amp; Award</h2>
        <p className={s.certSubtitle}>Verified credentials and professional certifications earned.</p>
      </div>

      <div className={s.certGrid}>
        {certificates.map((cert, index) => (
          <div
            key={cert.title}
            className={`${s.certCard} reveal`}
            style={{ transitionDelay: `${index * 0.07}s` }}
          >
            <div className={s.certIcon}>{cert.icon}</div>
            <div>
              <div className={s.certTitle}>{cert.title}</div>
              <div className={s.certIssuer}>{cert.issuer}</div>
              <div className={s.certDate}>{cert.date}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
