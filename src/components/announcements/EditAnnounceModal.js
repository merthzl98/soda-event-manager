import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import AnnounceService from "../../services/AnnouncementService";
import Modal from "../commonUI/Modal";
import TextInput from "../commonUI/TextInput";

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
      title="Edit Announce Information"
      acceptTypo="Save Changes"
      onRequest={updateAnnounceData}
    >
      <Box
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
        <FormControl
          sx={{
            width: "10rem !important",
            margin: "8px 16px",
          }}
          variant="standard"
        >
          <InputLabel
            sx={{
              fontWeight: "700 !important",
              color: "rgba(0, 0, 0, 0.6)",
              fontSize: "1rem",
            }}
            id="demo-simple-select-label"
          >
            Annnounce Status
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={announceStatus}
            label="Announce Status"
            onChange={changeAnnounceStatus}
            sx={{
              backgroundColor: "rgba(85, 85, 85, 0.1)",
              borderRadius: "4px",
              border: "1px solid #ced4da",
              padding: "4px 8px !important",
            }}
          >
            <MenuItem value={"DRAFT"} sx={{ paddingLeft: "15px !important" }}>
              Draft
            </MenuItem>
            <MenuItem value={"PREVIEW"}>Preview</MenuItem>
            <MenuItem value={"LIVE"}>Live</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Modal>
  );
};

export default EditAnnounceModal;
