import "./style.css";
import { ForwardedRef, forwardRef, MouseEventHandler } from "react";

type props = {
  onClick?: MouseEventHandler;
  id: string;
  label: string;
};

const Checkbox = forwardRef(
  (props: props, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <label className="checkbox">
        {props.label}
        <input
          className="checkbox-input"
          onClick={props.onClick}
          type="checkbox"
          id={props.id ?? ""}
          name={props.id ?? ""}
          ref={ref}
        />
        <span className="checkbox-checkmark"></span>
      </label>
    );
  }
);

export default Checkbox;
