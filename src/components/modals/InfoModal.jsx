import React, { useState } from "react";
import { IconContext } from "react-icons/lib";
import { BsInfoCircleFill, BsXCircleFill } from "react-icons/bs";
import { themeOptions } from "../../services/theme/themeService";
import "../../services/theme/theme.css";
import "./InfoModal.css";

const InfoModal = (props) => {
  const [isModalActive, setIsModalActive] = useState(false);

  const onButtonClick = () => {
    setIsModalActive(!isModalActive);
  };

  const closeModal = () => {
    setIsModalActive(false);
  };

  const iconColor = themeOptions[props.themeId].iconColor;

  return (
    <>
      <button
        className="btn nav-link"
        data-toggle="modal"
        data-target="#infoModal"
        onClick={onButtonClick}
      >
        <IconContext.Provider value={iconColor}>
          <BsInfoCircleFill />
        </IconContext.Provider>
      </button>

      <div
        className={isModalActive ? "modal fade show blur" : "modal fade"}
        id="infoModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="infoModal-title"
        aria-hidden={isModalActive ? "false" : "true"}
        style={isModalActive ? { display: "block" } : { display: "none" }}
        onClick={closeModal}
      >
        <div className={`modal-dialog modal-dialog-centered`} role="document">
          <div className={`modal-content`}>
            <div
              className={`modal-header ${themeOptions[props.themeId].style}`}
            >
              <h5 className="modal-title" id="infoModal-title">
                Jotify
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={closeModal}
              >
                <span aria-hidden={isModalActive ? "false" : "true"}>
                  <BsXCircleFill />
                </span>
              </button>
            </div>
            <div className={`modal-body ${themeOptions[props.themeId].style}`}>
              <p>
                As someone who is a fan of{" "}
                <a
                  className="text-info"
                  aria-label="Visit external site, Blank Page."
                  href="https://blank.page"
                >
                  <i>blank.page</i>
                </a>{" "}
                and of a certain{" "}
                <a
                  className="text-info"
                  aria-label="Visit external site, Syllable Counter."
                  href="https://www.howmanysyllables.com/syllable_counter/"
                >
                  syllable counter
                </a>
                , I wanted to have a hybrid of the two. This was the product.
                It's currently a work in progress but I hope it's enjoyable.
              </p>
              <p>
                The line counter is for the developers as well, though it may
                not be useful.
              </p>
            </div>
            <div
              className={`modal-footer ${themeOptions[props.themeId].style}`}
            >
              <small className={themeOptions[props.themeId].style}>
                I would love to hear some feedback after I've reached a good
                point in development. Please stay tuned. In the mean time, keep
                jotting!
              </small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoModal;
