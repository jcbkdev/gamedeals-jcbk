import { MouseEvent, useContext, useEffect, useState } from "react";
import styles from "./style.module.css";
import { CategoryContext } from "@/app/contexts/CategoryContext";

type Props = {
  title: string;
  categories: string[];
};

export default function FilterBar(props: Props) {
  const { category, setCategory } = useContext(CategoryContext);
  const [selected, setSelected] = useState(category);

  const handleClick = (e: MouseEvent) => {
    setSelected(e.currentTarget.id);
    setCategory(e.currentTarget.id);
  };

  return (
    <div className={styles.filterBar}>
      <h2>{props.title}</h2>
      <div className={styles.categories}>
        <button
          id="category-all"
          data-selected={selected === "category-all" || undefined}
          onClick={handleClick}
        >
          All
        </button>
        {props.categories.map((category) => {
          const id = "category-" + category.toLowerCase().replace(" ", "");

          return (
            <button
              key={category}
              id={id}
              data-selected={selected === id || undefined}
              onClick={handleClick}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
