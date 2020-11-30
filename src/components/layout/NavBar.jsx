import React, { useState } from "react";
import "./Navbar.css";
import {
  BsCircleHalf,
  BsFillCaretDownFill,
  BsFillCaretUpFill,
  BsArrowsAngleExpand,
  BsArrowsAngleContract,
  BsBackspace,
  BsClipboard,
  // BsFillEnvelopeFill,
  BsGrid3X3Gap,
} from "react-icons/bs";
import screenfull from "screenfull";
import InfoModal from "../modals/InfoModal";

const NavBar = (props) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const onNavBarClick = (e) => {
    e.preventDefault();
    props.toggleNavBar();
  };

  const onBackgroundClick = () => {
    props.toggleBackground();
    if (props.nav.isNavBarOpen) props.closeMenu();
  };

  const onExpandClick = () => {
    if (screenfull.isEnabled && !screenfull.isFullscreen) {
      screenfull.request();
      setIsFullscreen(true);
    }
    if (props.nav.isNavBarOpen) props.closeMenu();
  };

  const onCollapseClick = () => {
    if (screenfull.isEnabled && screenfull.isFullscreen) {
      screenfull.exit();
      setIsFullscreen(false);
    }
    if (props.nav.isNavBarOpen) props.closeMenu();
  };

  const onClearClick = (e) => {
    e.preventDefault();
    props.onTextClear();
    if (props.nav.isNavBarOpen) props.closeMenu();
  };

  const onCopyClick = (e) => {
    e.preventDefault();

    let pageText = document.getElementById("page-text");
    pageText.select();
    document.execCommand("copy");
    pageText.setSelectionRange(0, 0);
    pageText.blur();

    props.toggleCopied();
    if (props.nav.isNavBarOpen) props.closeMenu();
  };

  const onNavDropDownClick = (e) => {
    e.preventDefault();
    props.toggleDropDown();
  };

  const onToggleLinesClick = () => {
    props.toggleLines();
    if (props.nav.isNavBarOpen) props.closeMenu();
  };

  const onToggleSyllablesClick = () => {
    props.toggleSyllables();
    if (props.nav.isNavBarOpen) props.closeMenu();
  };

  const onToggleWordsClick = () => {
    props.toggleWords();
    if (props.nav.isNavBarOpen) props.closeMenu();
  };

  return (
    <nav
      className={
        props.isDefaultTheme
          ? "navbar navbar-expand-sm navbar-light nav-light"
          : "navbar navbar-expand-sm navbar-dark nav-dark"
      }
    >
      <button
        className={
          props.nav.isNavBarOpen
            ? "ml-auto navbar-toggler"
            : "ml-auto navbar-toggler collapsed"
        }
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded={props.nav.isNavBarOpen ? "true" : "false"}
        aria-label="Toggle navigation"
        onClick={onNavBarClick}
      >
        <BsGrid3X3Gap />
      </button>

      <div
        className={
          props.nav.isNavBarOpen
            ? "navbar-collapse collapse show"
            : "navbar-collapse collapse"
        }
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav">
          <div className="row justify-content-center text-center">
            {screenfull.isEnabled ? (
              <li className="nav-item col-sm-3">
                <button
                  className="btn nav-link"
                  onClick={isFullscreen ? onCollapseClick : onExpandClick}
                >
                  {isFullscreen ? (
                    <BsArrowsAngleContract />
                  ) : (
                    <BsArrowsAngleExpand />
                  )}
                </button>
              </li>
            ) : null}

            <li className="nav-item col-sm-3">
              <button className="btn nav-link" onClick={onClearClick}>
                <BsBackspace />
              </button>
            </li>
            <li className="nav-item col-sm-3">
              <button
                className="btn nav-link"
                onClick={onCopyClick}
                disabled={props.options.copied ? true : false}
              >
                <BsClipboard />
              </button>
            </li>
          </div>
        </ul>

        <ul className="navbar-nav ml-auto">
          <div className={"row justify-content-center text-center"}>
            <li className="nav-item col-sm-3" onClick={onBackgroundClick}>
              <button className="btn nav-link">
                <BsCircleHalf />
              </button>
            </li>
            {/* <li className="nav-item col-sm-3">
              <button className="btn nav-link">
                <BsFillEnvelopeFill />
              </button>
            </li> */}
            <li className="nav-item col-sm-3">
              <InfoModal isDefaultTheme={props.isDefaultTheme} />
            </li>
            <li
              className={
                props.nav.isDropDownOpen
                  ? "nav-item col-sm-3 dropdown show"
                  : "nav-item col-sm-3 dropdown"
              }
            >
              <button
                id="navbarDropdown"
                className="btn nav-link "
                aria-haspopup="true"
                aria-expanded={props.nav.isDropDownOpen ? "true" : "false"}
                aria-label="Toggle dropdown menu"
                onClick={onNavDropDownClick}
              >
                {props.nav.isDropDownOpen ? (
                  <BsFillCaretUpFill />
                ) : (
                  <BsFillCaretDownFill />
                )}
              </button>
              <div
                className={
                  props.nav.isDropDownOpen
                    ? "py-0 dropdown-menu dropdown-menu-right show"
                    : "py-0 dropdown-menu dropdown-menu-right"
                }
                aria-labelledby="navbarDropdown"
              >
                <button
                  className="btn dropdown-item"
                  onClick={onToggleLinesClick}
                >
                  <p className="my-0">{`Line Counter: ${
                    props.options.lines ? "On" : "Off"
                  }`}</p>
                </button>
                <button
                  className="btn dropdown-item"
                  onClick={onToggleSyllablesClick}
                >
                  <p className="my-0">{`Syllable Counter: ${
                    props.options.syllables ? "On" : "Off"
                  }`}</p>
                </button>
                <button
                  className="btn dropdown-item"
                  onClick={onToggleWordsClick}
                >
                  <p className="my-0">{`Word Counter: ${
                    props.options.words ? "On" : "Off"
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
