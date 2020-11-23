import React, { Component } from "react";
import "./page.css";
import { countSyllablesInWord } from "../../services/pageService";

class Page extends Component {
  state = {
    text: "",
    lines: [],
    counts: {
      wordCount: 0,
      lineCount: 0,
      syllableCount: 0,
    },
    results: {
      syllableResults: "",
      lineResults: "",
    },
  };

  componentDidUpdate(prevProps) {
    if (prevProps.wasTextCleared !== this.props.wasTextCleared) {
      console.log("resetting");
      this.resetState();
    }
  }

  onTextChange = (e) => {
    const event = e;
    const { value } = event.target;

    if (value === "") this.resetState();
    else {
      this.findCounts(value);
    }
  };

  onTextKeyDown = (e) => {
    const event = e;
    const code = event.keyCode || event.charCode;

    if (code === 8 || code === 46) {
      const text = event.target.value;
      this.findCounts(text);
    }
  };

  onTextScroll = (e) => {
    const target = e.target;
    const { scrollTop } = target;

    if (this.props.showLines) {
      let linesResult = document.getElementById("lines-result");
      linesResult.scrollTop = scrollTop;
    }

    if (this.props.showSyllables) {
      let syllablesResult = document.getElementById("syllables-result");
      syllablesResult.scrollTop = scrollTop;
    }
  };

  findCounts = (text) => {
    // const { text } = this.state;
    if (!text) return;

    const textArr = text.split(`\n`); // array of lines

    let lineCount = 0;
    let wordCount = 0;
    let syllableCount = 0;
    let lines = [];

    for (let i = 0; i < textArr.length; i++) {
      const singleLine = textArr[i];
      // working with words
      lineCount++;

      let wordsInLine = 0;
      let syllablesInLine = 0;

      if (singleLine !== "") {
        const singleLineArray = singleLine.split(" "); // array of words
        for (const word of singleLineArray) {
          if (word !== "") {
            wordCount++;
            wordsInLine++;
            const syllablesInWord = countSyllablesInWord(word);
            syllableCount += syllablesInWord;
            syllablesInLine += syllablesInWord;
          }
        }
      }

      lines.push({
        id: i + 1,
        syllables: syllablesInLine,
        words: wordsInLine,
      });
    }

    const counts = {
      wordCount,
      lineCount,
      syllableCount,
    };

    const results = this.findResults(lines);
    this.setCounts(text, counts, lines, results);
  };

  findResults = (lines) => {
    /**
     * lines: {
     *    id: number,
     *    syllables: number,
     *    words: number,
     * }
     */

    let syllableResults = "";
    let lineResults = "";

    for (const line in lines) {
      if (!lines[line].words) syllableResults += `\n`;
      else syllableResults += `${lines[line].syllables}\n`;

      if ([line] < 9) lineResults += `0${lines[line].id}\n`;
      else lineResults += `${lines[line].id}\n`;
    }

    const results = { syllableResults, lineResults };

    return results;
  };

  setText = (text) => {
    this.setState((prevState) => ({ ...prevState, text }));
  };

  setCounts = (text, counts, lines, results) => {
    this.setState((prevState) => ({
      ...prevState,
      text,
      counts,
      lines,
      results,
    }));
  };

  resetState = () => {
    const text = "";
    const lines = [];
    const counts = {
      wordCount: 0,
      lineCount: 0,
      syllableCount: 0,
    };
    const results = {
      syllablesResult: "",
      linesResult: "",
    };

    this.setState((prevState) => ({
      ...prevState,
      text,
      lines,
      counts,
      results,
    }));
  };

  render() {
    const { isDefaultTheme } = this.props;

    const pageClassName = isDefaultTheme ? "page-light" : "page-dark";

    const pageTextClassName = isDefaultTheme
      ? "page-text-light"
      : "page-text-dark";

    const pageResultsClassName = isDefaultTheme
      ? "page-results-light"
      : "page-results-dark";

    const pageInputClassName = isDefaultTheme
      ? "page-msg-light"
      : "page-msg-dark";

    const pageMsg = `${this.state.counts.wordCount} words`;

    return (
      <>
        {this.props.showCopyAlert ? (
          <div className="row justify-content-center">
            <div
              className="col-md-6 alert alert-success text-center"
              role="alert"
            >
              Copied!
            </div>
          </div>
        ) : null}
        <div className="row justify-content-center">
          {this.props.showSyllables ? (
            <div className="col-2 px-0">
              <p className="page-text-muted text-right">Syll.</p>
            </div>
          ) : null}

          <div className="col px-md-3">
            <p className="page-text-muted">Text</p>
          </div>
          {this.props.showLines ? (
            <div className="col-2 px-0">
              <p className="page-text-muted text-left">Line</p>
            </div>
          ) : null}
        </div>
        <div className="row justify-content-center">
          {this.props.showSyllables ? (
            <div className="col-2 px-0">
              <textarea
                id="syllables-result"
                className={pageResultsClassName + " text-right"}
                value={
                  this.state.results.syllableResults
                    ? this.state.results.syllableResults
                    : ""
                }
                readOnly
              />
            </div>
          ) : null}

          <div className={"col px-md-3 " + pageClassName}>
            <textarea
              autoFocus
              id="page-text"
              className={pageTextClassName}
              onChange={this.onTextChange}
              onScroll={this.onTextScroll}
              onKeyDown={this.onTextKeyDown}
              value={this.state.text ? this.state.text : ""}
            />
          </div>
          {this.props.showLines ? (
            <div className="col-2 px-0">
              <textarea
                id="lines-result"
                className={pageResultsClassName + " text-left"}
                value={
                  this.state.results.lineResults
                    ? this.state.results.lineResults
                    : ""
                }
                readOnly
              />
            </div>
          ) : null}
        </div>
        <div className="row justify-content-center py-0">
          <input
            className={pageInputClassName}
            type="text"
            value={pageMsg}
            readOnly
          />
        </div>
      </>
    );
  }
}

export default Page;
