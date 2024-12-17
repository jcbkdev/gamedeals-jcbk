import "./style.css";
import PrivacyPolicy from "../../sections/privacypolicy/privacypolicy";

export default function Footer() {
  return (
    <div className="footer">
      <span className="copyright">jcbk©2024</span>
      <PrivacyPolicy
        trigger={<span className="interactive">Privacy Policy</span>}
      />
    </div>
  );
}
