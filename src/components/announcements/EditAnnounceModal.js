import React, { useState } from "react";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import AnnounceService from "../../services/AnnouncementService";
import Modal from "../commonUI/Modal";

const EditAnnounceModal = ({
  onHide,
  openModal,
  setEditAnnounceModal,
  announceData,
  getAnnouncesData,
}) => {
  const [state, setState] = useState({
    enteredText: announceData.text,
    enteredTextFrench: announceData.textFrench,
    enteredTextDutch: announceData.textDutch,
  });
  const [announceStatus, setAnnounceStatus] = useState(announceData.status);

  const updateAnnounceData = () => {
    const updatedData = {
      id: announceData.id,
      text: state.enteredText,
      orderNo: announceData.orderNo,
      status: announceStatus,
      textDutch: state.enteredTextDutch,
      textFrench: state.enteredTextFrench,
    };
    AnnounceService.updateAnnouncement(updatedData).then((response) => {
      if (response.status === 200) {
        setEditAnnounceModal(false);
        getAnnouncesData();
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const changeAnnounceStatus = (event) => {
    setAnnounceStatus(event.target.value);
  };

  return (
    <Modal
      onHide={onHide}
      openModal={openModal}
      title={"Edit Announce"}
      onRequest={updateAnnounceData}
    >
      <Box
        component="form"
        sx={{
          "& > :not(style)": {
            m: 1,
            display: "flex",
            flexDirection: "column",
            width: "20rem",
            margin: "16px",
          },
        }}
        noValidate
        autoComplete="off"
      >
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Annnounce Status
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={announceStatus}
            label="Announce Status"
            onChange={changeAnnounceStatus}
          >
            <MenuItem value={"DRAFT"}>Draft</MenuItem>
            <MenuItem value={"..."}>...</MenuItem>
            <MenuItem value={"---"}>---</MenuItem>
          </Select>
        </FormControl>
        <TextField
          name="enteredText"
          onChange={handleChange}
          value={state.enteredText}
          id="standard-basic"
          label="Announce English"
          variant="outlined"
          multiline={true}
          minRows={3}
        />
        <TextField
          name="enteredTextDutch"
          onChange={handleChange}
          value={state.enteredTextDutch}
          id="standard-basic"
          label="Announce Dutch"
          variant="outlined"
          multiline={true}
          minRows={3}
        />
        <TextField
          name="enteredTextFrench"
          onChange={handleChange}
          value={state.enteredTextFrench}
          id="standard-basic"
          label="Announce French"
          variant="outlined"
          multiline={true}
          minRows={3}
        />
      </Box>
    </Modal>
  );
};

export default EditAnnounceModal;
