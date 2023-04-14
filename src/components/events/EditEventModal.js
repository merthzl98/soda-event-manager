import React, { useState } from "react";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import EventService from "../../services/EventService";
import Modal from "../commonUI/Modal";

const SwitchHighlighted = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&:before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    "&:after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
}));

const EditEventModal = ({
  onHide,
  openModal,
  setEditEventModal,
  eventData,
  getEventsData,
}) => {
  const [state, setState] = useState({
    endTime: eventData.endTime,
    startTime: eventData.startTime,
    ticketUrl: eventData.ticketUrl,
    title: eventData.title,
    titleDutch: eventData.titleDutch,
    titleFrench: eventData.titleFrench,
  });
  const [clientStatus, setClientStatus] = useState(eventData.clientStatus);
  const [isHighlighted, setIsHighlighted] = useState(eventData.highlighted);

  const updateEventData = () => {
    const updatedData = {
      // id: eventData.id,
      clientStatus: clientStatus,
      endTime: state.endTime,
      highlighted: isHighlighted,
      posterIds: null,
      startTime: state.startTime,
      ticketUrl: state.ticketUrl,
      title: state.title,
      titleFrench: state.titleFrench,
      titleDutch: state.titleDutch,
    };
    EventService.updateEvent(updatedData).then((response) => {
      if (response.status === 200) {
        setEditEventModal(false);
        getEventsData();
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const switchHighlighted = (event) => {
    setIsHighlighted(event.target.checked);
  };

  const changeClientStatus = (event) => {
    setClientStatus(event.target.value);
  };

  return (
    <Modal
      onHide={onHide}
      openModal={openModal}
      title={"Edit event"}
      onRequest={updateEventData}
    >
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            gap: "5rem",
            justifyContent: "space-between",
          }}
        >
          <TextField
            name="title"
            onChange={handleChange}
            value={state.title}
            id="standard-basic"
            label="Title"
            variant="outlined"
            multiline={true}
          />
          <TextField
            name="titleFrench"
            onChange={handleChange}
            value={state.titleFrench}
            id="standard-basic"
            label="Title French"
            variant="outlined"
            multiline={true}
          />
          <TextField
            name="titleDutch"
            onChange={handleChange}
            value={state.titleDutch}
            id="standard-basic"
            label="Title Dutch"
            variant="outlined"
            multiline={true}
          />

          <FormControlLabel
            control={
              <SwitchHighlighted
                checked={isHighlighted}
                onChange={switchHighlighted}
              />
            }
            label="Highlighted"
          />
        </Box>
        <TextField
          name="startTime"
          onChange={handleChange}
          value={state.startTime}
          id="standard-basic"
          label="startTime"
          variant="standard"
        />
        <TextField
          name="endTime"
          onChange={handleChange}
          value={state.endTime}
          id="standard-basic"
          label="endTime"
          variant="standard"
        />
        <TextField
          name="posterIds"
          onChange={handleChange}
          value={state.posterIds}
          id="standard-basic"
          label="posterIds"
          variant="standard"
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Event Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={clientStatus}
            label="Event Status"
            onChange={changeClientStatus}
          >
            <MenuItem value={"CANCELLED"}>Cancelled</MenuItem>
            <MenuItem value={"LAST_TICKETS"}>Last Tickets</MenuItem>
            <MenuItem value={"SOLD_OUT"}>Sold Out</MenuItem>
          </Select>
        </FormControl>
        <TextField
          name="ticketUrl"
          onChange={handleChange}
          value={state.ticketUrl}
          id="standard-basic"
          label="ticketUrl"
          variant="standard"
        />
      </Box>
    </Modal>
  );
};

export default EditEventModal;
