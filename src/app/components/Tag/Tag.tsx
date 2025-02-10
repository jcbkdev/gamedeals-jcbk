import styles from "./style.module.css";

export default function Tag(props: {
  mainPlatform?: string;
  children: string;
}) {
  return (
    <span
      className={styles.tag}
      {...(props.mainPlatform === "true" && { "main-platform": "" })}
    >
      {props.children}
    </span>
  );
}
