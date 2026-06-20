import styles from "../styles/Home.module.css";
import logo from "../assets/logo.png";

export default function Home() {
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
            <img src={logo} alt="Alif Farhan" className={styles.avatarImg} />
          </div>
        </div>
      </div>
    </section>
  );
}
