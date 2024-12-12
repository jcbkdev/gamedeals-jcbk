import { useRef, useState } from "react";
import "./style.css";
import { platform } from "../gameCard/gameCard";

type props = {
  options: { name: platform; value: string }[];
  setter: React.Dispatch<React.SetStateAction<any>>;
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
      props.setter("all");
      const allCheckedInputs = props.options
        .map((option) => {
          const element = document.getElementById(
            option.name
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
            option.name
          ) as HTMLInputElement;
          if (element) {
            element.checked = false;
            return element;
          }
          return null;
        })
        .filter(Boolean) as HTMLInputElement[];

      setCheckedBoxes([]);
      props.setter(null);
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
      props.setter(null);
    } else if (tempArray.length === props.options.length) {
      setIsAll(true);
      props.setter("all");
      if (ref.current) {
        setIndeterminate(false);
        ref.current.checked = true;
      }
    } else if (tempArray.length < props.options.length) {
      const setterArray: platform[] = [];
      for (let i = 0; i < tempArray.length; i++) {
        const element = tempArray[i];
        if (!element.checked) continue;

        setterArray.push(element.id as platform);
      }

      props.setter(setterArray);

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
      {props.options.map((option) => (
        <span className="multiselectlist-option">
          <input
            className="multiselectlist-checkbox"
            onClick={handleCheck}
            type="checkbox"
            name={option.name}
            id={option.name}
          />
          <label>{option.value}</label>
        </span>
      ))}
    </div>
  );
}
