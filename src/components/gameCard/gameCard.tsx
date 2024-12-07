import "./style.css";
import Tag from "../tag/tag";
import Countdown from "react-countdown";
import { useEffect, useState } from "react";

export type platform = "steam" | "epicgames" | "gog";
const platforms: platform[] = ["steam", "epicgames", "gog"];

type props = {
  backgroundUrl: string;
  dealUrl: string;
  endDate: string;
  gameTitle: string;
  tags: [string, platform?][];
};

export default function GameCard(props: props) {
  const [platform, setPlatform] = useState<platform>();

  useEffect(() => {
    props.tags.forEach((tag) => {
      if (tag[1] && platforms.indexOf(tag[1]) != -1) {
        setPlatform(tag[1]);
        return;
      }
    });
  }, []);

  const handleClick = () => {
    window.open(props.dealUrl, "_");
  };

  return (
    <div className={`game-card game-card-${platform}`} onClick={handleClick}>
      <div
        className="game-card-image"
        style={{ backgroundImage: `url(${props.backgroundUrl})` }}
      >
        <div className="game-card-image-gradient"></div>
      </div>
      <div className="game-card-details">
        <p className="game-card-name">{props.gameTitle}</p>
        <div className="game-card-details-bottom">
          <div className="game-card-end-date">
            <Countdown daysInHours date={props.endDate} />
          </div>
          <div className="game-card-tags-container">
            {props.tags.map((value) => (
              <Tag name={value[0]} type={value[1]} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}