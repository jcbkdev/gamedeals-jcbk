import { useEffect, useState } from "react";
import styles from "./style.module.css";
import { SteamSaleGame } from "@/types/steamsalegame.type";
import Timer from "../Timer/Timer";

type Props = {
  sale: SteamSaleGame;
};

export default function SaleCard({ sale }: Props) {
  const [imgSrc, setImageSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    setImageSrc(`data:image/jpeg;base64,${sale.image}`);
    return () => {
      setImageSrc("");
    };
  }, []);

  return (
    <div className={styles.saleCard}>
      <div
        className={styles.saleCardImage}
        style={{
          backgroundImage: imgSrc ? `url(${imgSrc})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className={styles.salePercent}>-{sale.discount_percent}%</div>
      </div>
      <div>
        <h3 className={styles.saleGame}>{sale.name}</h3>
        <div className={styles.saleInfo}>
          <p>Steam</p>
          <Timer date={sale.discount_expiration} />
        </div>
      </div>
    </div>
  );
}
