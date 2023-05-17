import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";

import AuthContext from "../../storage/auth-context";
import Modal from "../commonUI/Modal";
import AnnounceService from "../../services/AnnouncementService";
import TextInput from "../commonUI/TextInput";

const AddAnnounceModal = ({
  onHide,
  openModal,
  setAddAnnounceModal,
  getAnnouncesData,
  orderLength,
}) => {
  const [state, setState] = useState({
    enteredText: "",
    enteredTextFrench: "",
    enteredTextDutch: "",
  });

  const { setIsLoading } = useContext(AuthContext);

  const postAnnounceData = () => {
    const announceData = {
      orderNo: orderLength,
      text: state.enteredText,
      textDutch: state.enteredTextDutch,
      textFrench: state.enteredTextFrench,
      status: "DRAFT",
    };

    setIsLoading(true);

    AnnounceService.createAnnouncement(announceData).then((response) => {
      if (response.status === 200) {
        setIsLoading(false);
        setAddAnnounceModal(false);
        getAnnouncesData();
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <>
      <Modal
        onHide={onHide}
        openModal={openModal}
        title="New Announce Add Form"
        acceptTypo="Add Announce"
        onRequest={postAnnounceData}
      >
        <Box
          component="form"
          sx={{
            margin: "0px 5px",
            "& > :not(style)": {
              m: 1,
              display: "flex",
              flexDirection: "column",
              width: "100%",
              margin: "15px 0px",
            },
          }}
          noValidate
          autoComplete="off"
        >
          <TextInput
            name="enteredText"
            onChange={handleChange}
            value={state.enteredText}
            label="Announce English"
            minRows={3}
          />
          <TextInput
            name="enteredTextDutch"
            onChange={handleChange}
            value={state.enteredTextDutch}
            label="Announce Dutch"
            minRows={3}
          />
          <TextInput
            name="enteredTextFrench"
            onChange={handleChange}
            value={state.enteredTextFrench}
            label="Announce French"
            minRows={3}
          />
        </Box>
      </Modal>
    </>
  );
};

export default AddAnnounceModal;
