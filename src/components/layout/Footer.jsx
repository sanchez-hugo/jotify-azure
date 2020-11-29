import React from "react";
import "./footer.css";

const Footer = (props) => {
  const pageInputClassName = props.isDefaultTheme ? "msg-light" : "msg-dark";

  return (
    <footer className="fixed">
      <input
        className={pageInputClassName}
        type="text"
        value={`${props.jot.counts.wordCount} words`}
        readOnly
      />
    </footer>
  );
};

export default Footer;
