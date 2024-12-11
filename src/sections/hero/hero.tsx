import "./style.css";
import Popup from "../../components/popup/popup";
import NotificationSettings from "../../components/notificationSettings/notificationSettings";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-wrapper">
        <h2 className="hero-title">Missed a Free Game Before? Never Again!</h2>
        <p className="hero-text">
          Be the first to know about free games and limited-time offers!
          Activate notifications to receive instant alerts for every free game
          deal as soon as it's available.
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
