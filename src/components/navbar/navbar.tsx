import "./style.css";
import logo from "/logo.svg";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="logo-wrapper">
        <span>Game</span>
        <img src={logo} alt="" />
        <span>Deals</span>
      </div>
    </div>
  );
}
