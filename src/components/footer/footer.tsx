import "./style.css";
import PrivacyPolicy from "../../sections/privacypolicy/privacypolicy";

export default function Footer() {
  return (
    <div className="footer">
      <span className="copyright">jcbk©2025</span>
      <PrivacyPolicy
        trigger={<span className="interactive">Privacy Policy</span>}
      />
      <a
        href="https://www.gamerpower.com"
        className="gamerpower-attribution interactive"
        target="_blank"
        rel="noopener"
      >
        Powered by GamerPower
      </a>
    </div>
  );
}
