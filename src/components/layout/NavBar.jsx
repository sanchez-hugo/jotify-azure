import React, { useState } from "react";

const NavBar = () => {
  const [NavbarCollapsed, setNavbarCollapsed] = useState(true);
  //   const [NavbarCollapsing, setNavbarCollapsing] = useState(false);

  const onNavMenuClick = (e) => {
    setNavbarCollapsed(!NavbarCollapsed);

    // e.preventDefault();
    // setNavbarCollapsing(true);

    // setTimeout(() => {
    //   setNavbarCollapsed(!NavbarCollapsed);
    //   setNavbarCollapsing(false);
    // }, 500);
  };

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light">
      <span>react-pages</span>
      <button
        className={
          NavbarCollapsed ? "navbar-toggler collapsed" : "navbar-toggler"
        }
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded={NavbarCollapsed ? "true" : "false"}
        aria-label="Toggle navigation"
        onClick={onNavMenuClick}
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className={
          NavbarCollapsed
            ? "navbar-collapse collapse"
            : "navbar-collapse collapse show text-right"
        }
        // className={
        //   NavbarCollapsing
        //     ? "navbar-collapse collapsing"
        //     : NavbarCollapsed
        //     ? "navbar-collapse collapse"
        //     : "navbar-collapse collapse show"
        // }
        id="navbarSupportedContent"
        // style={NavbarCollapsing ? {height: "500px"} : null}
      >
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <span className="nav-link">Export</span>
          </li>
          <li className="nav-item">
            <span className="nav-link">Fullsize</span>
          </li>
          <li className="nav-item">
            <span className="nav-link">Clear</span>
          </li>
          <li className="nav-item">
            <span className="nav-link">Copy</span>
          </li>
        </ul>
        <ul className="navbar-nav">
          <li className="nav-item">
            <span className="nav-link">Toggle Background</span>
          </li>
          <li className="nav-item">
            <span className="nav-link">Other</span>
          </li>
          <li className="nav-item">
            <span className="nav-link">About</span>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
