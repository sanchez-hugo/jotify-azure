import React from "react";
import "./footer.css";

const Footer = (props) => {
  return (
    <footer className="fixed">
      <input
        className={props.isDefaultTheme ? "msg-light" : "msg-dark"}
        type="text"
        value={`${props.counts.wordCount} words`}
        readOnly
      />
    </footer>
  );
};

export default Footer;
