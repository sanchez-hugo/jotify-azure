import React, { Component } from "react";
import NavBar from "./components/layout/NavBar";
import Page from "./components/page/Page";
import "./App.css";

class App extends Component {
  state = {
    isDefaultTheme: true,
  };

  toggleDefaultTheme = () => {
    this.setState({ isDefaultTheme: !this.state.isDefaultTheme });
  };

  render() {
    return (
      <div className={this.state.isDefaultTheme ? "app-light" : "app-dark"}>
        <NavBar handleBackgroundClick={this.toggleDefaultTheme} />
        <Page isDefaultTheme={this.state.isDefaultTheme} />
      </div>
    );
  }
}

export default App;
