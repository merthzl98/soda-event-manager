import React, { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import AuthContext from "../../storage/auth-context";
import Modal from "../commonUI/Modal";
import EventService from "../../services/EventService";
import ImageModal from "../commonUI/ImageModal.js";
// import PosterService from "../../services/PosterService";
import ArtistService from "../../services/ArtistService";
import VenueService from "../../services/VenueService";
import AddPoster from "../commonUI/AddPoster";
import { formatIso } from "../../configs/config";
import TextInput from "../commonUI/TextInput";
import SwitchToggle from "../commonUI/SwitchToggle";
import "./Events.scss";

const AddEventModal = ({
  onHide,
  openModal,
  setAddEventModal,
  getEventsData,
}) => {
  const [state, setState] = useState({
    ticketUrl: "",
    title: "",
    titleDutch: "",
    titleFrench: "",
  });

  const [clientStatus, setClientStatus] = useState("");
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [startTime, setStartTime] = useState(dayjs("2023-06-17T20:30"));
  const [endTime, setEndTime] = useState(dayjs("2023-06-17T22:30"));
  const [isShownImageModal, setIsShownImageModal] = useState(false);
  const [imageData, setImageData] = useState(null);
  const [selectedArtist, setSelectedArtist] = useState("");
  const [selectedVenue, setSelectedVenue] = useState("");
  const [artistList, setArtistList] = useState([]);
  const [venueList, setVenueList] = useState([]);
  const [fileData, setFileData] = useState(null);
  const [eventImageData, setEventImageData] = useState([]);
  const [posterType, setPosterType] = useState("");

  const { setIsLoading } = useContext(AuthContext);

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

  // console.log("eventImageData", eventImageData);

  const postEventData = () => {
    const times = formatIso(startTime, endTime);

    // console.log("times-*->", times);

    const postersIds = eventImageData.map((item) => item.id);
    // console.log("postersIds-->",postersIds);

    const eventData = {
      clientStatus: clientStatus,
      artistId: selectedArtist,
      venueId: selectedVenue,
      startTime: times.startIso,
      endTime: times.endIso,
      highlighted: isHighlighted,
      posterIds: postersIds,
      ticketUrl: state.ticketUrl,
      title: state.title,
      titleFrench: state.titleFrench,
      titleDutch: state.titleDutch,
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

  const changePosterType = (event) => {
    setPosterType(event.target.value);
  };

  const changeSelectedArtist = (event) => {
    setSelectedArtist(event.target.value);
  };

  const changeSelectedVenue = (event) => {
    setSelectedVenue(event.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleCloseModal = () => {
    setIsShownImageModal(false);
    setImageData(null);
    setPosterType("");
  };

  // console.log("times", startTime, endTime);

  console.log("selected Artist-->", selectedArtist);
  console.log("selected Venue-->", selectedVenue);

  const selectStyle = {
    backgroundColor: "rgba(85, 85, 85, 0.1)",
    borderRadius: "4px",
    border: "1px solid #ced4da",
    padding: "4px 8px !important",
  };

  const labelStyle = {
    fontWeight: "700 !important",
    color: "rgba(0, 0, 0, 0.6)",
    fontSize: "1rem",
  };

  return (
    <>
      <Modal
        onHide={onHide}
        openModal={openModal}
        title="New Event Add Form"
        acceptTypo="Add Event"
        onRequest={postEventData}
      >
        <Box
          component="form"
          sx={{
            borderBottom: "1px dashed rgba(197, 196, 196, 0.8)",
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
            name="title"
            onChange={handleChange}
            value={state.title}
            label="Title"
            multiline={true}
          />
          <TextInput
            name="titleFrench"
            onChange={handleChange}
            value={state.titleFrench}
            label="Title French"
            multiline={true}
          />
          <TextInput
            name="titleDutch"
            onChange={handleChange}
            value={state.titleDutch}
            label="Title Dutch"
            multiline={true}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <FormControl sx={{ width: "47%" }} variant="standard">
              <InputLabel sx={labelStyle} id="demo-simple-select-label">
                Artist
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedArtist}
                label="Artist"
                onChange={changeSelectedArtist}
                sx={selectStyle}
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
            <FormControl sx={{ width: "47%" }} variant="standard">
              <InputLabel sx={labelStyle} id="demo-simple-select-label">
                Venue
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedVenue}
                label="Venue"
                onChange={changeSelectedVenue}
                sx={selectStyle}
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
                  <TextField
                    variant="standard"
                    sx={{
                      width: "47%",
                    }}
                    {...props}
                  />
                )}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
              <DateTimePicker
                label="End Time"
                value={endTime}
                onChange={(newValue) => setEndTime(newValue)}
                renderInput={(props) => (
                  <TextField sx={{ width: "47%" }} {...props} />
                )}
              />
            </LocalizationProvider>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "left",
              gap: "3rem",
            }}
          >
            <FormControl sx={{ width: "30%" }} variant="standard">
              <InputLabel sx={labelStyle} id="demo-simple-select-label">
                Event Status
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={clientStatus}
                label="Event Status"
                onChange={changeClientStatus}
                sx={selectStyle}
              >
                <MenuItem value="CANCELLED">Cancelled</MenuItem>
                <MenuItem value="LAST_TICKETS">Last Tickets</MenuItem>
                <MenuItem value="SOLD_OUT">Sold Out</MenuItem>
              </Select>
            </FormControl>
            <SwitchToggle
              isChecked={isHighlighted}
              setIsChecked={setIsHighlighted}
              switchLabel="Highlighted"
            />
          </div>

          <TextInput
            name="ticketUrl"
            onChange={handleChange}
            value={state.ticketUrl}
            label="Ticket Url"
            multiline={true}
          />
        </Box>

        <AddPoster
          setImageData={setImageData}
          setIsShownImageModal={setIsShownImageModal}
          imagesData={eventImageData}
          setFileData={setFileData}
          setImagesData={setEventImageData}
        />
      </Modal>
      {isShownImageModal && (
        <ImageModal
          imageData={imageData}
          onOpen={isShownImageModal}
          onClose={handleCloseModal}
          fileData={fileData}
          setImagesData={setEventImageData}
          posterType={posterType}
          changePosterType={changePosterType}
          setPosterType={setPosterType}
        />
      )}
    </>
  );
};

export default AddEventModal;
