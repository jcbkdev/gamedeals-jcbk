import "./style.css";
import MultiSelectList from "../multiSelectList/multiSelectList";
import { subscribe } from "../../modules/notifications/notifications";
import { useState } from "react";
import { platform } from "../gameCard/gameCard";

export default function NotificationSettings() {
  const [selection, setSelection] = useState<platform[] | "all" | null>(null);

  const handleClick = () => {
    if (!selection) return;
    console.log(selection);
    if ("Notification" in window) {
      if (Notification.permission == "default") {
        Notification.requestPermission().then(() => {
          if (Notification.permission == "granted") {
            subscribe(selection);
            return;
          } else {
            return alert("You need to enable notifications first");
          }
        });
        return;
      }
      if (Notification.permission == "denied") {
        return alert("You need to enable notifications first");
      }
    }
    subscribe(selection);
  };

  return (
    <div className="notification-settings">
      <div className="notification-settings-title">Personalize Your Alerts</div>
      <div className="notification-platforms-container">
        <div className="notifiaction-platforms-title">Platforms:</div>
        <MultiSelectList
          setter={setSelection}
          options={[
            { name: "steam", value: "Steam" },
            { name: "epicgames", value: "Epic Games" },
            { name: "gog", value: "GOG" },
          ]}
        />
      </div>
      <button className="button" onClick={handleClick}>
        Confirm
      </button>
    </div>
  );
}
