import React, { Component } from "react";
import NavBar from "../layout/NavBar";
import Alert from "../layout/Alert";
import Jots from "../jots/Jots";
import "./sheet.css";
import { countSyllablesInWord } from "../../services/pageService";
import Footer from "../layout/Footer";
import Pagination from "../layout/Pagination";
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
      cleared: false,
    },
    jots: [],
    // mappedJots: [],
    pagination: {
      currentJot: 0,
      totalJots: 0,
    },
  };

  componentDidMount() {
    // Create the first jot
    const id = this.getNewJotId();
    const jot = this.getEmptyJot(id);

    // Push to state
    const jots = [jot];
    this.setJots(jots);

    // const mappedJots = jots.map(this.mapJot);
    // this.setJotsAndMappedJots(jots, mappedJots);
  }

  componentWill;

  //#region Jot Management
  // mapJot = (jot) => {
  //   return (
  //     <Jots
  //       key={jot.id}
  //       isDefaultTheme={this.state.isDefaultTheme}
  //       jot={jot}
  //       nav={this.state.nav}
  //       options={this.state.options}
  //       onTextChange={this.onTextChange}
  //       onTextKeyDown={this.onTextKeyDown}
  //       onTextScroll={this.onTextScroll}
  //       closeMenu={this.resetNav}
  //     />
  //   );
  // };

  getEmptyJot = (id) => {
    if (!id) id = this.getNewJotId();

    const jot = {
      id,
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

    return jot;
  };

  getNewJotId = () => {
    const id = this.state.pagination.totalJots + 1;
    this.setTotalJots(id);
    return id;
  };

  getCurrentJotId = (jots) => {
    if (!jots) jots = this.state.jots;
    const id = jots[this.state.pagination.currentJot].id;
    return id;
  };

  findJotIndexFromId = (id, jots) => {
    if (!jots) jots = this.state.jots;
    const isIdOf = (jot) => jot.id === id;
    const jotIndex = jots.findIndex(isIdOf);
    return jotIndex;
  };

  findIdFromJotIndex = (index, jots) => {
    if (!jots) jots = this.state.jots;
    const id = jots[index].id;
    return id;
  };

  addJot = () => {
    const id = this.getNewJotId();

    const jot = this.getEmptyJot(id);
    // const mappedJot = this.mapJot(jot);

    const { jots } = this.state;
    jots.push(jot);
    this.setJots(jots);

    // const { jots, mappedJots } = this.state;
    // mappedJots.push(mappedJot);
    // this.setJotsAndMappedJots(jots, mappedJots);
  };

  nextJot = () => {
    const nextJot = this.state.pagination.currentJot + 1;
    if (this.state.jots[nextJot]) this.setCurrentJot(nextJot);
  };

  prevJot = () => {
    const prevJot = this.state.pagination.currentJot - 1;
    if (this.state.jots[prevJot]) this.setCurrentJot(prevJot);
  };

  setTotalJots = (totalJots) => {
    this.setState((prevState) => ({
      ...prevState,
      pagination: { ...prevState.pagination, totalJots },
    }));
  };

  setCurrentJot = (currentJot) => {
    this.setState((prevState) => ({
      ...prevState,
      pagination: { ...prevState.pagination, currentJot },
    }));
  };

  //#endregion

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

  toggleClearedOption = () => {
    const cleared = !this.state.options.cleared;
    this.setState(
      (prevState) => ({
        ...prevState,
        options: { ...prevState.options, cleared },
      }),
      () => {
        if (this.state.options.cleared)
          setTimeout(this.toggleClearedOption, 2000);
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

  toggles = {
    // Passes all toggles to nav bar
    toggleBackground: this.setIsDefaultTheme,
    toggleSyllables: this.toggleSyllablesOption,
    toggleLines: this.toggleLinesOption,
    toggleWords: this.toggleWordsOption,
    toggleCopied: this.toggleCopiedOption,
    toggleCleared: this.toggleClearedOption,
    toggleNavBar: this.toggleNavBar,
    toggleDropDown: this.toggleDropDown,
  };

  resetNav = () => {
    const nav = { isNavBarOpen: false, isDropDownOpen: false };

    this.setState((prevState) => ({
      ...prevState,
      nav,
    }));
  };

  //#endregion

  //#region Jot Editing
  /**
   * Each jots, should be able to edit:
   *  1. text
   *  2. lines
   *  3. counts
   *  4. results
   */

  onTextChange = (e, id) => {
    const event = e;
    const { value } = event.target;

    if (value) this.findCounts(value, id);
    else if (value === "") this.resetJot(id);
  };

  onTextKeyDown = (e, id) => {
    const event = e;
    const code = event.keyCode || event.charCode;

    if (code === 8 || code === 46) {
      const { value } = event.target;
      this.findCounts(value, id);
    }
  };

  findCounts = (text, jotId) => {
    if (!text) return;

    // get new jot info
    const loadedJot = this.getLoadedJot(text, jotId);

    // replace respective jot
    const { jots } = this.state;
    jots[jotId - 1] = loadedJot;

    // save new jot info
    this.setJots(jots);

    // const { jots, mappedJots } = this.state;
    // jots[jotId - 1] = loadedJot;
    // mappedJots[jotId - 1] = this.mapJot(loadedJot);
    // this.setJotsAndMappedJots(jots, mappedJots);
  };

  getLoadedJot = (text, id) => {
    const linesAndCounts = this.getLinesAndCounts(text);

    const { lines, counts } = linesAndCounts;

    const results = this.getResults(lines);

    const jot = { id, text, counts, lines, results };

    return jot;
  };

  getLinesAndCounts = (text) => {
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

    return { lines, counts };
  };

  getResults = (lines) => {
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

  setJots = (jots) => {
    this.setState((prevState) => ({ ...prevState, jots }));
  };

  resetJot = (id) => {
    const emptiedJot = this.getEmptyJot(id);
    const { jots } = this.state;

    const jotIndex = this.findJotIndexFromId(id, jots);

    jots[jotIndex] = emptiedJot;

    this.setJots(jots);

    // const { jots, mappedJots } = this.state;
    // mappedJots[jotIndex] = this.mapJot(emptiedJot);
    // this.setJotsAndMappedJots(jots, mappedJots);
  };

  //#endregion

  //#region Non-Editing Event Handlers
  onTextScroll = (e) => {
    const target = e.target;
    const { scrollTop } = target;
    if (this.state.options.lines || this.state.options.syllables) {
      const jotId = this.getCurrentJotId();
      const { lines, syllables } = this.state.options;

      if (lines) {
        let linesResult = document.getElementById(`lines-result-${jotId}`);
        linesResult.scrollTop = scrollTop;
      }

      if (syllables) {
        let syllablesResult = document.getElementById(
          `syllables-result-${jotId}`
        );
        syllablesResult.scrollTop = scrollTop;
      }
    }
  };

  onTextClear = () => {
    const jotId = this.getCurrentJotId();
    this.resetJot(jotId);

    const pageText = document.getElementById(`page-text-${jotId}`);
    pageText.focus();
  };
  //#endregion

  render() {
    const AlertMessage = () => {
      if (this.state.options.copied || this.state.options.cleared) {
        let message = "";
        if (this.state.options.copied) {
          message = this.state.jots[this.state.pagination.currentJot].text
            ? "Copied!"
            : "Nothing to copy!";
          return <Alert message={message} />;
        }
        if (this.state.options.cleared) {
          message = "Cleared!";
          return <Alert message={message} />;
        }
      }

      return null;
    };

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
          onTextClear={this.onTextClear}
          resetNav={this.resetNav}
          addJot={this.addJot}
          getCurrentJotId={this.getCurrentJotId}
          {...this.toggles}
        />
        <AlertMessage />
        {this.state.jots.length > 1 ? (
          <p className="text-center">{`Jot ${
            this.state.pagination.currentJot + 1
          } of ${this.state.jots.length}`}</p>
        ) : null}

        {this.state.jots.length > 0 ? (
          <Jots
            isDefaultTheme={this.state.isDefaultTheme}
            jot={this.state.jots[this.state.pagination.currentJot]}
            nav={this.state.nav}
            options={this.state.options}
            onTextChange={this.onTextChange}
            onTextKeyDown={this.onTextKeyDown}
            onTextScroll={this.onTextScroll}
            closeMenu={this.resetNav}
          />
        ) : null}

        {this.state.jots.length > 1 ? (
          <Pagination
            pagination={this.state.pagination}
            nextJot={this.nextJot}
            prevJot={this.prevJot}
          />
        ) : null}

        {this.state.options.words ? (
          <Footer
            isDefaultTheme={this.state.isDefaultTheme}
            counts={this.state.jot.counts}
            options={this.state.options}
          />
        ) : null}
      </div>
    );
  }
}

// Sheet.propTypes = {};

export default Sheet;
