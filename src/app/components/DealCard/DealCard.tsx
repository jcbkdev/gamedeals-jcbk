import { Game } from "@/types/game.type";
import styles from "./style.module.css";
import Timer from "../Timer/Timer";
import Tag from "../Tag/Tag";
import DealDetails from "../DealDetails/DealDetails";
import { useEffect, useState } from "react";
import { isUrl } from "@/utils/isurl";

type props = {
  deal: Game;
};

export default function DealCard(props: props) {
  const [imgSrc, setImageSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    console.log(`${props.deal.name}:`, props.deal.images);
    if (props.deal.images[0]) {
      console.log("isurl:", isUrl(props.deal.images[0]));
      if (isUrl(props.deal.images[0])) {
        setImageSrc(props.deal.images[0]);
      } else {
        setImageSrc(`data:image/jpeg;base64,${props.deal.images[0]}`);
      }
    } else {
      setImageSrc("/image_missing.png");
    }

    return () => {
      setImageSrc("");
    };
  }, []);

  return (
    <div className={styles.dealCard} main-platform={props.deal.main_platform}>
      <img src={imgSrc} alt="" />
      <div>
        <h3 className={styles.dealGame}>{props.deal.name}</h3>
        <div className={styles.dealInfo}>
          <p>
            {props.deal.platforms.find(
              (p) =>
                p.toLowerCase().replace(" ", "") ===
                props.deal.main_platform.toLowerCase().replace(" ", "")
            )}
          </p>
          <Timer date={props.deal.end_date} />
        </div>
      </div>
    </div>
  );
}
