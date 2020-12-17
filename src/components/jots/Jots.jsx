import React from "react";

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

  return (
    <div id={`jot-${jot.id}`} onClick={onPageClick}>
      <div className="row justify-content-center jot-title">
        {options.syllables ? (
          <div className="col-2 px-0">
            <p className="text-right">Syll.</p>
          </div>
        ) : null}

        <div className="col px-3">
          <p className="">Jots</p>
        </div>
        {options.lines ? (
          <div className="col-2 px-0">
            <p className="text-left">Line</p>
          </div>
        ) : null}
      </div>

      <div className="row justify-content-center">
        {options.syllables ? (
          <div className="col-2 px-0">
            <textarea
              id={`syllables-result-${jot.id}`}
              className={"any-textarea text-right"}
              value={
                jot.results.syllableResults ? jot.results.syllableResults : ""
              }
              readOnly
            />
          </div>
        ) : null}

        <div
          className={
            isDefaultTheme ? "page-light col px-3" : "page-dark col px-3"
          }
        >
          <textarea
            autoFocus
            id={`page-text-${jot.id}`}
            placeholder="Jot away..."
            className={"any-textarea"}
            onChange={onJotTextChange}
            onScroll={onJotScroll}
            onKeyDown={onJotTextKeyDown}
            value={jot.text ? jot.text : ""}
          />
        </div>

        {options.lines ? (
          <div className="col-2 px-0">
            <textarea
              id={`lines-result-${jot.id}`}
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
