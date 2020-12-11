import React, { Component } from "react";

class Jots extends Component {
  onPageClick = () => {
    if (this.props.nav.isNavBarOpen || this.props.nav.isDropDownOpen)
      this.props.closeMenu();
  };

  onJotTextChange = (e) => {
    this.props.onTextChange(e, this.props.jot.id);
  };

  onJotScroll = (e) => {
    this.props.onTextScroll(e);
  };

  onJotTextKeyDown = (e) => {
    this.props.onTextKeyDown(e, this.props.jot.id);
  };

  render() {
    const pageTextClassName = this.props.isDefaultTheme
      ? "page-text-light"
      : "page-text-dark";

    const pageResultsClassName = this.props.isDefaultTheme
      ? "page-results-light"
      : "page-results-dark";

    return (
      <div
        id={`jot-${this.props.jot.id}`}
        className="jots-page"
        onClick={this.onPageClick}
      >
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
                id={`syllables-result-${this.props.jot.id}`}
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
              this.props.isDefaultTheme
                ? "page-light col px-3"
                : "page-dark col px-3"
            }
          >
            <textarea
              autoFocus
              id={`page-text-${this.props.jot.id}`}
              placeholder="Jot away..."
              className={pageTextClassName}
              onChange={this.onJotTextChange}
              onScroll={this.onJotScroll}
              onKeyDown={this.onJotTextKeyDown}
              value={this.props.jot.text ? this.props.jot.text : ""}
            />
          </div>

          {this.props.options.lines ? (
            <div className="col-2 px-0">
              <textarea
                id={`lines-result-${this.props.jot.id}`}
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
