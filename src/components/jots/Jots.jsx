import React, { Component } from "react";
import "./jots.css";

class Jots extends Component {
  onPageClick = () => {
    if (this.props.nav.isNavBarOpen || this.props.nav.isDropDownOpen)
      this.props.closeMenu();
  };

  render() {
    const { isDefaultTheme } = this.props;

    const pageTextClassName = isDefaultTheme
      ? "page-text-light"
      : "page-text-dark";

    const pageResultsClassName = isDefaultTheme
      ? "page-results-light"
      : "page-results-dark";

    return (
      <div className="jots-page" onClick={this.onPageClick}>
        {this.props.options.copied ? (
          <div className="row justify-content-center">
            <div
              className="col-md-6 alert alert-success text-center"
              role="alert"
            >
              {this.props.jot.text ? "Copied!" : "Nothing to copy!"}
            </div>
          </div>
        ) : null}

        <div className="row justify-content-center jot-title">
          {this.props.options.syllables ? (
            <div className="col-2 px-0">
              <p className="jot-title-text text-right">Syll.</p>
            </div>
          ) : null}

          <div className="col px-3">
            <p className="jot-title-text">Jots</p>
          </div>
          {this.props.options.lines ? (
            <div className="col-2 px-0">
              <p className="jot-title-text text-left">Line</p>
            </div>
          ) : null}
        </div>

        <div className="row justify-content-center jot-content">
          {this.props.options.syllables ? (
            <div className="col-2 px-0">
              <textarea
                id="syllables-result"
                className={pageResultsClassName + " text-right"}
                value={
                  this.props.jot.results.syllableResults
                    ? this.props.jot.results.syllableResults
                    : ""
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
              id="page-text"
              className={pageTextClassName}
              onChange={this.props.onTextChange}
              onScroll={this.props.onTextScroll}
              onKeyDown={this.props.onTextKeyDown}
              value={this.props.jot.text ? this.props.jot.text : ""}
            />
          </div>

          {this.props.options.lines ? (
            <div className="col-2 px-0">
              <textarea
                id="lines-result"
                className={pageResultsClassName + " text-left"}
                value={
                  this.props.jot.results.lineResults
                    ? this.props.jot.results.lineResults
                    : ""
                }
                readOnly
              />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Jots;
