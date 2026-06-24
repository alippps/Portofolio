import styles from "../styles/About.module.css";
import { stats } from "../data/portfolioData";
import SkillsMarquee from "../components/SkillsMarquee";

export default function About() {
  return (
    <section id="about" className={styles.about}>
      <div className={`${styles.aboutGrid} reveal`}>
        {/* Left: Bio */}
        <div>
          <p className="section-label">About Me</p>
          <h2 className="section-title">Who Am I?</h2>

          <div className={styles.aboutText}>
            <p>
              I am a web developer with 2+ years of experience building responsive,
              maintainable, and performance-minded web applications.
            </p>
            <p>
              My focus is turning ideas into clear user interfaces, connecting them
              with reliable APIs, and keeping the codebase easy to understand as the
              product grows.
            </p>
          </div>
        </div>

        {/* Right: Stats */}
        <div>
          <div className={styles.statsRow}>
            {stats.map(({ number, description }) => (
              <div className={styles.statCard} key={description}>
                <div className={styles.statNum}>{number}</div>
                <div className={styles.statDesc}>{description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tech Stack Marquee */}
      <div className={`${styles.techStack} reveal`}>
        <p className="section-label">Tech Stack</p>
        <SkillsMarquee />
      </div>
    </section>
  );
}
