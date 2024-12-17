import "./style.css";
import { cloneElement, useEffect, useState } from "react";
import Markdown from "react-markdown";

type props = {
  trigger: JSX.Element;
};

export default function PrivacyPolicy(props: props) {
  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    fetch("/privacypolicy.md")
      .then((response) => response.text())
      .then((data) => setMarkdownContent(data))
      .catch((error) => console.error("Error loading the file:", error));
  }, []);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const modifiedTrigger = cloneElement(props.trigger, {
    onClick: handleClick,
  });

  return (
    <>
      {modifiedTrigger}
      {isOpen ? (
        <div className="privacypolicy-container">
          <button onClick={handleClick} className="button">
            Return
          </button>
          <div className="privacypolicy-text">
            <Markdown>{markdownContent}</Markdown>
          </div>
          <a href="/privacypolicy.md">Privacy Policy file</a>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
