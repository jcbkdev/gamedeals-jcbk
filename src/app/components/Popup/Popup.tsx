"use client";

import styles from "./style.module.css";
import React, { ReactNode, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  triggerElement?: ReactNode;
  children: ReactNode;
  open?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
};

export default function Popup(props: Props) {
  const [isOpen, setOpen] = useState<boolean>(props.open ?? false);

  const setScroll = (state: boolean) => {
    state
      ? (document.documentElement.style.overflow = "unset")
      : (document.documentElement.style.overflow = "hidden");
  };

  const handleTriggerClick = () => {
    if (props.onOpen) {
      props.onOpen();
    }
    setOpen(true);
    setScroll(false);
  };

  const handleCloseClick = () => {
    if (props.onClose) {
      props.onClose();
    }
    setOpen(false);
    setScroll(true);
  };

  const triggerClone = props.triggerElement
    ? React.cloneElement(props.triggerElement as React.ReactElement<any>, {
        onClick: handleTriggerClick,
      })
    : null;

  return (
    <>
      <>{triggerClone ?? <></>}</>
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
