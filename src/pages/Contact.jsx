import { useState, useEffect, useRef } from "react";
import { FaEnvelope, FaFileDownload, FaPaperPlane } from "react-icons/fa";
import s from "../styles/Sections.module.css";
import { contact, socials } from "../data/portfolioData";
import { supabase } from "../lib/supabase";

function timeAgo(ts) {
  const diff = (Date.now() - new Date(ts).getTime()) / 1000;
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
  const [loading, setLoading] = useState(true);
  const bottomRef = useRef(null);
  const isMounted = useRef(false);

  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await supabase
        .from("comments")
        .select("*")
        .order("created_at", { ascending: true });
      if (data) setMessages(data);
      setLoading(false);
    };
    fetchMessages();

    const channel = supabase
      .channel("comments-realtime")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "comments" }, (payload) => {
        setMessages((prev) => [...prev, payload.new]);
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  useEffect(() => {
    if (!isMounted.current) { isMounted.current = true; return; }
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const { error } = await supabase.from("comments").insert({
      name: name.trim() || "Anonymous",
      message: message.trim(),
    });

    if (!error) {
      setMessage("");
      setName("");
      setSent(true);
      setTimeout(() => setSent(false), 2500);
    }
  };

  const contactLinks = [
    { icon: <FaFileDownload />, label: "Resume", value: "Download CV", href: contact.cv, download: "Alif-Farhan-CV.html" },
    ...socials.map(({ icon, label, href }) => ({ icon, label, value: "View profile", href })),
  ];

  return (
    <section id="contact" className={s.contact}>
      <div className={`${s.contactLayout} reveal`}>
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

        <div className={s.contactRight}>
          <div className={s.inbox}>
            <div className={s.inboxHeader}>
              <FaEnvelope size={13} />
              <span>Messages</span>
              {messages.length > 0 && (
                <span className={s.inboxCount}>{messages.length}</span>
              )}
            </div>

            <div className={s.inboxBody}>
              {loading ? (
                <p className={s.inboxEmpty}>Loading...</p>
              ) : messages.length === 0 ? (
                <p className={s.inboxEmpty}>No messages yet. Say hi below!</p>
              ) : (
                messages.map((m) => (
                  <div key={m.id} className={s.msgBubble}>
                    <div className={s.msgMeta}>
                      <span className={s.msgName}>{m.name}</span>
                      <span className={s.msgTime}>{timeAgo(m.created_at)}</span>
                    </div>
                    <p className={s.msgText}>{m.message}</p>
                  </div>
                ))
              )}
              <div ref={bottomRef} />
            </div>
          </div>

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
