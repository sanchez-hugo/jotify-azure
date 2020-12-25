import React from "react";

/* 
    const copiedMessage = this.props.jot.text ? "Copied!" : "Nothing to copy!";
    const clearedMessage = "Cleared!";
*/

const Alert = (props) => {
  let { message, type } = props;
  if (!type) type = "info";

  return (
    <div className="row justify-content-center">
      <div className={`col-md-6 alert alert-${type} text-center`} role="alert">
        {message}
      </div>
    </div>
  );
};

export default Alert;
