import Dialog from "@material-ui/core/Dialog";
import Fade from "@material-ui/core/Fade";
import React from "react";
import CrossSvg from "../../assets/images/cross";
import ArrowTerm from "../../assets/images/arrowIcon.svg";
import CrossIconModal from "../../assets/images/cross_icon_modal.svg";
const MyModal = ({
  onClose,
  open,
  clossable = true,
  className,
  children,
  modalName,
}) => {
  const onModalClose = () => {
    onClose();
  };

  return (
    <Dialog
      className={`my-modal  ${className}`}
      onClose={onModalClose}
      open={open}
    >
      <Fade in={open}>
        <>
          {modalName != "ImageModal" ? (
            <div
              className={
                modalName === "TermsModal"
                  ? "previous-arrow-icon"
                  : "modal-close-icon"
              }
            >
              {modalName === "TermsModal" ? (
                <img
                  src={ArrowTerm}
                  alt="img"
                  height={27}
                  width={27}
                  style={{ cursor: "pointer" }}
                  onClick={onModalClose}
                />
              ) : modalName === "new-project-modal" ||
                modalName === "view-project-modal" ? (
                <img
                  src={CrossIconModal}
                  alt="img"
                  height={27}
                  width={27}
                  style={{ cursor: "pointer" }}
                  onClick={onModalClose}
                />
              ) : (
                <CrossSvg onClick={onModalClose} />
              )}
            </div>
          ) : (
            <></>
          )}
          <div className={`modal-child d-flex align-items-center ${modalName}`}>
            {children}
          </div>
        </>
      </Fade>
    </Dialog>
  );
};
export default MyModal;
