import "./style.css";
import GameCard from "../../components/gameCard/gameCard";
import GameCardSkeleton from "../../components/gameCard/skeleton";
import { useEffect, useState } from "react";
import { deal, getDeals } from "../../api/gamerpower";

export default function Deals() {
  const [deals, setDeals] = useState<deal[]>();

  useEffect(() => {
    getDeals().then((deals: deal[]) => {
      setDeals(deals);
    });
  }, []);

  return (
    <section className="deals">
      <h2 className="deals-title">Currently Available Free Games</h2>
      <div className="deals-container">
        {deals ? (
          deals.map((deal) => (
            <GameCard
              key={deal.id}
              gameTitle={deal.title}
              backgroundUrl={deal.image}
              dealUrl={deal.open_giveaway_url}
              endDate={deal.end_date}
              tags={deal.tags}
            />
          ))
        ) : (
          <>
            <GameCardSkeleton />
            <GameCardSkeleton />
            <GameCardSkeleton />
            <GameCardSkeleton />
          </>
        )}
      </div>
    </section>
  );
}
