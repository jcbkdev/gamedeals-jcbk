"use client";

import styles from "./style.module.css";
import React, { ReactNode, useEffect, useState } from "react";
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
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const setScroll = (state: boolean) => {
      state
        ? (document.documentElement.style.overflow = "unset")
        : (document.documentElement.style.overflow = "hidden");
    };

    if (isOpen) {
      setScroll(false);
    } else {
      setScroll(true);
    }

    return () => setScroll(true);
  }, [isOpen]);

  const handleTriggerClick = () => {
    if (props.onOpen) {
      props.onOpen();
    }
    setOpen(true);
  };

  const handleCloseClick = () => {
    if (props.onClose) {
      props.onClose();
    }
    setOpen(false);
  };

  const triggerClone = props.triggerElement
    ? React.cloneElement(props.triggerElement as React.ReactElement<any>, {
        onClick: handleTriggerClick,
      })
    : null;

  if (!isMounted) {
    return triggerClone ?? <></>;
  }

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
