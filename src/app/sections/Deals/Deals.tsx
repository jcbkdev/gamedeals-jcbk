import styles from "./styles.module.css";
import DealCard from "@/app/components/DealCard/DealCard";
import DealDetails from "@/app/components/DealDetails/DealDetails";
import { Game } from "@/types/game.type";
import { Suspense } from "react";

export default async function Deals() {
  const deals: Game[] | null = await fetch(
    process.env.NEXT_PUBLIC_DEALS_URI!
  ).then((res) => {
    if (res.status === 200) return res.json();
    else return null;
  });

  return (
    <section className={styles.dealsSection}>
      <h2>Currently Available Free Games</h2>
      <div className={styles.dealsContainer}>
        {deals ? (
          deals.length >= 1 ? (
            deals.map((d) => (
              <Suspense key={d.id} fallback={<DealCard deal={d} />}>
                <DealDetails deal={d}>
                  <DealCard deal={d} />
                </DealDetails>
              </Suspense>
            ))
          ) : (
            <p>No deals available</p>
          )
        ) : (
          <p>No deals could get fetched</p>
        )}
      </div>
    </section>
  );
}
