import React, { Component } from "react";
import NavBar from "../layout/navbar/NavBar";
import Alert from "../layout/Alert";
import Footer from "../layout/footer/Footer";
import Jots from "../jots/Jots";
import "./sheet.css";
import "../../services/theme/theme.css";
import { countSyllablesInWord } from "../../services/pageService";
import { themeOptions } from "../../services/theme/themeService";

const secondsOfAlertMessage = 2000;

class Sheet extends Component {
  state = {
    themeId: 1,
    nav: {
      isNavBarOpen: false,
      isOptionsDropdownOpen: false,
      isBgDropdownOpen: false,
    },
    options: {
      lines: false,
      syllables: false,
      words: false,
      copied: false,
      cleared: false,
    },
    alerts: {
      wasJotAdded: false,
      wasJotRemoved: false,
    },
    jots: [],
    pagination: {
      currentJot: 0,
      totalJots: 0,
    },
    idCounter: 0,
  };

  componentDidMount() {
    this.addJot();
  }

  //#region Jots

  getEmptyJot = (id) => {
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

  getEmptyJotWithId = () => {
    const id = this.getNewJotId();
    const jot = this.getEmptyJot(id);
    return jot;
  };

  addJot = () => {
    // Jots
    const jot = this.getEmptyJotWithId();
    const { jots } = this.state;
    jots.push(jot);

    // Pagination
    const currentJot = jots.length - 1;
    const totalJots = jots.length;
    const pagination = { currentJot, totalJots };

    this.setJotsAndPagination(jots, pagination);

    if (jots.length > 1) this.toggleJotAddedAlert();
  };

  removeJot = () => {
    if (this.state.pagination.totalJots > 1) {
      // Jots
      const id = this.getCurrentJotId();
      const jots = this.state.jots.filter((jot) => jot.id !== id);
      this.setJots(jots);

      // Pagination
      let currentJot = this.state.pagination.currentJot;
      if (!jots[currentJot]) currentJot -= 1;
      if (currentJot < 0) currentJot = 0;
      const totalJots = jots.length;
      const pagination = {
        currentJot,
        totalJots,
      };

      this.setJotsAndPagination(jots, pagination);
      this.toggleJotRemovedAlert();
    }
  };

  nextJot = () => {
    const nextJot = this.state.pagination.currentJot + 1;
    if (this.state.jots[nextJot]) this.setCurrentJot(nextJot);
  };

  prevJot = () => {
    const prevJot = this.state.pagination.currentJot - 1;
    if (this.state.jots[prevJot]) this.setCurrentJot(prevJot);
  };

  resetJot = (id) => {
    const emptiedJot = this.getEmptyJot(id);
    const { jots } = this.state;

    const jotIndex = this.findJotIndexFromId(id, jots);

    jots[jotIndex] = emptiedJot;

    this.setJots(jots);
  };

  getNewJotId = () => {
    const id = this.state.idCounter + 1;
    this.setIdCounter(id);
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
  //#endregion

  //#region Toggles

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
          setTimeout(this.toggleCopiedOption, secondsOfAlertMessage);
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
          setTimeout(this.toggleClearedOption, secondsOfAlertMessage);
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

  toggleOptionsDropdown = () => {
    const isOptionsDropdownOpen = !this.state.nav.isOptionsDropdownOpen;
    this.setState((prevState) => ({
      ...prevState,
      nav: { ...prevState.nav, isOptionsDropdownOpen },
    }));
  };

  toggleBgDropdown = () => {
    const isBgDropdownOpen = !this.state.nav.isBgDropdownOpen;
    this.setState((prevState) => ({
      ...prevState,
      nav: { ...prevState.nav, isBgDropdownOpen },
    }));
  };

  toggles = {
    // Passes all toggles to nav bar
    toggleSyllables: this.toggleSyllablesOption,
    toggleLines: this.toggleLinesOption,
    toggleWords: this.toggleWordsOption,
    toggleCopied: this.toggleCopiedOption,
    toggleCleared: this.toggleClearedOption,
    toggleNavBar: this.toggleNavBar,
    toggleDropDown: this.toggleOptionsDropdown,
    toggleBgDropdown: this.toggleBgDropdown,
  };

  toggleJotAddedAlert = () => {
    const { alerts } = this.state;
    alerts.wasJotAdded = !alerts.wasJotAdded;

    this.setState(
      (prevState) => ({ ...prevState, alerts }),
      () => {
        if (this.state.alerts.wasJotAdded)
          setTimeout(this.toggleJotAddedAlert, secondsOfAlertMessage);
      }
    );
  };

  toggleJotRemovedAlert = () => {
    const { alerts } = this.state;
    alerts.wasJotRemoved = !alerts.wasJotRemoved;

    this.setState(
      (prevState) => ({ ...prevState, alerts }),
      () => {
        if (this.state.alerts.wasJotRemoved)
          setTimeout(this.toggleJotRemovedAlert, secondsOfAlertMessage);
      }
    );
  };

  //#endregion

  //#region Jot Events
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

  onTextScroll = (e) => {
    const target = e.target;
    if (this.state.options.lines || this.state.options.syllables) {
      const { scrollTop } = target;
      const { lines, syllables } = this.state.options;

      if (syllables) {
        let sylTextarea = document.getElementById(`textarea-syllables`);
        sylTextarea.scrollTop = scrollTop;
      }

      if (lines) {
        let lineTextarea = document.getElementById(`textarea-lines`);
        lineTextarea.scrollTop = scrollTop;
      }
    }
  };

  onTextClear = () => {
    const jotId = this.getCurrentJotId();
    this.resetJot(jotId);

    // TODO - this should prob move to navbar
    const pageText = document.getElementById(`textarea-jot`);
    pageText.focus();
  };

  changeTheme = (id) => {
    this.setThemeId(id);
  };
  //#endregion

  //#region Jot Calculation
  findCounts = (text, jotId) => {
    if (!text) return;

    // get new jot info
    const loadedJot = this.getLoadedJot(text, jotId);

    // replace respective jot
    const { jots } = this.state;
    const currentJot = this.findJotIndexFromId(jotId, jots);
    jots[currentJot] = loadedJot;

    // save new jot info
    this.setJots(jots);
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

  //#endregion

  //#region State Management
  setThemeId = (themeId) => {
    this.setState((prevState) => ({ ...prevState, themeId }));
  };

  setIdCounter = (idCounter) => {
    this.setState((prevState) => ({ ...prevState, idCounter }));
  };

  setCurrentJot = (currentJot) => {
    this.setState((prevState) => ({
      ...prevState,
      pagination: { ...prevState.pagination, currentJot },
    }));
  };

  setPagination = (pagination) => {
    this.setState((prevState) => ({ ...prevState, pagination }));
  };

  setJots = (jots) => {
    this.setState((prevState) => ({ ...prevState, jots }));
  };

  setJotsAndPagination = (jots, pagination) => {
    this.setState((prevState) => ({ ...prevState, jots, pagination }));
  };

  resetNav = () => {
    let { nav } = this.state;

    if (nav.isNavBarOpen || nav.isOptionsDropdownOpen || nav.isBgDropdownOpen) {
      nav = {
        isNavBarOpen: false,
        isOptionsDropdownOpen: false,
        isBgDropdownOpen: false,
      };

      this.setState((prevState) => ({
        ...prevState,
        nav,
      }));
    }
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
      } else if (this.state.alerts.wasJotAdded) {
        const message = `Jot added!`;
        return <Alert message={message} type="success" />;
      } else if (this.state.alerts.wasJotRemoved) {
        const message = `Jot removed!`;
        return <Alert message={message} type="danger" />;
      }

      return null;
    };

    return (
      <div
        className={`container-fluid full-height ${
          themeOptions[this.state.themeId].style
        }`}
      >
        <NavBar
          themeId={this.state.themeId}
          options={this.state.options}
          nav={this.state.nav}
          onTextClear={this.onTextClear}
          tryCloseMenu={this.resetNav}
          addJot={this.addJot}
          removeJot={this.removeJot}
          getCurrentJotId={this.getCurrentJotId}
          totalJots={this.state.pagination.totalJots}
          onThemeClick={this.changeTheme}
          {...this.toggles}
        />
        <AlertMessage />

        {this.state.jots.length > 0 ? (
          <Jots
            jot={this.state.jots[this.state.pagination.currentJot]}
            nav={this.state.nav}
            themeId={this.state.themeId}
            options={this.state.options}
            onTextChange={this.onTextChange}
            onTextKeyDown={this.onTextKeyDown}
            onTextScroll={this.onTextScroll}
            tryCloseMenu={this.resetNav}
            nextJot={this.nextJot}
            prevJot={this.prevJot}
          />
        ) : null}

        {this.state.jots.length > 0 ? (
          <Footer
            counts={this.state.jots[this.state.pagination.currentJot].counts}
            options={this.state.options}
            pagination={this.state.pagination}
            jotCount={this.state.jots.length}
            nextJot={this.nextJot}
            prevJot={this.prevJot}
          />
        ) : null}
      </div>
    );
  }
}

// Sheet.propTypes = {};

export default Sheet;
