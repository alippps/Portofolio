import styles from "../styles/Home.module.css";
import logo from "../assets/logo.png";
import { contact } from "../data/portfolioData";

export default function Home() {
  return (
    <section id="home" className={styles.home}>
      <div className={styles.homeGrid}>
        <div>
          <div className={styles.homeTag}>Maintenance apps</div>

          <h1 className={styles.homeH1}>
            Hi, I'm <span className={styles.grad}>Alif</span>
            <br />
            Web
            <br />
            Developer
          </h1>

          <p className={styles.homeSub}>
            I build responsive web apps, landing pages, and dashboards with React,
            with a focus on clean UI and practical performance. Beyond the craft
            itself, I work fluidly with AI as a collaborative tool - using it to
            think faster, iterate smarter, and deliver better outcomes.
          </p>

          <div className={styles.btnRow}>
            <a href="#project" className="btn btn-primary">View Projects</a>
            <a href={contact.cv} className="btn btn-outline" download>Download CV</a>
          </div>
        </div>

        <div className={styles.homeVisual}>
          <div className={styles.orb + " " + styles.orb1} />
          <div className={styles.orb + " " + styles.orb2} />
          <div className={styles.avatarRing}>
            <div className={styles.avatarInner}>
              <img src={logo} alt="Alif logo" className={styles.avatarLogo} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
