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
    enteredOrderNo: announceData.orderNo,
    enteredText: announceData.text,
  });
  const [announceStatus, setAnnounceStatus] = useState("");

  const updateAnnounceData = () => {
    const updatedData = {
      id: announceData.id,
      text: state.enteredText,
      orderNo: state.enteredOrderNo,
      status: announceStatus,
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
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          name="enteredText"
          onChange={handleChange}
          value={state.enteredText}
          id="standard-basic"
          label="Text"
          variant="standard"
        />
        <TextField
          name="enteredOrderNo"
          onChange={handleChange}
          value={state.enteredOrderNo}
          id="standard-basic"
          label="Order No"
          variant="standard"
        />
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
      </Box>
    </Modal>
  );
};

export default EditAnnounceModal;
