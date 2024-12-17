import "./style.css";
import MessageIcon from "/message_icon.svg";

export default function Feedback() {
  const handleClick = () => {
    window.open("mailto:jcbkdev@gmail.com?subject=GameDeals%20Feedback");
  };

  return (
    <div className="feedback" onClick={handleClick}>
      <img src={MessageIcon} alt="" />
    </div>
  );
}
