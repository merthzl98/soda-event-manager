import { Fragment } from "react";
import * as ReactDOM from "react-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme, styled } from "@mui/material/styles";
import { Paper } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import "./Modal.scss";
import ButtonUI from "./ButtonUI";

const MyPaper = styled(Paper)(({ theme }) => ({
  minWidth: "30rem !important",
  maxWidth: "120rem !important",
  borderRadius: "0.75rem",
  padding: "0 36px !important",
}));

const ModalOverlay = (props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const {
    openModal,
    onHide,
    modalStyle,
    title,
    children,
    isDisabled,
    onRequest,
    acceptTypo,
  } = props;

  return (
    <Dialog
      fullScreen={fullScreen}
      open={openModal}
      onClose={onHide}
      PaperComponent={MyPaper}
      sx={modalStyle}
    >
      <div className="modal-header">
        <DialogTitle className="modal-title">{title}</DialogTitle>
        <CloseIcon className="modal-close" onClick={onHide}></CloseIcon>
      </div>

      <DialogContent className="modal-content">{children}</DialogContent>
      <DialogActions className="modal-actions">
        <ButtonUI
          color="inherit"
          onClick={onHide}
          disabled={isDisabled}
          label="Cancel"
        />

        <ButtonUI
          onClick={onRequest}
          disabled={isDisabled}
          label={acceptTypo}
        />
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
