import { useState, useEffect, useRef } from "react";
import { FaEnvelope, FaFileDownload, FaPaperPlane } from "react-icons/fa";
import s from "../styles/Sections.module.css";
import { contact, socials } from "../data/portfolioData";

const STORAGE_KEY = "portfolio_messages";

function timeAgo(ts) {
  const diff = (Date.now() - ts) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return new Date(ts).toLocaleDateString();
}

export default function Contact() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [sent, setSent] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      setMessages(saved);
    } catch {
      setMessages([]);
    }
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMsg = {
      id: Date.now(),
      name: name.trim() || "Anonymous",
      text: message.trim(),
      ts: Date.now(),
    };

    const updated = [...messages, newMsg];
    setMessages(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setMessage("");
    setName("");
    setSent(true);
    setTimeout(() => setSent(false), 2500);
  };

  const contactLinks = [
    { icon: <FaFileDownload />, label: "Resume", value: "Download CV", href: contact.cv, download: "Alif-Farhan-CV.html" },
    ...socials.map(({ icon, label, href }) => ({ icon, label, value: "View profile", href })),
  ];

  return (
    <section id="contact" className={s.contact}>
      <div className={`${s.contactLayout} reveal`}>
        {/* Left — info */}
        <div className={s.contactLeft}>
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

        {/* Right — message box */}
        <div className={s.contactRight}>
          {/* Inbox */}
          <div className={s.inbox}>
            <div className={s.inboxHeader}>
              <FaEnvelope size={13} />
              <span>Messages</span>
              {messages.length > 0 && (
                <span className={s.inboxCount}>{messages.length}</span>
              )}
            </div>

            <div className={s.inboxBody}>
              {messages.length === 0 ? (
                <p className={s.inboxEmpty}>No messages yet. Say hi below!</p>
              ) : (
                messages.map((m) => (
                  <div key={m.id} className={s.msgBubble}>
                    <div className={s.msgMeta}>
                      <span className={s.msgName}>{m.name}</span>
                      <span className={s.msgTime}>{timeAgo(m.ts)}</span>
                    </div>
                    <p className={s.msgText}>{m.text}</p>
                  </div>
                ))
              )}
              <div ref={bottomRef} />
            </div>
          </div>

          {/* Form */}
          <form className={s.msgForm} onSubmit={handleSend}>
            <input
              className={s.msgInput}
              type="text"
              placeholder="Your name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={40}
            />
            <div className={s.msgTextareaWrap}>
              <textarea
                className={s.msgTextarea}
                placeholder="Write a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={300}
                rows={3}
              />
              <button
                type="submit"
                className={`${s.msgSendBtn} ${sent ? s.sent : ""}`}
                disabled={!message.trim()}
                aria-label="Send"
              >
                {sent ? "✓" : <FaPaperPlane size={14} />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
