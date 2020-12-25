import React from "react";

const Pagination = (props) => {
  const { prevJot, nextJot, pagination } = props;
  const { currentJot, totalJots } = pagination;

  return (
    <div className="btn-group btn-group-sm">
      <button
        className="btn btn-secondary"
        onClick={prevJot}
        disabled={currentJot === 0 ? true : false}
      >
        {currentJot === 0 ? 1 : currentJot}
      </button>
      {totalJots > 2 ? (
        currentJot !== 0 && currentJot !== totalJots - 1 ? (
          <button disabled className="btn btn-secondary">
            {currentJot + 1}
          </button>
        ) : null
      ) : null}
      <button
        className="btn btn-secondary"
        onClick={nextJot}
        disabled={currentJot === totalJots - 1 ? true : false}
      >
        {currentJot === totalJots - 1 ? totalJots : currentJot + 2}
      </button>
    </div>
  );
};

export default Pagination;
