"use client";

import styles from "./style.module.css";
import { MouseEventHandler } from "react";

type Props = {
  onClick?: MouseEventHandler;
  children: string;
};

export default function Button(props: Props) {
  return (
    <button className={styles.button} onClick={props.onClick}>
      {props.children}
    </button>
  );
}
