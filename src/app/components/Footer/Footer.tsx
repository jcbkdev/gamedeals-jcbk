import styles from "./style.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.disclaimer}>
        <h3>Disclaimer</h3>
        <p>
          Powered by Steam, a registered trademark of Valve Corporation. This
          website is in no way affiliated with or endorsed by Valve Corporation.
          We cannot guarantee the accuracy or availability of the displayed
          offers - before you buy something in a store, make sure that the
          prices are correct.{" "}
        </p>
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
        </a>{" "}
        &{" "}
        <a
          href="https://store.steampowered.com/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Steam
        </a>
      </span>
      <span>
        © 2026{" "}
        <a href="https://jcbk.pl" rel="noopener noreferrer" target="_blank">
          JCBK
        </a>
        . All rights reserved. All trademarks are the property of their
        respective owners.
      </span>
    </footer>
  );
}
