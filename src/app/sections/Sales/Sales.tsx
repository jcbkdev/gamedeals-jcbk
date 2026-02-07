"use client";

import Button from "@/app/components/Button/Button";
import styles from "./styles.module.css";
import SaleCard from "@/app/components/SaleCard/SaleCard";
import { SteamSaleGame } from "@/types/steamsalegame.type";
import { useEffect, useRef, useState } from "react";

export default function Sales() {
  const [sales, setSales] = useState<SteamSaleGame[]>([]);
  const [pag, setPag] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchDeals = async () => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_SALES_URI!, {
        headers: { "x-pag": String(pag) },
      });
      if (res.status === 200) {
        const data = (await res.json()) as {
          sales: SteamSaleGame[];
          hasMore: boolean;
        };
        const filteredData = data.sales.sort(
          (a, b) => b.discount_percent - a.discount_percent,
        );
        setSales((prev) => prev.concat(filteredData));
        setHasMore(data.hasMore);
        if (data.hasMore) setPag((pag) => ++pag);
      } else {
        setError(true);
      }
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  if (loading) return <p>Loading sales...</p>;
  if (error) return <p>Sales couldn't get fetched</p>;

  return (
    <section className={styles.salesSection}>
      <h2>Best Steam Sales</h2>
      <div className={styles.salesContainer}>
        {sales && sales.length >= 1 ? (
          sales.map((s) => (
            <div key={s.id}>
              <a href={s.url}>
                <SaleCard sale={s} />
              </a>
            </div>
          ))
        ) : (
          <p>No sales available</p>
        )}
      </div>
      <div className={styles.salesButtonContainer}>
        {hasMore && (
          <Button
            onClick={async (e) => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.disabled = true;
              await fetchDeals();
              btn.disabled = false;
            }}
          >
            Load more
          </Button>
        )}
      </div>
    </section>
  );
}
