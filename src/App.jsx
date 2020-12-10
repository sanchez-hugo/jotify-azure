import React, { Component } from "react";
// import "./App.css";
import Sheet from "./components/sheet/Sheet";

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <Sheet />
        </div>
      </div>
    );
  }
}

export default App;
