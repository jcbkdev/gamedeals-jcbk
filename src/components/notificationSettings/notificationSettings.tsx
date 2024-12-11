import "./style.css";
import MultiSelectList from "../multiSelectList/multiSelectList";

export default function NotificationSettings() {
  return (
    <div className="notification-settings">
      <div className="notification-settings-title">Personalize Your Alerts</div>
      <div className="notification-platforms-container">
        <div className="notifiaction-platforms-title">Platforms:</div>
        <MultiSelectList options={["Steam", "Epic Games", "GOG"]} />
      </div>
      <button className="button">Confirm</button>
    </div>
  );
}
