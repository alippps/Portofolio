import styles from "../styles/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p>
          &copy; {new Date().getFullYear()} <span>Alffar Tech</span>
        </p>
        <a href="#home" className={styles.toTop}>Back to top ↑</a>
      </div>
    </footer>
  );
}
