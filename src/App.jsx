import React, { Component } from "react";
import NavBar from "./components/layout/NavBar";
import Page from "./components/page/Page";
import "./App.css";

class App extends Component {
  state = {
    isDefaultTheme: true,
    showLines: true,
    showSyllables: true,
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

  render() {
    return (
      <div className={this.state.isDefaultTheme ? "app-light" : "app-dark"}>
        <NavBar
          toggleBackground={this.setIsDefaultTheme}
          toggleSyllables={this.setShowSyllables}
          toggleLines={this.setShowLines}
        />
        <Page
          isDefaultTheme={this.state.isDefaultTheme}
          showSyllables={this.state.showSyllables}
          showLines={this.state.showLines}
        />
      </div>
    );
  }
}

export default App;
