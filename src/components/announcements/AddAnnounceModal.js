import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import AuthContext from "../../storage/auth-context";
import Modal from "../commonUI/Modal";
import AnnounceService from "../../services/AnnouncementService";

const AddAnnounceModal = ({
  onHide,
  openModal,
  setAddAnnounceModal,
  getAnnouncesData,
}) => {
  const [state, setState] = useState({
    enteredOrderNo: "",
    enteredText: "",
  });
  const [announceStatus, setAnnounceStatus] = useState("DRAFT");

  const { setIsLoading } = useContext(AuthContext);

  const postAnnounceData = () => {
    const announceData = {
      orderNo: state.enteredOrderNo,
      text: state.enteredText,
      announceStatus: announceStatus,
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

  const changeAnnounceStatus = (event) => {
    setAnnounceStatus(event.target.value);
  };

  return (
    <>
      <Modal
        onHide={onHide}
        openModal={openModal}
        title={"Add Announce"}
        onRequest={postAnnounceData}
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
    </>
  );
};

export default AddAnnounceModal;
