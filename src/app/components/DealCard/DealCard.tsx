import { Game } from "@/types/game.type";
import styles from "./style.module.css";
import Timer from "../Timer/Timer";
import Tag from "../Tag/Tag";

type props = {
  deal: Game;
};

export default function DealCard(props: props) {
  return (
    <a href={props.deal.url} target="_blank" rel="noopener noreferrer">
      <div className={styles.dealCard} main-platform={props.deal.main_platform}>
        <div className={styles.dealImageContainer}>
          <img src={`data:image/jpeg;base64,${props.deal.images[0]}`} alt="" />
          <div className={styles.dealImageGradient}></div>
        </div>
        <div className={styles.dealDetails}>
          <div className={styles.dealTitleContainer}>
            <h3>{props.deal.name}</h3>
          </div>
          <div className={styles.dealInfo}>
            <span>
              <Timer date={props.deal.end_date} />
            </span>
            <span className={styles.dealTagContainer}>
              {props.deal.platforms.map((t) => (
                <Tag
                  mainPlatform={(
                    props.deal.main_platform.toLowerCase().replace(" ", "") ===
                    t.toLowerCase().replace(" ", "")
                  ).toString()}
                >
                  {t}
                </Tag>
              ))}
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}
