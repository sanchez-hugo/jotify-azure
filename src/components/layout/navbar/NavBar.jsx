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
  BsGrid3X3Gap,
} from "react-icons/bs";
import screenfull from "screenfull";
import InfoModal from "../../modals/InfoModal";
import "../../../services/theme/theme.css";
import { themeOptions } from "../../../services/theme/themeService";
import { IconContext } from "react-icons/lib";

const NavBar = (props) => {
  const {
    nav,
    options,
    totalJots,
    themeId,
    onThemeClick,
    tryCloseMenu,
  } = props;

  const [isFullscreen, setIsFullscreen] = useState(false);

  const iconColor = themeOptions[themeId].iconColor;

  //#region Left Side
  const FullscreenNavItem = () => {
    const onExpandClick = () => {
      if (screenfull.isEnabled && !screenfull.isFullscreen) {
        screenfull.request();
        setIsFullscreen(true);
      }
      tryCloseMenu();
    };

    const onCollapseClick = () => {
      if (screenfull.isEnabled && screenfull.isFullscreen) {
        screenfull.exit();
        setIsFullscreen(false);
      }
      tryCloseMenu();
    };

    return screenfull.isEnabled ? (
      <li className="nav-item col-sm-3">
        <button
          className="btn nav-link"
          onClick={isFullscreen ? onCollapseClick : onExpandClick}
        >
          <IconContext.Provider value={iconColor}>
          {isFullscreen ? <BsArrowsAngleContract /> : <BsArrowsAngleExpand />}</IconContext.Provider>
        </button>
      </li>
    ) : null;
  };

  const BackspaceNavItem = () => {
    const onClearClick = (e) => {
      e.preventDefault();
      props.onTextClear();
      tryCloseMenu();
      props.toggleCleared();
    };

    return (
      <li className="nav-item col-sm-3">
        <button
          className="btn nav-link"
          onClick={onClearClick}
          disabled={options.copied || options.cleared ? true : false}
        >
          <IconContext.Provider value={iconColor}>
          <BsBackspace />
          </IconContext.Provider>
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
      tryCloseMenu();
    };

    return (
      <li className="nav-item col-sm-3">
        <button
          className="btn nav-link"
          onClick={onCopyClick}
          disabled={options.copied || options.cleared ? true : false}
        >
          <IconContext.Provider value={iconColor}>
          <BsClipboard />
          </IconContext.Provider>
        </button>
      </li>
    );
  };

  //#endregion

  //#region Right Side
  const ThemeNavItem = () => {
    const ThemeButtons = () => {
      const themeButtons = [];
      themeOptions.forEach((theme) => {
        const onBgThemeClick = () => {
          onThemeClick(theme.id);
          tryCloseMenu();
        };

        let currentButton = (
          <button
            key={theme.id}
            className={`btn dropdown-item ${theme.dropdownItem}`}
            onClick={onBgThemeClick}
            disabled={theme.id === themeId}
          >
            <p className="my-0">{`${theme.name}`}</p>
          </button>
        );

        themeButtons.push(currentButton);
      });
      return themeButtons;
    };

    const onBgDropdownClick = () => {
      props.toggleBgDropdown();
    };

    return (
      <li
        className={
          nav.isBgDropdownOpen
            ? `nav-item col-sm-3 dropdown show`
            : `nav-item col-sm-3 dropdown`
        }
      >
        <button
          id="backgroundDropdown"
          className="btn nav-link"
          aria-haspopup="true"
          aria-expanded={nav.isBgDropdownOpen ? "true" : "false"}
          aria-label="Toggle dropdown menu"
          onClick={onBgDropdownClick}
        >
          <IconContext.Provider value={iconColor}>
            <BsCircleHalf />
          </IconContext.Provider>
        </button>
        <div
          className={
            nav.isBgDropdownOpen
              ? `py-0 dropdown-menu dropdown-menu-right show ${themeOptions[themeId].dropdown}`
              : "py-0 dropdown-menu dropdown-menu-right"
          }
          aria-labelledby="backgroundDropdown"
        >
          <ThemeButtons />
        </div>
      </li>
    );
  };

  const InfoNavItem = () => {
    return (
      <li className="nav-item col-sm-3">
        <InfoModal themeId={themeId} />
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
      tryCloseMenu();
    };

    const onToggleSyllablesClick = () => {
      props.toggleSyllables();
      tryCloseMenu();
    };

    const onToggleWordsClick = () => {
      props.toggleWords();
      tryCloseMenu();
    };

    const onAddSheetClick = () => {
      props.addJot();
      tryCloseMenu();
    };

    const onRemoveSheetClick = () => {
      props.removeJot();
      tryCloseMenu();
    };

    return (
      <li
        className={
          nav.isOptionsDropdownOpen
            ? `nav-item col-sm-3 dropdown show`
            : `nav-item col-sm-3 dropdown`
        }
      >
        <button
          id="navbarDropdown"
          className="btn nav-link"
          aria-haspopup="true"
          aria-expanded={nav.isOptionsDropdownOpen ? "true" : "false"}
          aria-label="Toggle dropdown menu"
          onClick={onNavDropDownClick}
        >
          <IconContext.Provider value={iconColor}>
            {nav.isOptionsDropdownOpen ? (
              <BsFillCaretUpFill />
            ) : (
              <BsFillCaretDownFill />
            )}
          </IconContext.Provider>
        </button>
        <div
          className={
            nav.isOptionsDropdownOpen
              ? "py-0 dropdown-menu dropdown-menu-right show"
              : "py-0 dropdown-menu dropdown-menu-right"
          }
          aria-labelledby="navbarDropdown"
        >
          <button className={`btn dropdown-item`} onClick={onToggleLinesClick}>
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
          <button className={`btn dropdown-item`} onClick={onToggleWordsClick}>
            <p className="my-0">{`Word Counter: ${
              options.words ? "On" : "Off"
            }`}</p>
          </button>
          <button className={`btn dropdown-item`} onClick={onAddSheetClick}>
            Add Sheet
          </button>
          {totalJots > 1 ? (
            <button
              className={`btn dropdown-item`}
              onClick={onRemoveSheetClick}
            >
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
        <IconContext.Provider value={iconColor}>
          <BsGrid3X3Gap />
        </IconContext.Provider>
      </button>
    );
  };

  return (
    <nav className={"navbar navbar-expand-sm"}>
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
            <ThemeNavItem />
            <InfoNavItem />
            <DropdownNavItem />
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
