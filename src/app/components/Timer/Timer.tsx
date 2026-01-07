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
    setTime(countDown(dateNumber));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(countDown(dateNumber));
    }, 1000);

    if (!time) clearInterval(interval);

    return () => clearInterval(interval);
  }, []);

  if (time === -1) return <p>Loading...</p>;

  return (
    <>
      {time > 0 && (
        <p>
          {time > 1
            ? `${time - 1} ${time > 2 ? "days" : "day"} left`
            : `Ends today`}
        </p>
      )}
    </>
  );
}
