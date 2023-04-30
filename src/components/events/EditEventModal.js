import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import EventService from "../../services/EventService";
import Modal from "../commonUI/Modal";
import ImageModal from "../commonUI/ImageModal";
import AddPoster from "../commonUI/AddPoster";
import ArtistService from "../../services/ArtistService";
import VenueService from "../../services/VenueService";
import { formatIso } from "../../configs/config";

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
    ticketUrl: eventData.ticketUrl,
    title: eventData.title,
    titleDutch: eventData.titleDutch,
    titleFrench: eventData.titleFrench,
  });
  const [clientStatus, setClientStatus] = useState(eventData.clientStatus);
  const [isHighlighted, setIsHighlighted] = useState(eventData.highlighted);
  const [fileData, setFileData] = useState(null);
  const [eventImageData, setEventImageData] = useState([]);
  const [imageData, setImageData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [startTime, setStartTime] = useState(dayjs("2023-06-17T20:30"));
  const [endTime, setEndTime] = useState(dayjs("2023-06-17T22:30"));
  const [artistList, setArtistList] = useState([]);
  const [venueList, setVenueList] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(eventData?.artist?.id);
  const [selectedVenue, setSelectedVenue] = useState(eventData?.venue?.id);

  useEffect(() => {
    ArtistService.getArtistsList().then(
      (response) =>
        response.status === 200 && setArtistList(response.data.content)
    );

    VenueService.getVenues().then(
      (response) =>
        response.status === 200 && setVenueList(response.data.content)
    );
  }, []);

  const updateEventData = () => {
    const times = formatIso(startTime, endTime);

    const updatedData = {
      id: eventData.id,
      clientStatus: clientStatus,
      startTime: times.startIso,
      endTime: times.endIso,
      highlighted: isHighlighted,
      posterIds: null,
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

  const handleCloseModal = () => {
    setShowModal(false);
    setImageData(null);
  };

  const changeSelectedArtist = (event) => {
    setSelectedArtist(event.target.value);
  };

  const changeSelectedVenue = (event) => {
    setSelectedVenue(event.target.value);
  };

  console.log("titles-->", state.titleDutch, state.titleFrench );

  console.log("event DATA-->", eventData);

  return (
    <>
      <Modal
        onHide={onHide}
        openModal={openModal}
        title={"Add event"}
        onRequest={updateEventData}
      >
        <Box
          component="form"
          sx={{
            "& > :not(style)": {
              m: 1,
              display: "flex",
              flexDirection: "column",
              width: "50rem",
              margin: "24px 16px",
            },
          }}
          noValidate
          autoComplete="off"
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
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <FormControl sx={{ width: "47%" }}>
              <InputLabel id="demo-simple-select-label">Artist</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedArtist}
                label="Artist"
                onChange={changeSelectedArtist}
              >
                {artistList.map((artist) => {
                  return (
                    <MenuItem key={artist.id} value={artist.id}>
                      {artist.fullName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl sx={{ width: "47%" }}>
              <InputLabel id="demo-simple-select-label">Venue</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedVenue}
                label="Venue"
                onChange={changeSelectedVenue}
              >
                {venueList.map((venue) => {
                  return (
                    <MenuItem key={venue.id} value={venue.id}>
                      {venue.country} , {venue.country} / {venue.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
              <DateTimePicker
                label="Start Time"
                value={startTime}
                onChange={(newValue) => setStartTime(newValue)}
                renderInput={(props) => (
                  <TextField sx={{ width: "30%" }} {...props} />
                )}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
              <DateTimePicker
                label="End Time"
                value={endTime}
                onChange={(newValue) => setEndTime(newValue)}
                renderInput={(props) => (
                  <TextField sx={{ width: "30%" }} {...props} />
                )}
              />
            </LocalizationProvider>
            <FormControl sx={{ width: "30%" }}>
              <InputLabel id="demo-simple-select-label">
                Event Status
              </InputLabel>
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
          </div>

          <TextField
            name="ticketUrl"
            onChange={handleChange}
            value={state.ticketUrl}
            id="standard-basic"
            label="Ticket Url"
            variant="outlined"
            multiline={true}
          />
        </Box>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <AddPoster
            setImageData={setImageData}
            setShowModal={setShowModal}
            imagesData={eventImageData}
            setFileData={setFileData}
            setImagesData={setEventImageData}
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
        </div>
      </Modal>
      {showModal && (
        <ImageModal
          imageData={imageData}
          onOpen={showModal}
          onClose={handleCloseModal}
          fileData={fileData}
          setImagesData={setEventImageData}
          posterType="EVENT_DEFAULT"
        />
      )}
    </>
  );
};

export default EditEventModal;
