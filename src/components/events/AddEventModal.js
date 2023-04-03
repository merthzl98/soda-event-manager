import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import AuthContext from "../../storage/auth-context";
import Modal from "../commonUI/Modal";
import EventService from "../../services/EventService";

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

const AddEventModal = ({
  onHide,
  openModal,
  setAddEventModal,
  getEventsData,
}) => {
  const [state, setState] = useState({
    endTime: "",
    posterIds: [""],
    ticketUrl: "",
    title: "",
  });

  const [clientStatus, setClientStatus] = useState("");
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [startTime, setStartTime] = useState(dayjs("2023-06-17T20:30"));
  const [endTime, setEndTime] = useState(dayjs("2023-06-17T22:30"));

  const { setIsLoading } = useContext(AuthContext);

  const postEventData = () => {
    const eventData = {
      clientStatus: clientStatus,
      endTime: state.endTime,
      highlighted: isHighlighted,
      posterIds: null,
      startTime: state.startTime,
      ticketUrl: state.ticketUrl,
      title: state.title,
    };

    setIsLoading(true);

    EventService.createEvent(eventData).then((response) => {
      if (response.status === 200) {
        setIsLoading(false);
        setAddEventModal(false);
        getEventsData();
      }
    });
  };

  const changeClientStatus = (event) => {
    setClientStatus(event.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const switchHighlighted = (event) => {
    setIsHighlighted(event.target.checked);
  };

  // console.log("start time-->", startTime);

  // console.log("end time-->", endTime);

  return (
    <>
      <Modal
        onHide={onHide}
        openModal={openModal}
        title={"Add event"}
        onRequest={postEventData}
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
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Artist</InputLabel>
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
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Venue</InputLabel>
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
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
            <DateTimePicker
              label="Start Time"
              value={startTime}
              onChange={(newValue) => setStartTime(newValue)}
              renderInput={(props) => <TextField {...props} />}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
            <DateTimePicker
              label="End Time"
              value={endTime}
              onChange={(newValue) => setEndTime(newValue)}
              renderInput={(props) => <TextField {...props} />}
            />
          </LocalizationProvider>

          <TextField
            name="ticket-url"
            onChange={handleChange}
            value={state.ticketUrl}
            id="standard-basic"
            label="Ticket Url"
            variant="outlined"
            multiline={true}
          />
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
            name="posterIds"
            onChange={handleChange}
            value={state.posterIds}
            id="standard-basic"
            label="posterIds"
            variant="standard"
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
      </Modal>
    </>
  );
};

export default AddEventModal;
