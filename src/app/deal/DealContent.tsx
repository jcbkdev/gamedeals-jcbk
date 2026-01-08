import { useEffect, useState } from "react";
import Button from "../components/Button/Button";
import Tag from "../components/Tag/Tag";
import Timer from "../components/Timer/Timer";
import styles from "./styles.module.css";
import { Game } from "@/types/game.type";
import { useSearchParams } from "next/navigation";
import { isUrl } from "@/utils/isurl";
import DealCard from "../components/DealCard/DealCard";

export default function DealContent() {
  const params = useSearchParams();
  const dealId = params.get("id");

  const [deal, setDeal] = useState<Game | null>(null);
  const [deals, setDeals] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [imgSrc, setImageSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchDeal = async () => {
      if (!dealId) {
        setLoading(false);
        return;
      }
      const res = await fetch(
        process.env.NEXT_PUBLIC_SERVER_URL! + "/api/deal",
        {
          headers: {
            "x-id": dealId,
          },
          cache: "reload",
        }
      );

      if (res.status !== 200) {
        setLoading(false);
        return;
      }

      const deal = await res.json();

      setDeal(deal);
      setLoading(false);
    };

    fetchDeal();
  }, []);

  useEffect(() => {
    if (!deal) return;
    if (deal.images[0]) {
      console.log("isurl:", isUrl(deal.images[0]));
      if (isUrl(deal.images[0])) {
        setImageSrc(deal.images[0]);
      } else {
        setImageSrc(`data:image/jpeg;base64,${deal.images[0]}`);
      }
    } else {
      setImageSrc("/image_missing.png");
    }

    return () => {
      setImageSrc("");
    };
  }, [deal]);

  useEffect(() => {
    if (!deal) return;
    const fetchDeals = async () => {
      const res = await fetch(process.env.NEXT_PUBLIC_DEALS_URI!, {
        cache: "reload",
      });

      if (res.status !== 200) return;

      const deals = (await res.json()) as Game[];

      const filteredDeals = deals.filter(
        (deal) => !(deal.id === Number(dealId))
      );

      setDeals(filteredDeals);
    };
    fetchDeals();
  }, [deal]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!deal) {
    return <p>No deal</p>;
  }

  return (
    <>
      <main className={styles.dealContainer}>
        <img className={styles.dealImage} src={imgSrc} alt="" />
        <div className={styles.dealWrapper}>
          <div className={styles.dealDetails}>
            <h1 className={styles.dealTitle}>{deal.name}</h1>
            <p className={styles.dealDescription}>{deal.description}</p>
            <div className={styles.dealTags}>
              {deal.tags.map((tag, index) => (
                <Tag key={index}>{tag}</Tag>
              ))}
            </div>
          </div>
          <div className={styles.dealControls}>
            <a
              className={styles.button}
              href={deal.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button>Get the game</Button>
            </a>
            <div className={styles.dealInfo}>
              <p>
                {deal.platforms.find(
                  (p) =>
                    p.toLowerCase().replace(" ", "") ===
                    deal.main_platform.toLowerCase().replace(" ", "")
                )}
              </p>
              <Timer date={deal.end_date} />
            </div>
          </div>
        </div>
      </main>
      {deals.length > 0 && (
        <div className={styles.other}>
          <h2 className={styles.otherTitle}>Other games</h2>
          <div className={styles.otherWrapper}>
            {deals.map((deal) => (
              <a key={deal.id} href={"/deal?id=" + deal.id}>
                <DealCard deal={deal} />
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
