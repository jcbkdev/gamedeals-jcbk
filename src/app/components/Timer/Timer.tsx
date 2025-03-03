"use client";

import styles from "./style.module.css";
import { useEffect, useState } from "react";

function countDown(countDownDate: number): number {
  const now = Date.now();
  const distance = countDownDate - now;

  if (distance <= 0) {
    return 0;
  }

  let days = Math.ceil(distance / (1000 * 60 * 60 * 24));

  return days;
}

export default function Timer(props: { date: string | number }) {
  const dateString = props.date.toString();
  const dateNumber = Date.parse(dateString);

  const [time, setTime] = useState<number>(-1);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(countDown(dateNumber));
    }, 1000);

    if (!time) clearInterval(interval);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {time > 0 && (
        <div
          className={styles.timerContainer}
          data-timer-type={time > 2 ? "good" : time > 1 ? "warn" : "bad"}
        >
          <span className={styles.timer}>
            <span>
              ENDS{" "}
              {time > 2
                ? `IN ${time - 1} DAYS`
                : time > 1
                ? "TOMORROW"
                : "TODAY"}
            </span>
          </span>
        </div>
      )}
    </>
  );
}
