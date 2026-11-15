import styles from "../styles/SkillsMarquee.module.css";
import { skills } from "../data/portfolioData";

function MarqueeRow({ items, reverse = false }) {
  // The list is rendered twice so the loop is seamless; the copy is hidden
  // from screen readers so every skill is announced once.
  const doubled = [...items, ...items];
  return (
    <div className={styles.marqueeWrapper}>
      <div className={`${styles.marqueeTrack} ${reverse ? styles.reverse : ""}`}>
        {doubled.map((skill, i) => (
          <div key={i} className={styles.skillItem} aria-hidden={i >= items.length || undefined}>
            <span className={styles.iconWrap}>{skill.icon}</span>
            <span className={styles.skillName}>{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SkillsMarquee() {
  const mid = Math.ceil(skills.length / 2);
  return (
    <div className={styles.container}>
      <MarqueeRow items={skills.slice(0, mid)} />
      <MarqueeRow items={skills.slice(mid)} reverse />
    </div>
  );
}
