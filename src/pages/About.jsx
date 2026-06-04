import styles from "../styles/About.module.css";
import { skills, stats } from "../data/portfolioData";

export default function About() {
  return (
    <section id="about" className={styles.about}>
      <div className={`${styles.aboutGrid} reveal`}>
        {/* Left: Bio */}
        <div>
          <p className="section-label">About Me</p>
          <h2 className="section-title">Who Am i ?</h2>

          <div className={styles.aboutText}>
            <p>
              I am a web developer with over 2 years of experience building scalable and performant web applications.
               I believe that good code is easy to read, maintain, and test.
            </p>
            <p>
              Besides coding, I enjoy sharing knowledge through writing and open source.
                I always stay up-to-date with the latest technologies and industry best practices.
            </p>
          </div>

          <div className={styles.skillsWrap}>
            {skills.map((skill) => (
              <span key={skill} className={styles.skillPill}>{skill}</span>
            ))}
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
    </section>
  );
}
