import React, { useState } from "react";
import "./jots.css";

const Jots = (props) => {
  const [isCtrlActive, setIsCtrlActive] = useState(false);
  const { options, jot, nav } = props;

  const onPageClick = () => {
    if (nav.isNavBarOpen || nav.isDropDownOpen) props.closeMenu();
  };

  const onJotTextChange = (e) => {
    props.onTextChange(e, jot.id);
  };

  const onJotScroll = (e) => {
    props.onTextScroll(e);
  };

  const onJotTextKeyDown = (e) => {
    const event = e;
    const code = event.keyCode || event.charCode;

    if (code === 17) setIsCtrlActive(true);
    else if (isCtrlActive) {
      if (code === 37) {
        props.prevJot();
      } else if (code === 39) {
        props.nextJot();
      }
      setIsCtrlActive(false);
    } else {
      props.onTextKeyDown(event, jot.id);
      setIsCtrlActive(false);
    }
  };

  const jotHeadBodyClass = "row justify-content-center";
  const sideColClass = "col-2 px-0";
  const centerColClass = "col px-md-5";

  return (
    <div onClick={onPageClick} className="jot-container">
      <div id="jot-header" className={jotHeadBodyClass}>
        {options.syllables ? (
          <div className={sideColClass}>
            <p className="text-right">
              <small>Syll.</small>
            </p>
          </div>
        ) : null}

        <div className={centerColClass}>
          <p className="text-left">
            <small>{`Jot`}</small>
          </p>
        </div>

        {options.lines ? (
          <div className={sideColClass}>
            <p className="text-left">
              <small>Line</small>
            </p>
          </div>
        ) : null}
      </div>

      <div id="jot-body" className={jotHeadBodyClass}>
        {options.syllables ? (
          <div className={sideColClass}>
            <textarea
              id="textarea-syllables"
              className={"any-textarea text-right"}
              value={
                jot.results.syllableResults ? jot.results.syllableResults : ""
              }
              readOnly
            />
          </div>
        ) : null}

        <div className={`${centerColClass} text-container`}>
          <textarea
            autoFocus
            id={`textarea-jot`}
            placeholder="Jot away..."
            className={`any-textarea center-textarea`}
            onChange={onJotTextChange}
            onScroll={onJotScroll}
            onKeyDown={onJotTextKeyDown}
            value={jot.text ? jot.text : ""}
          />
        </div>

        {options.lines ? (
          <div className={sideColClass}>
            <textarea
              id="textarea-lines"
              className={"any-textarea text-left"}
              value={jot.results.lineResults ? jot.results.lineResults : ""}
              readOnly
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Jots;
