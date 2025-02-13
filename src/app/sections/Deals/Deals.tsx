import styles from "./styles.module.css";
import DealCard from "@/app/components/DealCard/DealCard";
import { Game } from "@/types/game.type";

export default async function Deals() {
  const deals: Game[] | null = await fetch(process.env.DEALS_URI!).then(
    (res) => {
      if (res.status === 200) return res.json();
      else return null;
    }
  );

  return (
    <section className={styles.dealsSection}>
      <h2>Currently Available Free Games</h2>
      <div className={styles.dealsContainer}>
        {deals ? (
          deals.map((d) => <DealCard key={d.id} deal={d} />)
        ) : (
          <p>No deals could get fetched</p>
        )}
      </div>
    </section>
  );
}
