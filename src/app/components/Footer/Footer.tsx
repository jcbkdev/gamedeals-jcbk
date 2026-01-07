import styles from "./style.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span>
        © 2025{" "}
        <a href="https://jcbk.pl" rel="noopener noreferrer" target="_blank">
          JCBK
        </a>
      </span>
      <span>
        Powered by{" "}
        <a
          href="https://gamerpower.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          Gamerpower
        </a>{" "}
        &{" "}
        <a href="https://igdb.com" rel="noopener noreferrer" target="_blank">
          IGDB
        </a>
      </span>
    </footer>
  );
}
