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

  onTextChange = (e) => {
    const event = e;
    const { value } = event.target;

    if (value === "") this.resetState();
    else {
      this.setText(value);
      this.findCounts();
    }
  };

  onTextKeyPress = () => {
    this.findCounts();
  };

  onTextScroll = (e) => {
    const target = e.target;
    const { scrollTop } = target;
    /**
     * scrollTop: 905
     * scrollLeft: 0
     * scrollTop: 170
     * scrollWidth: 869
     */
    let linesResult = document.getElementById("lines-result");
    let syllablesResult = document.getElementById("syllables-result");
    linesResult.scrollTop = scrollTop;
    syllablesResult.scrollTop = scrollTop;
  };

  findCounts = () => {
    const { text } = this.state;
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
    this.setCounts(counts, lines, results);
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
      syllableResults += `${lines[line].syllables}\n`;
      lineResults += `${lines[line].id}\n`;
    }

    const results = { syllableResults, lineResults };

    return results;
  };

  setText = (text) => {
    this.setState((prevState) => ({ ...prevState, text }));
  };

  setCounts = (counts, lines, results) => {
    this.setState((prevState) => ({
      ...prevState,
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

    const pageClassName = isDefaultTheme
      ? "col-md-8 page-light"
      : "col-md-8 page-dark";

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
      <div className="">
        <div className="container-fluid pt-5">
          <div className="row justify-content-center">
            <div className="col-md-1">
              <p className="page-text-muted">Line</p>
            </div>
            <div className="col-md-8">
              <p className="page-text-muted">Text</p>
            </div>
            <div className="col-md-1">
              <p className="page-text-muted">Syllables</p>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-1">
              <textarea
                id="lines-result"
                className={pageResultsClassName}
                value={this.state.results.lineResults}
                readOnly
              />
            </div>
            <div className={pageClassName}>
              <textarea
                autoFocus
                id="page-text"
                className={pageTextClassName}
                onChange={this.onTextChange}
                onScroll={this.onTextScroll}
              />
              <input
                className={pageInputClassName}
                type="text"
                value={pageMsg}
                readOnly
              />
            </div>
            <div className="col-md-1">
              <textarea
                id="syllables-result"
                className={pageResultsClassName}
                value={this.state.results.syllableResults}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Page;
