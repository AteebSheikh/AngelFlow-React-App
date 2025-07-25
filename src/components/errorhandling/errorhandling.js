import React, { useState } from "react";
import ErrorSwitch from "../../../src/assets/images/error-switch.png";
const Errorhandling = () => {
  return (
    <div className="container-fluid ErrorWrapper">
      <div className=" ErrorContent">
        <h1>404</h1>
        <p>Oops! Page not found.</p>

        <p>We couldn’t find the page you are looking for.</p>
        <button type="button" class="new-project-button-error btn btn-primary">
          GO HOME
        </button>
      </div>
      <div className="ErrorSwitchimg">
        <img src={ErrorSwitch} alt="img" />
      </div>
    </div>
  );
};

export default Errorhandling;
