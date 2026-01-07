"use client";

import styles from "./styles.module.css";
import DealCard from "@/app/components/DealCard/DealCard";
import DealDetails from "@/app/components/DealDetails/DealDetails";
import FilterBar from "@/app/components/FilterBar/FilterBar";
import { CategoryContext } from "@/app/contexts/CategoryContext";
import { Game } from "@/types/game.type";
import { useEffect, useState } from "react";

export default function Deals() {
  const [category, setCategory] = useState("category-all");
  const [deals, setDeals] = useState<Game[] | null>(null);
  const [filteredDeals, setFilteredDeals] = useState<Game[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_DEALS_URI!);
        if (res.status === 200) {
          const data = (await res.json()) as Game[];
          // const extendedData = extendArray(data, 10);
          const filteredData = data.sort(
            (a, b) => Date.parse(a.end_date) - Date.parse(b.end_date)
          );

          setDeals(filteredData);
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

  useEffect(() => {
    if (category === "category-all") {
      setFilter("");
    } else {
      setFilter(category.replace("category-", ""));
    }
  }, [category]);

  useEffect(() => {
    if (deals) {
      let filtered;
      if (filter === "") {
        filtered = deals;
      } else {
        filtered = deals.filter(
          (deal) => deal.main_platform.toLowerCase().replace(" ", "") == filter
        );
      }

      setFilteredDeals(filtered);
    }
  }, [deals, filter]);

  if (loading) return <p>Loading deals...</p>;
  if (error) return <p>No deals could get fetched</p>;

  return (
    <section className={styles.dealsSection}>
      <CategoryContext.Provider value={{ category, setCategory }}>
        <FilterBar
          title="Free Games To Collect"
          categories={["Steam", "Epic Games", "GOG"]}
        />
      </CategoryContext.Provider>
      <div className={styles.dealsContainer}>
        {filteredDeals && filteredDeals.length >= 1 ? (
          filteredDeals.map((d) => (
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
