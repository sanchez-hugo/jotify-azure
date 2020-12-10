import React from "react";

const Pagination = (props) => {
  const { prevJot, nextJot, pagination } = props;
  const { currentJot, totalJots } = pagination;

  return (
    <div className="row justify-content-center">
      <div className="btn-group">
        <button
          className="btn btn-secondary"
          onClick={prevJot}
          disabled={currentJot === 0 ? true : false}
        >
          Prev
        </button>
        <button
          className="btn btn-secondary"
          onClick={nextJot}
          disabled={currentJot === totalJots - 1 ? true : false}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
