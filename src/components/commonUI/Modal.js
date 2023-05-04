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
  borderRadius: "10px",
  padding: "0px 35px"
}));

const ModalOverlay = (props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={props.openModal}
      onClose={props.onHide}
      aria-labelledby="responsive-dialog-title"
      PaperComponent={MyPaper}
      sx={props.modalStyle}
    >
      <div className="modal-header">
        <DialogTitle className="modal-title" id="responsive-dialog-title">
          {props.title}
        </DialogTitle>
        <CloseIcon className="modal-close" onClick={props.onHide}></CloseIcon>
      </div>

      <DialogContent className="modal-content">{props.children}</DialogContent>
      <DialogActions className="modal-actions">
        {/* <Button
          variant="contained"
          onClick={props.onHide}
          className="close"
          autoFocus
        >
          Close
        </Button> */}
        <Button
          variant="contained"
          autoFocus
          onClick={props.onRequest}
          disabled={props.isDisabled}
        >
          {props.acceptTypo}
        </Button>
      </DialogActions>
    </Dialog>
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
          acceptTypo={props.acceptTypo}
          modalStyle={props.modalStyle}
        >
          {props.children}
        </ModalOverlay>,
        modalRoot
      )}
    </Fragment>
  );
};

export default Modal;
