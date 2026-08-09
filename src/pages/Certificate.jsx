import { FaExternalLinkAlt } from "react-icons/fa";
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
        {certificates.map((cert, index) => {
          // Cards with a credentialUrl become links so the claim is checkable.
          const verifiable = Boolean(cert.credentialUrl);
          const Card = verifiable ? "a" : "div";
          const linkProps = verifiable
            ? { href: cert.credentialUrl, target: "_blank", rel: "noreferrer" }
            : {};

          return (
            <Card
              key={cert.title}
              className={`${s.certCard} ${verifiable ? s.certCardLink : ""} reveal`}
              style={{ transitionDelay: `${index * 0.07}s` }}
              {...linkProps}
            >
              <div className={s.certIcon}>{cert.icon}</div>
              <div>
                <div className={s.certTitle}>{cert.title}</div>
                <div className={s.certIssuer}>{cert.issuer}</div>
                <div className={s.certDate}>{cert.date}</div>
                {verifiable && (
                  <span className={s.certVerify}>
                    Verify credential <FaExternalLinkAlt size={9} />
                  </span>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
