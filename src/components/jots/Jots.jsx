import React from "react";
import "./jots.css";

const Jots = (props) => {
  const { isDefaultTheme, options, jot, nav } = props;

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
    props.onTextKeyDown(e, jot.id);
  };

  const jotHeadBodyClass = "row justify-content-center";
  const sideColClass = "col-2 px-0";
  const centerColClass = "col px-md-5";

  return (
    <div onClick={onPageClick} className="jot-container">
      <div id="jot-header" className={jotHeadBodyClass}>
        {options.syllables ? (
          <div className={sideColClass}>
            <p className="text-right">Syll.</p>
          </div>
        ) : null}

        <div className={centerColClass}>
          <p className="">Jots</p>
        </div>

        {options.lines ? (
          <div className={sideColClass}>
            <p className="text-left">Line</p>
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
            className={"any-textarea"}
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
