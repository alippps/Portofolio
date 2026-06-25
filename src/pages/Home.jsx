import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";

const SEGMENTS = ["<", "AF", "/>"];
const TYPE_DELAY  = 200;
const DELETE_DELAY = 120;
const PAUSE_FULL  = 1800;
const PAUSE_EMPTY = 600;

export default function Home() {
  const [count, setCount] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let t;
    if (!deleting && count < SEGMENTS.length) {
      t = setTimeout(() => setCount(c => c + 1), TYPE_DELAY);
    } else if (!deleting && count === SEGMENTS.length) {
      t = setTimeout(() => setDeleting(true), PAUSE_FULL);
    } else if (deleting && count > 0) {
      t = setTimeout(() => setCount(c => c - 1), DELETE_DELAY);
    } else {
      t = setTimeout(() => setDeleting(false), PAUSE_EMPTY);
    }
    return () => clearTimeout(t);
  }, [count, deleting]);

  return (
    <section id="home" className={styles.home}>
      <div className={styles.homeGrid}>
        <div>
          <p className={styles.homeRole}>WEB Developer</p>
          <h1 className={styles.homeH1}>
            ALIF<br />FARHAN
          </h1>
          <p className={styles.homeSub}>
            I build responsive web apps, landing pages, and dashboards with React,
            with a focus on clean UI and practical performance. I work fluidly
            with AI as a collaborative tool.
          </p>
          <div className={styles.statsRow}>
            <span>2+ yrs experience</span>
            <span className={styles.statsDot} />
            <span>15+ projects shipped</span>
            <span className={styles.statsDot} />
            <span className={styles.statsOpen}>
              <span className={styles.statusDot} />
              Open to work
            </span>
          </div>
          <div className={styles.btnRow}>
            <a href="#project" className="btn btn-primary">View Projects</a>
            <a href="#contact" className="btn btn-outline">Get in Touch</a>
          </div>
        </div>

        <div className={styles.homeVisual}>
          <div className={styles.avatarWrap}>
            <div className={styles.codeMark}>
              {count >= 1 && <span className={styles.codeOpen}>&lt;</span>}
              {count >= 2 && <span className={styles.codeInitials}>AF</span>}
              {count >= 3 && <span className={styles.codeClose}>/&gt;</span>}
              <span className={styles.codeCursor} aria-hidden="true">|</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
