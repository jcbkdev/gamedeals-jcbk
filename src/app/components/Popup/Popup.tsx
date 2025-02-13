"use client";

import styles from "./style.module.css";
import React, { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  triggerElement: ReactNode;
  children: ReactNode;
};

export default function Popup(props: Props) {
  const [isOpen, setOpen] = useState<boolean>(false);

  const setScroll = (state: boolean) => {
    state
      ? (document.documentElement.style.overflow = "unset")
      : (document.documentElement.style.overflow = "hidden");
  };

  const handleTriggerClick = () => {
    setOpen(true);
    setScroll(false);
  };

  const handleCloseClick = () => {
    setOpen(false);
    setScroll(true);
  };

  const triggerClone = React.cloneElement(
    props.triggerElement as React.ReactElement<any>,
    {
      onClick: handleTriggerClick,
    }
  );

  return (
    <>
      <>{triggerClone}</>
      {isOpen &&
        createPortal(
          <div className={styles.popupContainer}>
            <div className={styles.popupWrapper}>
              <button
                onClick={handleCloseClick}
                className={styles.popupCloseButton}
              >
                <img src="/x-icon.svg" alt="" />
              </button>
              <div>{props.children}</div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
