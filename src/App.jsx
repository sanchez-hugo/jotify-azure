import React, { Component } from "react";
import NavBar from "./components/layout/NavBar";
import Page from "./components/page/Page";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="app-light">
        <NavBar />
        <Page />
      </div>
    );
  }
}

export default App;
