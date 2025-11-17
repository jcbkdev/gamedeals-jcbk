"use client";

import styles from "./style.module.css";
import { useEffect, useState } from "react";
import Popup from "../Popup/Popup";

export default function Disclaimer() {
  return (
    <Popup open={true}>
      <div className={styles.disclaimer}>
        <h2 className={styles["disclaimer-title"]}>Disclaimer</h2>
        <p className={styles["disclaimer-text"]}>
          <span>
            This website is a <strong>demonstration prototype</strong> created
            for showcasing skills. Some features may be incomplete, and certain
            content may be placeholders.{" "}
          </span>
          <span>
            <strong>
              Access is intended only for recruiters, interested developers, or
              visitors arriving from jcbk.pl.
            </strong>
          </span>
          <span>
            If you do not meet any of these criteria, you are kindly asked to
            leave this website.
          </span>
        </p>
      </div>
    </Popup>
  );
}
