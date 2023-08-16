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
  minWidth: "40rem !important",
  maxWidth: "120rem !important",
  borderRadius: "0.75rem",
  padding: "0 2rem",
}));

const StyledButton = styled(Button)({
  textTransform: "none", // Prevents capitalization
});

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
        <StyledButton
          variant="contained"
          autoFocus
          color="inherit"
          onClick={props.onHide}
          disabled={props.isDisabled}
        >
          Cancel
        </StyledButton>
        <StyledButton
          variant="contained"
          color="success"
          autoFocus
          onClick={props.onRequest}
          disabled={props.isDisabled}
        >
          {props.acceptTypo}
        </StyledButton>
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
