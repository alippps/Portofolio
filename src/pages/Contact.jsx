import { useState } from "react";
import s from "../styles/Sections.module.css";
import { socials } from "../data/portfolioData";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message)
      alert("Mohon lengkapi Nama, Email, dan Pesan sebelum mengirim.");
      return;
    // TODO: Integrate with emailjs / backend API
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className={s.contact}>
      <div className={`${s.contactInner} reveal`}>
        <p className="section-label">Contact</p>
        <h2 className="section-title">Let's Work Together</h2>
        <p className={s.contactDesc}>
          Have an interesting project? Want to discuss collaboration opportunities?
            I'm always open to new conversations.
        </p>

        <div className={s.contactForm}>
          <div className={s.formRow}>
            {/* <div className={s.formGroup}>
              <label htmlFor="name">Nama</label>
              <input
                id="name"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
              />
            </div> */}
            {/* <div className={s.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
              />
            </div> */}
          </div>

          {/* <div className={s.formGroup}>
            <label htmlFor="subject">Subjek</label>
            <input
              id="subject"
              name="subject"
              placeholder="Diskusi Proyek"
              value={form.subject}
              onChange={handleChange}
            />
          </div> */}

          {/* <div className={s.formGroup}>
            <label htmlFor="message">Pesan</label>
            <textarea
              id="message"
              name="message"
              placeholder="Halo, saya ingin mendiskusikan..."
              value={form.message}
              onChange={handleChange}
            />
          </div> */}

          {/* <div>
            <button className="btn btn-primary" onClick={handleSubmit}>
              {sent ? "✓ Pesan Terkirim!" : "Kirim Pesan →"}
            </button>
            {sent && <p className={s.sentMsg}>Terima kasih! Saya akan membalas segera.</p>}
          </div> */}
        </div>

        <div className={s.contactSocials}>
          {socials.map(({ icon, label, href }) => (
            <a key={label} href={href} className={s.socialBtn} target="_blank" rel="noreferrer">
              {icon} {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
