import "./style.css";
import Popup from "../../components/popup/popup";
import NotificationSettings from "../../components/notificationSettings/notificationSettings";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-wrapper">
        <h2 className="hero-title">Missed a Free Game Before? Never Again!</h2>
        <p className="hero-text">
          Never miss out on free games again! Discover and claim free games from
          top platforms like Steam, Epic Games, and GOG, all in one place.
          Activate notifications to get instant alerts and secure every free
          game deal before it's gone!
        </p>
      </div>
      <Popup
        trigger={<button className="button">Configure Your Alerts</button>}
      >
        <NotificationSettings />
      </Popup>
    </section>
  );
}
