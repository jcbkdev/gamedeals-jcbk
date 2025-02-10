"use client";

import styles from "./style.module.css";
import Button from "@/app/components/Button/Button";

export default function Hero() {
  return (
    <header className={styles.hero}>
      <div className={styles.heroTextContainer}>
        <h1 className={styles.heroTitle}>
          Missed a Free Game Before? Never Again!
        </h1>
        <h2 className={styles.heroDescription}>
          Never miss out on free games again! Discover and claim free games from
          top platforms like Steam, Epic Games, and GOG, all in one place.
          Activate notifications to get instant alerts and secure every free
          game deal before it's gone!
        </h2>
      </div>
      <Button
        onClick={() => {
          return;
        }}
      >
        Configure Your Alerts
      </Button>
    </header>
  );
}
