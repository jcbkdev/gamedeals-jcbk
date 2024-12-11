import { useRef, useState } from "react";
import "./style.css";

type props = {
  options: string[];
};

export default function MultiSelectList(props: props) {
  const ref = useRef<HTMLInputElement | null>(null);
  const [checkedBoxes, setCheckedBoxes] = useState<HTMLInputElement[]>([]);
  const [isAll, setIsAll] = useState<boolean>(false);

  const setIndeterminate = (boolean: boolean) => {
    if (ref.current) {
      ref.current.indeterminate = boolean;
    }
  };

  const handleCheckAll = (e: React.MouseEvent<HTMLInputElement>) => {
    const checked = e.currentTarget.checked;
    if (e.currentTarget.id !== "all") return;

    setIsAll(checked);

    if (checked) {
      const allCheckedInputs = props.options
        .map((option) => {
          const element = document.getElementById(
            option.toLowerCase()
          ) as HTMLInputElement;
          if (element) {
            element.checked = true;
            return element;
          }
          return null;
        })
        .filter(Boolean) as HTMLInputElement[];

      setCheckedBoxes(allCheckedInputs);
    } else {
      const allUncheckedInputs = props.options
        .map((option) => {
          const element = document.getElementById(
            option.toLowerCase()
          ) as HTMLInputElement;
          if (element) {
            element.checked = false;
            return element;
          }
          return null;
        })
        .filter(Boolean) as HTMLInputElement[];

      setCheckedBoxes([]);
    }

    setIndeterminate(false);
  };

  const handleCheck = (e: React.MouseEvent<HTMLInputElement>) => {
    const tempArray = [...checkedBoxes];

    if (e.currentTarget.checked) {
      tempArray.push(e.currentTarget);
    } else {
      const index = tempArray.indexOf(e.currentTarget);
      if (index !== -1) {
        tempArray.splice(index, 1);
      }
    }

    setCheckedBoxes(tempArray);

    if (tempArray.length === 0) {
      setIndeterminate(false);
    } else if (tempArray.length === props.options.length) {
      setIsAll(true);
      if (ref.current) {
        setIndeterminate(false);
        ref.current.checked = true;
      }
    } else if (tempArray.length < props.options.length) {
      setIndeterminate(true);
      if (ref.current) {
        setIndeterminate(true);
        ref.current.checked = false;
      }
    }
  };

  return (
    <div className="multiselectlist-options">
      <span className="multiselectlist-option multiselectlist-option-all">
        <input
          className="multiselectlist-checkbox"
          onClick={handleCheckAll}
          ref={ref}
          type="checkbox"
          name="all"
          id="all"
        />
        <label>All</label>
      </span>
      {props.options.map((value) => (
        <span className="multiselectlist-option">
          <input
            className="multiselectlist-checkbox"
            onClick={handleCheck}
            type="checkbox"
            name={value}
            id={value.toLowerCase()}
          />
          <label>{value}</label>
        </span>
      ))}
    </div>
  );
}
