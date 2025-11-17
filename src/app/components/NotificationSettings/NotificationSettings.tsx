"use client";

import styles from "./style.module.css";
import Checkbox from "../Checkbox/Checkbox";
import { useRef, useState } from "react";
import Button from "../Button/Button";

type Option = {
  id: string;
  value: string;
};

export default function NotificationSettings() {
  const [checked, setChecked] = useState<string[]>([]);
  const allCheck = useRef<HTMLInputElement | null>(null);

  const checkboxes: Option[] = [
    { id: "check-steam", value: "Steam" },
    { id: "check-epicgames", value: "Epic Games" },
    { id: "check-gog", value: "GOG" },
  ];

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setChecked((prevChecked) => {
      const newChecked = checked
        ? [...prevChecked, id]
        : prevChecked.filter((v) => v !== id);

      if (allCheck.current) {
        if (newChecked.length === checkboxes.length) {
          allCheck.current.checked = true;
          allCheck.current.indeterminate = false;
        } else if (newChecked.length > 0) {
          allCheck.current.checked = false;
          allCheck.current.indeterminate = true;
        } else {
          allCheck.current.checked = false;
          allCheck.current.indeterminate = false;
        }
      }

      return newChecked;
    });
  };

  const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setChecked(isChecked ? checkboxes.map((cb) => cb.id) : []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // try {
    //   const response = await fetch(process.env.NEXT_PUBLIC_NOTIFICATIONS_URI!, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ checked }),
    //   });

    //   if (!response.ok) throw new Error("Failed to send request");
    //   console.log("Success:", await response.json());
    // } catch (error) {
    //   console.error("Error:", error);
    // }
  };

  return (
    <form className={styles.notificationSettings} onSubmit={handleSubmit}>
      <h1 className={styles.title}>Personalize Your Alerts</h1>
      <div className={styles.checkboxContainer}>
        <Checkbox
          id="check-all"
          label="All"
          key="check-all"
          onChange={handleCheckAll}
          ref={allCheck}
          checked={checked.length === checkboxes.length}
        />
        {checkboxes.map((checkbox) => (
          <Checkbox
            key={checkbox.id}
            id={checkbox.id}
            label={checkbox.value}
            onChange={handleCheck}
            checked={checked.includes(checkbox.id)}
          />
        ))}
      </div>
      <Button>Confirm</Button>
    </form>
  );
}
