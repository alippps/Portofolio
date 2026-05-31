import s from "../styles/Sections.module.css";
import { certificates } from "../data/portfolioData";

export default function Sertifikat() {
  return (
    <section id="sertifikat" className={s.sertifikat}>
      <div className="reveal">
        <p className="section-label">Pencapaian</p>
        <h2 className="section-title">Sertifikat &amp; Penghargaan</h2>
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
