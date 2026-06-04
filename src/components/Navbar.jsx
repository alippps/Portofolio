import { useState } from "react";
import styles from "../styles/Navbar.module.css";
import logo from "../assets/logo.png"

export default function Navbar({ scrolled, activeSection, navLinks }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ""}`}>
      <a href="#home" className={styles.navLogo}>
        <img src={logo} alt="AT logo" className={styles.navLogoImage} />
      </a>

      <ul className={`${styles.navLinks} ${menuOpen ? styles.navOpen : ""}`}>
        {navLinks.map((name) => (
          <li key={name}>
            <a
              href={`#${name.toLowerCase()}`}
              className={activeSection === name.toLowerCase() ? styles.activeLink : ""}
              onClick={() => setMenuOpen(false)}
            >
              {name}
            </a>
          </li>
        ))}
      </ul>

      <button
        className={styles.hamburger}
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        <span style={menuOpen ? { transform: "rotate(45deg) translate(5px, 5px)" } : {}} />
        <span style={menuOpen ? { opacity: 0 } : {}} />
        <span style={menuOpen ? { transform: "rotate(-45deg) translate(5px, -5px)" } : {}} />
      </button>
    </nav>
  );
}
