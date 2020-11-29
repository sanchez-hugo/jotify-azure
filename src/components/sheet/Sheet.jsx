import React, { Component } from "react";
import NavBar from "../layout/NavBar";
import Jots from "../jots/Jots";
import "./sheet.css";
import { countSyllablesInWord } from "../../services/pageService";
import Footer from "../layout/Footer";
// import PropTypes from "prop-types";

class Sheet extends Component {
  state = {
    isDefaultTheme: true,
    nav: {
      isNavBarOpen: false,
      isDropDownOpen: false,
    },
    options: {
      lines: false,
      syllables: false,
      words: false,
      copied: false,
    },
    jot: {
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
    },
  };

  //#region Toggles

  setIsDefaultTheme = () => {
    const isDefaultTheme = !this.state.isDefaultTheme;
    this.setState((prevState) => ({ ...prevState, isDefaultTheme }));
  };

  toggleLinesOption = () => {
    const lines = !this.state.options.lines;
    this.setState((prevState) => ({
      ...prevState,
      options: { ...prevState.options, lines },
    }));
  };

  toggleSyllablesOption = () => {
    const syllables = !this.state.options.syllables;
    this.setState((prevState) => ({
      ...prevState,
      options: { ...prevState.options, syllables },
    }));
  };

  toggleWordsOption = () => {
    const words = !this.state.options.words;
    this.setState((prevState) => ({
      ...prevState,
      options: { ...prevState.options, words },
    }));
  };

  toggleCopiedOption = () => {
    const copied = !this.state.options.copied;
    this.setState(
      (prevState) => ({
        ...prevState,
        options: { ...prevState.options, copied },
      }),
      () => {
        if (this.state.options.copied)
          setTimeout(this.toggleCopiedOption, 2000);
      }
    );
  };

  toggleNavBar = () => {
    const isNavBarOpen = !this.state.nav.isNavBarOpen;
    this.setState((prevState) => ({
      ...prevState,
      nav: { ...prevState.nav, isNavBarOpen },
    }));
  };

  toggleDropDown = () => {
    const isDropDownOpen = !this.state.nav.isDropDownOpen;
    this.setState((prevState) => ({
      ...prevState,
      nav: { ...prevState.nav, isDropDownOpen },
    }));
  };

  resetNav = () => {
    const nav = { isNavBarOpen: false, isDropDownOpen: false };
    this.setState((prevState) => ({
      ...prevState,
      nav,
    }));
  };

  //#endregion

  //#region Jots Stuff
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

    if (this.state.options.lines) {
      let linesResult = document.getElementById("lines-result");
      linesResult.scrollTop = scrollTop;
    }

    if (this.state.options.syllables) {
      let syllablesResult = document.getElementById("syllables-result");
      syllablesResult.scrollTop = scrollTop;
    }
  };

  onTextClear = () => {
    this.resetState();
    const pageText = document.getElementById("page-text");
    pageText.focus();
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

    const jot = { text, counts, lines, results };
    this.setJot(jot);
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

  setJot = (jot) => {
    this.setState((prevState) => ({
      ...prevState,
      jot,
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

    const jot = { text, counts, lines, results };

    this.setState((prevState) => ({
      ...prevState,
      jot,
    }));
  };

  //#endregion

  //#region
  //#endregion

  render() {
    return (
      <div
        className={
          this.state.isDefaultTheme
            ? "container-fluid app-light"
            : "container-fluid app-dark"
        }
      >
        <NavBar
          isDefaultTheme={this.state.isDefaultTheme}
          options={this.state.options}
          nav={this.state.nav}
          toggleBackground={this.setIsDefaultTheme}
          toggleSyllables={this.toggleSyllablesOption}
          toggleLines={this.toggleLinesOption}
          toggleWords={this.toggleWordsOption}
          toggleCopied={this.toggleCopiedOption}
          toggleNavBar={this.toggleNavBar}
          toggleDropDown={this.toggleDropDown}
          onTextClear={this.onTextClear}
          closeMenu={this.resetNav}
        />

        <Jots
          isDefaultTheme={this.state.isDefaultTheme}
          jot={this.state.jot}
          nav={this.state.nav}
          options={this.state.options}
          onTextChange={this.onTextChange}
          onTextScroll={this.onTextScroll}
          onTextKeyDown={this.onTextKeyDown}
          closeMenu={this.resetNav}
        />
        {this.state.options.words ? (
          <Footer
            isDefaultTheme={this.state.isDefaultTheme}
            jot={this.state.jot}
            options={this.state.options}
          />
        ) : null}
      </div>
    );
  }
}

// Sheet.propTypes = {};

export default Sheet;
