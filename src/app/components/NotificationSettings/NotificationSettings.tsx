"use client";

import styles from "./style.module.css";
import Checkbox from "../Checkbox/Checkbox";
import { useEffect, useRef, useState } from "react";
import Button from "../Button/Button";
import { checkSubscriptionStatus, messaging } from "@/utils/firebase";
import { deleteToken, getToken } from "firebase/messaging";

type Option = {
  id: string;
  value: string;
};

export default function NotificationSettings() {
  const [checked, setChecked] = useState<string[]>([]);
  const allCheck = useRef<HTMLInputElement | null>(null);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    async function init() {
      const status = await checkSubscriptionStatus();
      setSubscribed(status);
    }
    init();
  }, []);

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
    if (!messaging) return;

    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const token = await getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_VAPIDKEY,
        });

        if (token) {
          await fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/subscribe", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              token: token,
              platforms: checked,
            }),
          });
          return true;
        }
      }
    } catch (err) {
      console.error("Error subscribing", err);
    }
    return false;
  };

  const handleUnsubscribe = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!messaging) return;

    try {
      const currentToken = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_VAPIDKEY,
      });

      if (currentToken) {
        await fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/unsubscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: currentToken }),
        });
      }

      await deleteToken(messaging);

      if ("serviceWorker" in navigator) {
        const registration = await navigator.serviceWorker.getRegistration();

        if (registration) {
          const subscription = await registration.pushManager.getSubscription();
          if (subscription) {
            await subscription.unsubscribe();
          }
        }
      }

      alert("Unsubscribed successfully");
      setSubscribed(false);
    } catch (err) {
      console.error("Error unsubscribing", err);
      setSubscribed(false);
    }
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
      {subscribed && (
        <Button
          onClick={(e) => {
            handleUnsubscribe(e);
          }}
        >
          Unsubscribe
        </Button>
      )}
    </form>
  );
}
