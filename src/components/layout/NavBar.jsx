import React, { useState } from "react";
import "./Navbar.css";
import {
  BsCircleHalf,
  BsInfoCircleFill,
  BsArrowBarDown,
  BsArrowBarUp,
  BsArrowsAngleExpand,
  BsArrowsAngleContract,
  BsXCircle,
  BsClipboard,
  BsFillEnvelopeFill,
  BsGrid3X3Gap,
} from "react-icons/bs";
import screenfull from "screenfull";

const NavBar = (props) => {
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);
  const [showDefaultTheme, setShowDefaultTheme] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsNavMenuOpen(false);
  };

  const onNavbarClick = (e) => {
    e.preventDefault();
    setIsNavbarCollapsed(!isNavbarCollapsed);
  };

  const onBackgroundClick = () => {
    setShowDefaultTheme(!showDefaultTheme);
    props.toggleBackground();
    setIsNavbarCollapsed(!isNavbarCollapsed);
  };

  const onExpandClick = () => {
    if (screenfull.isEnabled && !screenfull.isFullscreen) {
      screenfull.request();
      setIsFullscreen(true);
    }
    setIsNavbarCollapsed(!isNavbarCollapsed);
  };

  const onCollapseClick = () => {
    if (screenfull.isEnabled && screenfull.isFullscreen) {
      screenfull.exit();
      setIsFullscreen(false);
    }
    setIsNavbarCollapsed(!isNavbarCollapsed);
  };

  const onClearClick = (e) => {
    e.preventDefault();
    let pageText = document.getElementById("page-text");
    pageText.value = "";

    if (props.linesResult) {
      let linesResult = document.getElementById("lines-result");
      linesResult.value = "";
    }

    if (props.syllablesResult) {
      let syllablesResult = document.getElementById("syllables-result");
      syllablesResult.value = "";
    }

    setIsNavbarCollapsed(!isNavbarCollapsed);
  };

  const onCopyClick = (e) => {
    e.preventDefault();

    let pageText = document.getElementById("page-text");
    pageText.select();
    document.execCommand("copy");
    pageText.setSelectionRange(0, 0);
    pageText.blur();

    setIsNavbarCollapsed(!isNavbarCollapsed);
    props.toggleCopyAlert();
  };

  const onNavMenuClick = (e) => {
    e.preventDefault();
    setIsNavMenuOpen(!isNavMenuOpen);
  };

  const onToggleLinesClick = () => {
    props.toggleLines();
    closeMenu();
    setIsNavbarCollapsed(!isNavbarCollapsed);
  };

  const onToggleSyllablesClick = () => {
    props.toggleSyllables();
    closeMenu();
    setIsNavbarCollapsed(!isNavbarCollapsed);
  };

  return (
    <nav
      className={
        showDefaultTheme
          ? "navbar navbar-expand-sm navbar-light nav-light"
          : "navbar navbar-expand-sm navbar-dark nav-dark"
      }
    >
      <button
        className={
          isNavbarCollapsed
            ? "ml-auto navbar-toggler collapsed"
            : "ml-auto navbar-toggler"
        }
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded={isNavbarCollapsed ? "false" : "true"}
        aria-label="Toggle navigation"
        onClick={onNavbarClick}
      >
        <BsGrid3X3Gap />
      </button>

      <div
        className={
          isNavbarCollapsed
            ? "navbar-collapse collapse"
            : "navbar-collapse collapse show"
        }
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav">
          <div className="row justify-content-center text-center">
            {isFullscreen ? (
              <li className="nav-item col-3" onClick={onCollapseClick}>
                <span className="nav-link" role="button">
                  <BsArrowsAngleContract />
                </span>
              </li>
            ) : (
              <li className="nav-item col-3" onClick={onExpandClick}>
                <span className="nav-link" role="button">
                  <BsArrowsAngleExpand />
                </span>
              </li>
            )}
            <li className="nav-item col-3">
              <span className="nav-link" role="button" onClick={onClearClick}>
                <BsXCircle />
              </span>
            </li>
            <li className="nav-item col-3">
              <span className="nav-link" role="button" onClick={onCopyClick}>
                <BsClipboard />
              </span>
            </li>
          </div>
        </ul>

        <ul className="navbar-nav ml-auto">
          <div className={"row justify-content-center text-center"}>
            <li className="nav-item col-3" onClick={onBackgroundClick}>
              <span className="nav-link" role="button">
                <BsCircleHalf />
              </span>
            </li>
            <li className="nav-item col-3">
              <span className="nav-link" role="button">
                <BsFillEnvelopeFill />
              </span>
            </li>
            <li className="nav-item col-3">
              <span className="nav-link" role="button">
                <BsInfoCircleFill />
              </span>
            </li>
            <li
              className={
                isNavMenuOpen
                  ? "nav-item col-sm-3 dropdown show"
                  : "nav-item col-sm-3 dropdown"
              }
            >
              <span
                id="navbarDropdown"
                className="nav-link "
                role="button"
                aria-haspopup="true"
                aria-expanded={isNavMenuOpen ? "true" : "false"}
                aria-label="Toggle dropdown menu"
                onClick={onNavMenuClick}
              >
                {isNavMenuOpen ? <BsArrowBarUp /> : <BsArrowBarDown />}
              </span>
              <div
                className={
                  isNavMenuOpen
                    ? "py-0 dropdown-menu dropdown-menu-right show"
                    : "py-0 dropdown-menu dropdown-menu-right"
                }
                aria-labelledby="navbarDropdown"
              >
                <button className="dropdown-item" onClick={onToggleLinesClick}>
                  <p className="my-0">{`Line Counter: ${
                    props.showLines ? "On" : "Off"
                  }`}</p>
                </button>
                <button
                  className="dropdown-item"
                  onClick={onToggleSyllablesClick}
                >
                  <p className="my-0">{`Syllable Counter: ${
                    props.showSyllables ? "On" : "Off"
                  }`}</p>
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
