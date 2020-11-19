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
    syllableResults: "",
  };

  onTextChange = (e) => {
    const event = e;
    const { value } = event.target;

    if (value === "") this.resetState();
    else this.setText(value);
  };

  onTextKeyPress = () => {
    this.findCounts();
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
          word.trim();
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

    const syllableResults = this.findSyllableResults(lines);
    this.setCounts(counts, lines, syllableResults);
  };

  findSyllableResults = (lines) => {
    /**
     * lines: {
     *    id: number,
     *    syllables: number,
     *    words: number,
     * }
     */

    let results = "";
    for (const line in lines) {
      results += `${lines[line].syllables}\n`;
    }
    return results;
  };

  setText = (text) => {
    this.setState((prevState) => ({ ...prevState, text }));
  };

  setCounts = (counts, lines, syllableResults) => {
    this.setState((prevState) => ({
      ...prevState,
      counts,
      lines,
      syllableResults,
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
    const syllableResults = "";

    this.setState((prevState) => ({
      ...prevState,
      text,
      lines,
      counts,
      syllableResults,
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

    const pageInputClassName = isDefaultTheme
      ? "page-msg-light"
      : "page-msg-dark";

    const pageMsg = `${this.state.counts.wordCount} words`;

    return (
      <div className="">
        <div className="container-fluid pt-5">
          <div className="row justify-content-center">
            <div className={pageClassName}>
              <textarea
                autoFocus
                id="page-text"
                className={pageTextClassName}
                onChange={this.onTextChange}
                onKeyPress={this.onTextKeyPress}
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
                className={pageTextClassName}
                onChange={this.onTextChange}
                onKeyPress={this.onTextKeyPress}
                value={this.state.syllableResults}
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
