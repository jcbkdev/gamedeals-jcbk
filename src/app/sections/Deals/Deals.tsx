"use client";

import styles from "./styles.module.css";
import DealCard from "@/app/components/DealCard/DealCard";
import DealDetails from "@/app/components/DealDetails/DealDetails";
import { Game } from "@/types/game.type";
import { useEffect, useState } from "react";

export default function Deals() {
  const [deals, setDeals] = useState<Game[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_DEALS_URI!);
        if (res.status === 200) {
          const data = await res.json();
          setDeals(data);
        } else {
          console.log("wtf");
          setError(true);
        }
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  if (loading) return <p>Loading deals...</p>;
  if (error) return <p>No deals could get fetched</p>;

  return (
    <section className={styles.dealsSection}>
      <h2>Currently Available Free Games</h2>
      <div className={styles.dealsContainer}>
        {deals && deals.length >= 1 ? (
          deals.map((d) => (
            <div key={d.id}>
              <DealDetails deal={d}>
                <DealCard deal={d} />
              </DealDetails>
            </div>
          ))
        ) : (
          <p>No deals available</p>
        )}
      </div>
    </section>
  );
}
