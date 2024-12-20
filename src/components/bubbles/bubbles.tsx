import "./style.css";

export default function Bubbles(props: {
  children: JSX.Element | JSX.Element[];
}) {
  return <div className="bubbles">{props.children}</div>;
}
