import { useState } from "react";
import styles from "../styles/Navbar.module.css";

export default function Navbar({ scrolled, activeSection, navLinks }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ""}`}>
        {/* Desktop pill links */}
        <ul className={styles.navLinks}>
          {navLinks.map((name) => (
            <li key={name}>
              <a
                href={`#${name.toLowerCase()}`}
                className={activeSection === name.toLowerCase() ? styles.activeLink : ""}
              >
                {name}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger (inside pill) */}
        <button
          className={`${styles.menuBtn} ${menuOpen ? styles.menuBtnOpen : ""}`}
          onClick={() => setMenuOpen((p) => !p)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          className={styles.mobileOverlay}
          role="presentation"
          onClick={() => setMenuOpen(false)}
        >
          <ul className={styles.mobileLinks} onClick={(e) => e.stopPropagation()}>
            {navLinks.map((name, i) => (
              <li key={name} style={{ animationDelay: `${i * 0.06}s` }}>
                <a
                  href={`#${name.toLowerCase()}`}
                  className={activeSection === name.toLowerCase() ? styles.activeMobile : ""}
                  onClick={() => setMenuOpen(false)}
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
