import React from "react";

const TermsConditions = ({ mapDetail }) => {
  return (
    <div className=" terms-modal-main">
      <div className="terms-condition-title">
        <h3>Terms and Conditions</h3>
      </div>
      <div className="terms-content">
        <div className="terms-content-box custom-scrollbar">
          <p
            dangerouslySetInnerHTML={{
              __html: mapDetail?.terms_and_conditions?.replace(
                /(https?:\/\/[^\s]+)/g,
                `<a class='link'  target="_blank" href="$1">$1</a>`
              ),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
