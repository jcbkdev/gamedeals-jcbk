"use client";

import styles from "./style.module.css";
import Button from "@/app/components/Button/Button";
import Popup from "@/app/components/Popup/Popup";
import NotificationSettings from "@/app/components/NotificationSettings/NotificationSettings";

export default function Hero() {
  return (
    <header className={styles.hero}>
      <h1 className={styles.heroTitle}>
        <span className={styles.l1}>Stop missing</span>
        <span className={styles.l2}>free games</span>
      </h1>
      <Popup triggerElement={<Button>Activate Notifications</Button>}>
        <NotificationSettings />
      </Popup>
    </header>
  );
}
