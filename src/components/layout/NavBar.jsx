import React, { useState } from "react";
import "./Navbar.css";
import {
  BsCircleHalf,
  BsInfoCircleFill,
  BsThreeDots,
  BsArrowsAngleExpand,
  BsArrowsAngleContract,
  BsXCircle,
  BsClipboard,
  BsFillEnvelopeFill,
} from "react-icons/bs";
import screenfull from "screenfull";

const NavBar = (props) => {
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);
  const [showDefaultTheme, setShowDefaultTheme] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);

  const onNavbarClick = (e) => {
    e.preventDefault();
    setIsNavbarCollapsed(!isNavbarCollapsed);
  };

  const onBackgroundClick = () => {
    setShowDefaultTheme(!showDefaultTheme);
    props.toggleBackground();
  };

  const onExpandClick = () => {
    setIsFullscreen(true);
    if (screenfull.isEnabled) {
      screenfull.request();
    }
  };

  const onCollapseClick = () => {
    setIsFullscreen(false);
    if (screenfull.isEnabled && screenfull.isFullscreen) {
      screenfull.exit();
    }
  };

  const onClearClick = (e) => {
    e.preventDefault();
    let pageText = document.getElementById("page-text");
    let linesResult = document.getElementById("lines-result");
    let syllablesResult = document.getElementById("syllables-result");
    pageText.value = "";
    linesResult.value = "";
    syllablesResult.value = "";
  };

  const onCopyClick = (e) => {
    e.preventDefault();

    let pageText = document.getElementById("page-text");
    pageText.select();
    document.execCommand("copy");
    pageText.setSelectionRange(0, 0);
    pageText.blur();
  };

  const onNavMenuClick = (e) => {
    e.preventDefault();
    setIsNavMenuOpen(!isNavMenuOpen);
  };

  const onToggleLinesClick = () => {
    props.toggleLines();
  };

  const onToggleSyllablesClick = () => {
    props.toggleSyllables();
  };

  return (
    <nav
      className={
        showDefaultTheme
          ? "navbar navbar-expand-sm navbar-light nav-light"
          : "navbar navbar-expand-sm navbar-dark nav-dark"
      }
    >
      <span className="text-muted pr-3">react-pages</span>
      <button
        className={
          isNavbarCollapsed ? "navbar-toggler collapsed" : "navbar-toggler"
        }
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded={isNavbarCollapsed ? "false" : "true"}
        aria-label="Toggle navigation"
        onClick={onNavbarClick}
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className={
          isNavbarCollapsed
            ? "navbar-collapse collapse"
            : "navbar-collapse collapse show"
        }
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav mr-auto">
          <div className="row justify-content-center text-center">
            {isFullscreen ? (
              <li className="nav-item col" onClick={onCollapseClick}>
                <span className="nav-link" role="button">
                  <BsArrowsAngleContract />
                </span>
              </li>
            ) : (
              <li className="nav-item col" onClick={onExpandClick}>
                <span className="nav-link" role="button">
                  <BsArrowsAngleExpand />
                </span>
              </li>
            )}
            <li className="nav-item col">
              <span className="nav-link" role="button" onClick={onClearClick}>
                <BsXCircle />
              </span>
            </li>
            <li className="nav-item col">
              <span className="nav-link" role="button" onClick={onCopyClick}>
                <BsClipboard />
              </span>
            </li>
          </div>
        </ul>

        <ul className="navbar-nav">
          <div className={"row justify-content-center text-center"}>
            <li className="nav-item col" onClick={onBackgroundClick}>
              <span className="nav-link" role="button">
                <BsCircleHalf />
              </span>
            </li>
            <li className="nav-item col">
              <span className="nav-link" role="button">
                <BsFillEnvelopeFill />
              </span>
            </li>
            <li className="nav-item col">
              <span className="nav-link" role="button">
                <BsInfoCircleFill />
              </span>
            </li>
            <li
              className={
                isNavMenuOpen
                  ? "nav-item col dropdown show"
                  : "nav-item col dropdown"
              }
            >
              <span
                id="navbarDropdown"
                className="nav-link dropdown-toggle"
                role="button"
                aria-haspopup="true"
                aria-expanded={isNavMenuOpen ? "true" : "false"}
                onClick={onNavMenuClick}
              >
                <BsThreeDots />
              </span>
              <div
                className={
                  isNavMenuOpen
                    ? "dropdown-menu dropdown-menu-right show"
                    : "dropdown-menu dropdown-menu-right"
                }
                aria-labelledby="navbarDropdown"
              >
                <button className="dropdown-item" onClick={onToggleLinesClick}>
                  Toggle Lines
                </button>
                <button
                  className="dropdown-item"
                  onClick={onToggleSyllablesClick}
                >
                  Toggle Syllables
                </button>
              </div>
            </li>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
