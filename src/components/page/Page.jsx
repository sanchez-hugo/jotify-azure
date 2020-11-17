import React, { Component } from "react";
import "./page.css";

class Page extends Component {
  render() {
    const { isDefaultTheme } = this.props;

    const pageClassName = isDefaultTheme
      ? "col-md-8 page-light"
      : "col-md-8 page-dark";

    const pageTextClassName = isDefaultTheme
      ? "page-text-light"
      : "page-text-dark";

    return (
      <div className="">
        <div className="container-fluid pt-5">
          <div className="row justify-content-center">
            <div className={pageClassName}>
              <textarea id="page-text" className={pageTextClassName} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Page;
