import React, { Fragment } from "react";
import * as ReactDOM from "react-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme, styled } from "@mui/material/styles";
import { Paper } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import "./Modal.scss";

const MyPaper = styled(Paper)(({ theme }) => ({
  maxWidth: "1000px !important",
}));

const ModalOverlay = (props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={props.openModal}
        onClose={props.onHide}
        aria-labelledby="responsive-dialog-title"
        PaperComponent={MyPaper}
      >
        <div className="modal-header">
          <DialogTitle className="modal-title" id="responsive-dialog-title">
            {props.title}
          </DialogTitle>
          <CloseIcon className="modal-close" onClick={props.onHide}></CloseIcon>
        </div>

        <DialogContent className="modal-content">
          {props.children}
        </DialogContent>
        <DialogActions className="modal-actions">
          <Button
            variant="contained"
            onClick={props.onHide}
            color="error"
            autoFocus
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            autoFocus
            onClick={props.onRequest}
            disabled={props.isDisabled}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const modalRoot = document.getElementById("modal");

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <ModalOverlay
          openModal={props.openModal}
          onHide={props.onHide}
          onRequest={props.onRequest}
          title={props.title}
          isDisabled={props.isDisabled}
        >
          {props.children}
        </ModalOverlay>,
        modalRoot
      )}
    </Fragment>
  );
};

export default Modal;
