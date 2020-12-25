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
  const { isDefaultTheme, nav, options, totalJots } = props;

  const [isFullscreen, setIsFullscreen] = useState(false);

  //#region Left Side
  const FullscreenNavItem = () => {
    const onExpandClick = () => {
      if (screenfull.isEnabled && !screenfull.isFullscreen) {
        screenfull.request();
        setIsFullscreen(true);
      }
      if (nav.isNavBarOpen || nav.isDropDownOpen) props.closeMenu();
    };

    const onCollapseClick = () => {
      if (screenfull.isEnabled && screenfull.isFullscreen) {
        screenfull.exit();
        setIsFullscreen(false);
      }
      if (nav.isNavBarOpen || nav.isDropDownOpen) props.closeMenu();
    };

    return screenfull.isEnabled ? (
      <li className="nav-item col-sm-3">
        <button
          className="btn nav-link"
          onClick={isFullscreen ? onCollapseClick : onExpandClick}
        >
          {isFullscreen ? <BsArrowsAngleContract /> : <BsArrowsAngleExpand />}
        </button>
      </li>
    ) : null;
  };

  const BackspaceNavItem = () => {
    const onClearClick = (e) => {
      e.preventDefault();
      props.onTextClear();
      if (nav.isNavBarOpen || nav.isDropDownOpen) props.closeMenu();
      props.toggleCleared();
    };

    return (
      <li className="nav-item col-sm-3">
        <button
          className="btn nav-link"
          onClick={onClearClick}
          disabled={options.copied || options.cleared ? true : false}
        >
          <BsBackspace />
        </button>
      </li>
    );
  };

  const ClipboardNavItem = () => {
    const onCopyClick = (e) => {
      e.preventDefault();

      let pageText = document.getElementById(`textarea-jot`);
      pageText.select();
      document.execCommand("copy");
      pageText.setSelectionRange(0, 0);
      pageText.blur();

      props.toggleCopied();
      if (nav.isNavBarOpen || nav.isDropDownOpen) props.closeMenu();
    };

    return (
      <li className="nav-item col-sm-3">
        <button
          className="btn nav-link"
          onClick={onCopyClick}
          disabled={options.copied || options.cleared ? true : false}
        >
          <BsClipboard />
        </button>
      </li>
    );
  };

  //#endregion

  //#region Right Side
  const BackgroundNavItem = () => {
    const onBackgroundClick = () => {
      props.toggleBackground();
      if (nav.isNavBarOpen || nav.isDropDownOpen) props.closeMenu();
    };

    return (
      <li className="nav-item col-sm-3" onClick={onBackgroundClick}>
        <button className="btn nav-link">
          <BsCircleHalf />
        </button>
      </li>
    );
  };

  const InfoNavItem = () => {
    return (
      <li className="nav-item col-sm-3">
        <InfoModal isDefaultTheme={isDefaultTheme} />
      </li>
    );
  };

  const DropdownNavItem = () => {
    const onNavDropDownClick = (e) => {
      e.preventDefault();
      props.toggleDropDown();
    };

    const onToggleLinesClick = () => {
      props.toggleLines();
      if (nav.isNavBarOpen || nav.isDropDownOpen) props.closeMenu();
    };

    const onToggleSyllablesClick = () => {
      props.toggleSyllables();
      if (nav.isNavBarOpen || nav.isDropDownOpen) props.closeMenu();
    };

    const onToggleWordsClick = () => {
      props.toggleWords();
      if (nav.isNavBarOpen || nav.isDropDownOpen) props.closeMenu();
    };

    const onAddSheetClick = () => {
      props.addJot();
      if (nav.isNavBarOpen || nav.isDropDownOpen) props.closeMenu();
    };

    const onRemoveSheetClick = () => {
      props.removeJot();
      if (nav.isNavBarOpen || nav.isDropDownOpen) props.closeMenu();
    };

    return (
      <li
        className={
          nav.isDropDownOpen
            ? "nav-item col-sm-3 dropdown show"
            : "nav-item col-sm-3 dropdown"
        }
      >
        <button
          id="navbarDropdown"
          className="btn nav-link "
          aria-haspopup="true"
          aria-expanded={nav.isDropDownOpen ? "true" : "false"}
          aria-label="Toggle dropdown menu"
          onClick={onNavDropDownClick}
        >
          {nav.isDropDownOpen ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />}
        </button>
        <div
          className={
            nav.isDropDownOpen
              ? "py-0 dropdown-menu dropdown-menu-right show"
              : "py-0 dropdown-menu dropdown-menu-right"
          }
          aria-labelledby="navbarDropdown"
        >
          <button className="btn dropdown-item" onClick={onToggleLinesClick}>
            <p className="my-0">{`Line Counter: ${
              options.lines ? "On" : "Off"
            }`}</p>
          </button>
          <button
            className="btn dropdown-item"
            onClick={onToggleSyllablesClick}
          >
            <p className="my-0">{`Syllable Counter: ${
              options.syllables ? "On" : "Off"
            }`}</p>
          </button>
          <button className="btn dropdown-item" onClick={onToggleWordsClick}>
            <p className="my-0">{`Word Counter: ${
              options.words ? "On" : "Off"
            }`}</p>
          </button>
          <button className="btn dropdown-item" onClick={onAddSheetClick}>
            Add Sheet
          </button>
          {totalJots > 1 ? (
            <button className="btn dropdown-item" onClick={onRemoveSheetClick}>
              Remove Sheet
            </button>
          ) : null}
        </div>
      </li>
    );
  };
  //#endregion

  const NavBarToggleButton = () => {
    const onNavBarClick = (e) => {
      e.preventDefault();
      props.toggleNavBar();
    };

    return (
      <button
        className={
          nav.isNavBarOpen
            ? "ml-auto navbar-toggler"
            : "ml-auto navbar-toggler collapsed"
        }
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded={nav.isNavBarOpen ? "true" : "false"}
        aria-label="Toggle navigation"
        onClick={onNavBarClick}
      >
        <BsGrid3X3Gap />
      </button>
    );
  };

  return (
    <nav
      className={
        isDefaultTheme
          ? "navbar navbar-expand-sm navbar-light nav-light"
          : "navbar navbar-expand-sm navbar-dark nav-dark"
      }
    >
      <NavBarToggleButton />
      <div
        className={
          nav.isNavBarOpen
            ? "navbar-collapse collapse show"
            : "navbar-collapse collapse"
        }
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav">
          <div className="row justify-content-center text-center">
            <FullscreenNavItem />
            <BackspaceNavItem />
            <ClipboardNavItem />
          </div>
        </ul>

        <ul className="navbar-nav ml-auto">
          <div className="row justify-content-center text-center">
            <BackgroundNavItem />
            <InfoNavItem />
            <DropdownNavItem />
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
