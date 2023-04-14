import * as ReactDOM from "react-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme, styled } from "@mui/material/styles";
import React, { Fragment } from "react";
import { Paper } from "@mui/material";

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
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          id="responsive-dialog-title"
        >
          {props.title}
        </DialogTitle>
        <DialogContent>{props.children}</DialogContent>
        <DialogActions>
          <Button onClick={props.onHide} color="error" autoFocus>
            Cancel
          </Button>
          <Button autoFocus onClick={props.onRequest}>
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
        >
          {props.children}
        </ModalOverlay>,
        modalRoot
      )}
    </Fragment>
  );
};

export default Modal;
