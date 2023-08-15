import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import AnnounceService from "../../services/AnnouncementService";
import AnnouncementServiceV2 from "../../services/v2/AnnouncementService";
import Modal from "../commonUI/Modal";
import TextInput from "../commonUI/TextInput";

const EditAnnouncementModal = ({
  onHide,
  openModal,
  setEditAnnouncementModal,
  getAnnouncementsData,
  announcementId,
}) => {
  const [state, setState] = useState({
    enteredText: "",
    enteredTextFrench: "",
    enteredTextDutch: "",
    enteredHighlightedText: "",
    enteredHighlightedTextFrench: "",
    enteredHighlightedTextDutch: "",
  });
  const [announcementStatus, setAnnouncementStatus] = useState("DRAFT");

  useEffect(() => {
    AnnouncementServiceV2.getAnnoucementById(announcementId).then(
      (response) => {
        setState({
          enteredText: response.data.announcement.text,
          enteredTextFrench: response.data.announcement.textFrench,
          enteredTextDutch: response.data.announcement.textDutch,
          enteredHighlightedText: response.data.announcement.highlightedText,
          enteredHighlightedTextFrench:
            response.data.announcement.highlightedTextFrench,
          enteredHighlightedTextDutch:
            response.data.announcement.highlightedTextDutch,
        });
        setAnnouncementStatus(response.data.announcement.status);
      }
    );
  }, []);

  const updateAnnouncementData = () => {
    const updatedData = {
      id: announcementId,
      status: announcementStatus,
      text: state.enteredText,
      textDutch: state.enteredTextDutch,
      textFrench: state.enteredTextFrench,
      highlightedText: state.enteredHighlightedText,
      highlightedTextDutch: state.enteredHighlightedTextDutch,
      highlightedTextFrench: state.enteredHighlightedTextFrench,
    };
    AnnouncementServiceV2.updateAnnouncement(updatedData).then((response) => {
      if (response.status === 200) {
        setEditAnnouncementModal(false);
        getAnnouncementsData();
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const changeAnnouncementStatus = (event) => {
    setAnnouncementStatus(event.target.value);
  };

  return (
    <Modal
      onHide={onHide}
      openModal={openModal}
      title="Edit Announce Information"
      acceptTypo="Save Changes"
      onRequest={updateAnnouncementData}
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
          name="enteredHighlightedText"
          onChange={handleChange}
          value={state.enteredHighlightedText}
          label="Highlighted Eng"
          minRows={1}
        />
        <TextInput
          name="enteredHighlightedTextFrench"
          onChange={handleChange}
          value={state.enteredHighlightedTextFrench}
          label="Highlighted French"
          minRows={1}
        />
        <TextInput
          name="enteredHighlightedTextDutch"
          onChange={handleChange}
          value={state.enteredHighlightedTextDutch}
          label="Highlighted Dutch"
          minRows={1}
        />
        <TextInput
          name="enteredText"
          onChange={handleChange}
          value={state.enteredText}
          label="Eng"
          minRows={1}
        />
        <TextInput
          name="enteredTextFrench"
          onChange={handleChange}
          value={state.enteredTextFrench}
          label="French"
          minRows={1}
        />
        <TextInput
          name="enteredTextDutch"
          onChange={handleChange}
          value={state.enteredTextDutch}
          label="Dutch"
          minRows={1}
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
            value={announcementStatus}
            label="Announce Status"
            onChange={changeAnnouncementStatus}
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

export default EditAnnouncementModal;
