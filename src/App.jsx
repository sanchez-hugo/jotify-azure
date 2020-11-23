import React, { Component } from "react";
import NavBar from "./components/layout/NavBar";
import Page from "./components/page/Page";
import "./App.css";

class App extends Component {
  state = {
    isDefaultTheme: true,
    showLines: false,
    showSyllables: false,
    showCopyAlert: false,
    wasTextCleared: false,
  };

  setIsDefaultTheme = () => {
    const isDefaultTheme = !this.state.isDefaultTheme;
    this.setState((prevState) => ({ ...prevState, isDefaultTheme }));
  };

  setShowLines = () => {
    const showLines = !this.state.showLines;
    this.setState((prevState) => ({ ...prevState, showLines }));
  };

  setShowSyllables = () => {
    const showSyllables = !this.state.showSyllables;
    this.setState((prevState) => ({ ...prevState, showSyllables }));
  };

  toggleCopyAlert = () => {
    const showCopyAlert = !this.state.showCopyAlert;
    this.setState(
      (prevState) => ({ ...prevState, showCopyAlert }),
      () => {
        if (this.state.showCopyAlert) setTimeout(this.toggleCopyAlert, 1500);
      }
    );
  };

  toggleTextCleared = () => {
    const wasTextCleared = !this.state.wasTextCleared;
    this.setState(
      (prevState) => ({ ...prevState, wasTextCleared }),
      () => {
        if (this.state.wasTextCleared) this.toggleTextCleared();
      }
    );
  };

  render() {
    return (
      <div className={this.state.isDefaultTheme ? "app-light" : "app-dark"}>
        <NavBar
          toggleBackground={this.setIsDefaultTheme}
          toggleSyllables={this.setShowSyllables}
          toggleLines={this.setShowLines}
          toggleCopyAlert={this.toggleCopyAlert}
          showSyllables={this.state.showSyllables}
          showLines={this.state.showLines}
          toggleTextCleared={this.toggleTextCleared}
          isDefaultTheme={this.state.isDefaultTheme}
        />
        <Page
          isDefaultTheme={this.state.isDefaultTheme}
          showSyllables={this.state.showSyllables}
          showLines={this.state.showLines}
          showCopyAlert={this.state.showCopyAlert}
          wasTextCleared={this.state.wasTextCleared}
          toggleTextCleared={this.toggleTextCleared}
        />
      </div>
    );
  }
}

export default App;
