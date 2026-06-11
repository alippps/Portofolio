import { useState } from "react";
import { FaExternalLinkAlt, FaGithub, FaTimes } from "react-icons/fa";
import styles from "../styles/Project.module.css";
import { projects } from "../data/portfolioData";

export default function Project() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="project" className={styles.project}>
      <div className="reveal">
        <p className="section-label">Portfolio</p>
        <h2 className="section-title">Featured Projects</h2>
      </div>

      <div className={styles.projectsGrid}>
        {projects.map((project, index) => (
          <article
            key={project.title}
            className={`${styles.projCard} reveal`}
            style={{ transitionDelay: `${index * 0.08}s` }}
          >
            <div className={`${styles.projectPreview} ${styles[project.preview]}`}>
              <div className={styles.previewChrome}>
                <span />
                <span />
                <span />
              </div>
              <div className={styles.previewBody}>
                <div className={styles.previewPanel}>
                  <strong>{project.title}</strong>
                  <small>{project.subtitle}</small>
                </div>
                <div className={styles.previewBars}>
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>

            <div className={styles.cardTop}>
              <div className={styles.projIcon}>{project.icon}</div>
              <span className={styles.projSubtitle}>{project.subtitle}</span>
            </div>

            <h3 className={styles.projTitle}>{project.title}</h3>
            <p className={styles.projDesc}>{project.desc}</p>
            <p className={styles.projImpact}>{project.impact}</p>

            <div className={styles.projTags}>
              {project.tags.map((tag) => (
                <span key={tag} className={styles.projTag}>{tag}</span>
              ))}
            </div>

            <div className={styles.projectActions}>
              <button type="button" className={styles.detailBtn} onClick={() => setSelectedProject(project)}>
                View Detail
              </button>
              <a href={project.liveLink} target="_blank" rel="noreferrer" aria-label={`Open ${project.title}`}>
                <FaExternalLinkAlt />
              </a>
              <a href={project.sourceLink} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} source`}>
                <FaGithub />
              </a>
            </div>
          </article>
        ))}
      </div>

      {selectedProject && (
        <div className={styles.modalOverlay} role="presentation" onClick={() => setSelectedProject(null)}>
          <article
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-detail-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className={styles.closeBtn}
              onClick={() => setSelectedProject(null)}
              aria-label="Close project detail"
            >
              <FaTimes />
            </button>

            <div className={`${styles.projectPreview} ${styles.modalPreview} ${styles[selectedProject.preview]}`}>
              <div className={styles.previewChrome}>
                <span />
                <span />
                <span />
              </div>
              {selectedProject.image ? (
                  <img
                    src={selectedProject.image}
                    alt={`${selectedProject.title} preview`}
                    className={styles.modalImage}
                  />
                ) : (
                  <div className={`${styles.projectPreview} ${styles.modalPreview} ${styles[selectedProject.preview]}`}>
                  <div className={styles.previewBody}>
                <div className={styles.previewPanel}>
                  <strong>{selectedProject.title}</strong>
                  <small>{selectedProject.subtitle}</small>
                </div>
                <div className={styles.previewBars}>
                  <span />
                  <span />
                  <span />
                </div>
              </div>
                  </div>
                )}
            </div>

            <p className="section-label">Case Study</p>
            <h3 id="project-detail-title" className={styles.modalTitle}>{selectedProject.title}</h3>
            <p className={styles.modalDesc}>{selectedProject.desc}</p>

            <div className={styles.detailGrid}>
              <div>
                <h4>Key Features</h4>
                <ul>
                  {selectedProject.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4>Challenge</h4>
                <p>{selectedProject.challenge}</p>
              </div>
            </div>

            <div className={styles.modalActions}>
              <a className="btn btn-primary" href={selectedProject.liveLink} target="_blank" rel="noreferrer">
                Live Demo
              </a>
              <a className="btn btn-outline" href={selectedProject.sourceLink} target="_blank" rel="noreferrer">
                Source Code
              </a>
            </div>
          </article>
        </div>
      )}
    </section>
  );
}
