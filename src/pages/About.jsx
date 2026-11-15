import styles from "../styles/About.module.css";
import { stats, experience } from "../data/portfolioData";
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
              I am a software developer with 2+ years of professional experience
              building enterprise web applications with Angular and TypeScript, and
              side projects with React.
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

      {/* Experience */}
      <div className={`${styles.experience} reveal`}>
        <p className="section-label">Experience</p>
        <ol className={styles.timeline}>
          {experience.map((job) => (
            <li key={`${job.company}-${job.period}`} className={styles.job}>
              <div className={styles.jobHead}>
                <div>
                  <h3 className={styles.jobRole}>{job.role}</h3>
                  <p className={styles.jobCompany}>{job.company}</p>
                </div>
                <span className={styles.jobPeriod}>{job.period}</span>
              </div>
              <ul className={styles.jobPoints}>
                {job.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <div className={styles.jobTags}>
                {job.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Tech Stack Marquee */}
      <div className={`${styles.techStack} reveal`}>
        <p className="section-label">Tech Stack</p>
        <SkillsMarquee />
      </div>
    </section>
  );
}
