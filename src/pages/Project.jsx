import styles from "../styles/Project.module.css";
import { projects } from "../data/portfolioData";

export default function Project() {
  return (
    <section id="project" className={styles.project}>
      <div className="reveal">
        <p className="section-label">Portofolio</p>
        <h2 className="section-title">Proyek Terbaru</h2>
      </div>

      <div className={styles.projectsGrid}>
        {projects.map((project, index) => (
          <div
            key={project.title}
            className={`${styles.projCard} reveal`}
            style={{ transitionDelay: `${index * 0.08}s` }}
          >
            <a className={styles.projLink} href={project.link} aria-label={`Buka ${project.title}`}>
              ↗
            </a>
            <div className={styles.projIcon}>{project.icon}</div>
            <div className={styles.projTitle}>{project.title}</div>
            <div className={styles.projDesc}>{project.desc}</div>
            <div className={styles.projTags}>
              {project.tags.map((tag) => (
                <span key={tag} className={styles.projTag}>{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
