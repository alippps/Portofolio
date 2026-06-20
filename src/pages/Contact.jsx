import { FaEnvelope, FaFileDownload, FaWhatsapp } from "react-icons/fa";
import s from "../styles/Sections.module.css";
import { contact, socials } from "../data/portfolioData";

export default function Contact() {
  const contactLinks = [
    { icon: <FaEnvelope />, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { icon: <FaWhatsapp />, label: "WhatsApp", value: "Start a conversation", href: contact.whatsapp },
    { icon: <FaFileDownload />, label: "CV", value: "Download resume", href: contact.cv, download: "Alif-Farhan-CV.html" },
    ...socials.map(({ icon, label, href }) => ({ icon, label, value: "View profile", href })),
  ];

  return (
    <section id="contact" className={s.contact}>
      <div className={`${s.contactInner} reveal`}>
        <p className="section-label">Contact</p>
        <h2 className="section-title">Let's Work Together</h2>
        <p className={s.contactDesc}>
          Have a website, landing page, or dashboard idea? I am open to freelance
          projects, collaborations, and frontend roles.
        </p>

        <div className={s.contactList}>
          {contactLinks.map(({ icon, label, value, href, download }) => (
            <a
              key={label}
              href={href}
              className={s.contactLink}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
              download={download}
            >
              <span className={s.contactIcon}>{icon}</span>
              <span>
                <strong>{label}</strong>
                <small>{value}</small>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
