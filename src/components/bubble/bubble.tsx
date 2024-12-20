import "./style.css";

type props = {
  url: string;
  image: string;
  alt?: string;
};

export default function Bubble(props: props) {
  return (
    <a
      className="bubble"
      href={props.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img className="bubble-icon" src={props.image} alt={props.alt} />
    </a>
  );
}
