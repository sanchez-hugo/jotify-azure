import React from "react";
import "./footer.css";
import Pagination from "../Pagination";

const Footer = (props) => {
  if (props.options.words || props.jotCount > 1)
    return (
      <footer className="fixed">
        {props.options.words ? (
          <div className="row justify-content-center">
            <input
              className={`footer-text`}
              type="text"
              value={`${props.counts.wordCount} words`}
              readOnly
            />
          </div>
        ) : null}
        {props.jotCount > 1 ? (
          <div className="row justify-content-center">
            <Pagination
              pagination={props.pagination}
              nextJot={props.nextJot}
              prevJot={props.prevJot}
            />
          </div>
        ) : null}
      </footer>
    );
  else return null;
};

export default Footer;
