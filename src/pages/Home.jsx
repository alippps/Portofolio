import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import HeroScene from "../components/HeroScene";

const SEGMENTS = ["< ", "A", "L", "F", "F", "A", "R", " >"];
const FULL_TEXT = SEGMENTS.join("");
const TYPE_DELAY   = 200;
const DELETE_DELAY = 120;
const PAUSE_FULL   = 1800;
const PAUSE_EMPTY  = 600;

const HIGHLIGHTS = ["2+ yrs experience", "15+ projects shipped"];

// Mirrors the Tech Stack section, grouped by layer: what I use at work
// (Angular + Go + PostgreSQL, BIRT on Tomcat, deployed on Kubernetes) and on the side.
const STACK = [
  ["frontend", ["Angular", "TypeScript", "React"]],
  ["backend", ["Go", "Node.js", "PostgreSQL"]],
  ["devops", ["Docker", "Kubernetes", "Tomcat"]],
];

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
      <HeroScene />

      <div className={`container ${styles.homeGrid}`}>
        <div className={styles.homeCopy}>
          <p className={styles.homeRole}>Software Developer</p>
          <p className={styles.homeGreeting}>
            <span aria-hidden="true">👋</span> Hi, I&apos;m
          </p>
          <h1 className={styles.homeH1}>ALIF</h1>
          <p className={styles.homeSub}>
            I build enterprise web apps with Angular and TypeScript at work, and
            responsive landing pages and dashboards with React on the side, with a
            focus on clean UI and practical performance. I work fluidly with AI as
            a collaborative tool.
          </p>

          <ul className={styles.highlights}>
            {HIGHLIGHTS.map((item) => (
              <li key={item}>{item}</li>
            ))}
            <li className={styles.openToWork}>
              <span className={styles.statusDot} />
              Available for freelance
            </li>
          </ul>

          <div className={styles.btnRow}>
            <a href="#project" className="btn btn-primary">View Projects</a>
            <a href="#contact" className="btn btn-outline">Get in Touch</a>
          </div>
        </div>

        {/* Decorative: everything here is already said in the copy on the left */}
        <div className={styles.homeVisual} aria-hidden="true">
          <div className={styles.codeCard}>
            <div className={styles.codeChrome}>
              <span />
              <span />
              <span />
              <em>alif.ts</em>
            </div>

            <pre className={styles.codeBody}>
              <code>
                <span className={styles.tKey}>const</span> dev = {"{"}{"\n"}
                {"  "}name: <span className={styles.tStr}>"Alif Farhan"</span>,{"\n"}
                {"  "}role: <span className={styles.tStr}>"Software Developer"</span>,{"\n"}
                {"  "}stack: {"{"}{"\n"}
                {STACK.map(([layer, items]) => (
                  <span key={layer}>
                    {"    "}{layer}: [
                    {items.map((item, i) => (
                      <span key={item}>
                        {i > 0 && ", "}
                        <span className={styles.tStr}>"{item}"</span>
                      </span>
                    ))}
                    ],{"\n"}
                  </span>
                ))}
                {"  "}{"}"},{"\n"}
                {"  "}based: <span className={styles.tStr}>"Jakarta, ID"</span>,{"\n"}
                {"  "}availability: <span className={styles.tStr}>"Open for freelance work"</span>,{"\n"}
                {"}"};
              </code>
            </pre>

            <div className={styles.codeMark}>
              <span className={styles.codePrompt}>$</span>
              {/* Fixed width (the full string, invisible) so the card never jitters while typing */}
              <span className={styles.codeTyped} data-full={FULL_TEXT}>
                <span>
                  {SEGMENTS.slice(0, count).join("")}
                  <span className={styles.codeCursor} />
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
