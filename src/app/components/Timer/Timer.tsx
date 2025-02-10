"use client";

import styles from "./style.module.css";
import { useEffect, useState } from "react";

type Time = {
  hours: number;
  minutes: number;
  seconds: number;
};

function countDown(countDownDate: number): Time {
  const now = Date.now();

  const distance = countDownDate - now;

  const hours = Math.floor(distance / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  return {
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
}

export default function Timer(props: { date: string | number }) {
  const dateString = props.date.toString();
  const dateNumber = Date.parse(dateString);

  const [time, setTime] = useState<Time>({
    hours: -1,
    minutes: -1,
    seconds: -1,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(countDown(dateNumber));
    }, 1000);

    if (!time.hours && !time.minutes && !time.seconds) clearInterval(interval);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className={styles.timer}>
      <span>
        {time.hours === -1 ? "-" : String(time.hours).padStart(2, "0")}:
      </span>
      <span>
        {time.hours === -1 ? "-" : String(time.minutes).padStart(2, "0")}:
      </span>
      <span>
        {time.hours === -1 ? "-" : String(time.seconds).padStart(2, "0")}
      </span>
    </span>
  );
}
