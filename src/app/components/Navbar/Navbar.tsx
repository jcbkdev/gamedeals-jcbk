import styles from "./style.module.css";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <span className={styles.logo}>
        <span>Game</span>
        <img src="/logo.svg" alt="jcbk logo image" />
        <span>Deals</span>
      </span>
    </div>
  );
}
