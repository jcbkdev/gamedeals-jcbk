import { platform } from "../gameCard/gameCard";
import "./style.css";

type props = {
  name: string;
  type?: platform;
};

export default function Tag(props: props) {
  return (
    <span className={`game-tag${props.type ? ` game-tag-${props.type}` : ""}`}>
      {props.name}
    </span>
  );
}
