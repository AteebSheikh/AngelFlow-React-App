import { Warning } from "phosphor-react";
import React from "react";

const ValidationMessage = ({ isValidate, inputValue, message }) => {
  if (!message) {
    return null;
  }
  return (
    <div className="mt-2">
      {isValidate === false && !inputValue ? (
        <p className="error-msg mt-0 mb-2">
          {" "}
          <span style={{ marginRight: "5px" }}>
            <Warning color={"red"} size={10} />
          </span>
          {message}
        </p>
      ) : (
        ""
      )}
    </div>
  );
};

export default ValidationMessage;
