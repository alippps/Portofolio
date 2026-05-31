import styles from "../styles/Home.module.css";
import logo from "../assets/logo.png"

export default function Home() {
  return (
    <section id="home" className={styles.home}>
      <div className={styles.homeGrid}>
        {/* Left: Text */}
        <div>
          <div className={styles.homeTag}>Under Development</div>

          <h1 className={styles.homeH1}>
            Hi, I'm <span className={styles.grad}>Alif</span>
            <br />
            Web
            <br />
            Developer
          </h1>

          <p className={styles.homeSub}>
            Saya membangun produk digital yang cepat, indah, dan berdampak.
            Spesialis React &amp; Node.js dengan passion di UX dan performa web.
          </p>

          <div className={styles.btnRow}>
            <a href="#project" className="btn btn-primary">Lihat Proyek</a>
            <a href="#contact" className="btn btn-outline">Hubungi Saya</a>
          </div>
        </div>

        {/* Right: Avatar */}
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
