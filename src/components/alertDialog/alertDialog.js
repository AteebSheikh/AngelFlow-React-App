import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import React from "react";
import Button from "react-bootstrap/Button";

export default function AlertDialog({
  content,
  onAccept,
  onDecline,
  open,
  handleClose,
}) {
  return (
    <div
      className="alert-dialog-box"
      style={{
        zIndex: -1,
      }}
    >
      <Dialog open={open} onClose={handleClose}>
        <div>
          <DialogContent>
            <DialogContentText
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "20px",
                fontWeight: "bold",
                width: "500px",
              }}
            >
              {content}
            </DialogContentText>
          </DialogContent>
          <div
            className="footer"
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "20px",
            }}
          >
            <Button
              className="new-project-button mr-2"
              onClick={onDecline}
              type="secondary"
              style={{
                width: "fit-content",
                margin: "5px",
              }}
            >
              No, cancel
            </Button>
            <Button
              className="new-project-button ml-2"
              onClick={onAccept}
              style={{
                border: "none",
                width: "fit-content",
                margin: "5px",
              }}
            >
              Yes, confirm
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
