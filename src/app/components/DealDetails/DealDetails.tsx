"use client";

import styles from "./style.module.css";
import { Game } from "@/types/game.type";
import Popup from "../Popup/Popup";
import { useSearchParams } from "next/navigation";
import { ReactNode } from "react";
import Button from "../Button/Button";
import Tag from "../Tag/Tag";
import { isUrl } from "@/utils/isurl";

type Props = {
  deal: Game;
  children: ReactNode;
};

export default function DealDetails(props: Props) {
  const params = useSearchParams();
  const dealId = params.get("deal");

  const isOpen = dealId === props.deal.id.toString();

  const coverImage64 = props.deal.images[1] ?? props.deal.images[0];

  let imageUrl = isUrl(coverImage64)
    ? coverImage64
    : `data:image/jpeg;base64,${coverImage64}`;

  const handleOpen = () => {
    history.replaceState(null, "", `/?deal=${props.deal.id}`);
  };

  const handleClose = () => {
    history.replaceState(null, "", "/");
  };

  return (
    <Popup
      open={isOpen}
      triggerElement={<div>{props.children}</div>}
      onOpen={handleOpen}
      onClose={handleClose}
    >
      <div className={styles.dealDetails}>
        <div className={styles.cover}>
          <img src={imageUrl} alt="" />
        </div>
        <div className={styles.details}>
          <h1 className={styles.title}>{props.deal.name}</h1>
          <h2 className={styles.description}>{props.deal.description}</h2>
          {props.deal.tags.length > 0 && (
            <div>
              <h3 className={styles.tagsTitle}>Tags:</h3>
              <div className={styles.tags}>
                {props.deal.tags.map((t, index) => (
                  <Tag key={index}>{t}</Tag>
                ))}
              </div>
            </div>
          )}
          <a
            className={styles.button}
            href={props.deal.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button>Get the game</Button>
          </a>
        </div>
      </div>
    </Popup>
  );
}
