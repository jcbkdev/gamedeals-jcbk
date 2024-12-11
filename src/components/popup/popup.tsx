import "./style.css";
import { cloneElement, JSX, useEffect, useState } from "react";

type props = {
  trigger: JSX.Element;
  children: JSX.Element;
};

export default function Popup(props: props) {
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleTriggerClick = () => {
    setOpen(true);
  };

  const handleBackgroundClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) setOpen(false);
  };

  const modifiedTrigger = cloneElement(props.trigger, {
    onClick: handleTriggerClick,
  });

  return (
    <>
      {modifiedTrigger}
      {isOpen ? (
        <div className="popup-container" onClick={handleBackgroundClick}>
          {props.children}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
