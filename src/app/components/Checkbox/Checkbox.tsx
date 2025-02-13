"use client";

import styles from "./style.module.css";
import { ForwardedRef, forwardRef, useState } from "react";

type props = {
  onChange?: React.ChangeEventHandler;
  id: string;
  label: string;
  checked?: boolean;
};

const Checkbox = forwardRef(
  (props: props, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <label className={styles.checkbox}>
        {props.label}
        <input
          onChange={props.onChange}
          type="checkbox"
          id={props.id ?? ""}
          name={props.id ?? ""}
          ref={ref}
          checked={props.checked}
        />
        <span className={styles.checkboxCheckmark}></span>
      </label>
    );
  }
);

export default Checkbox;
