import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import dayjs from "dayjs";

import EventService from "../../services/EventService";
import Modal from "../commonUI/Modal";
import ImageModal from "../commonUI/ImageModal";
import AddPoster from "../commonUI/AddPoster";
import ArtistService from "../../services/ArtistService";
import VenueService from "../../services/VenueService";
import { formatIso } from "../../configs/config";
import SwitchToggle from "../commonUI/SwitchToggle";
import "./Events.scss";
import TextInput from "../commonUI/TextInput";

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
  const [clientStatus, setClientStatus] = useState(eventData?.clientStatus);
  const [isHighlighted, setIsHighlighted] = useState(eventData?.highlighted);
  const [fileData, setFileData] = useState(null);
  const [eventImageData, setEventImageData] = useState(eventData?.posters);
  const [imageData, setImageData] = useState(null);
  const [isShownImageModal, setIsShownImageModal] = useState(false);
  const [startTime, setStartTime] = useState(eventData?.startTime);
  const [endTime, setEndTime] = useState(eventData?.endTime);
  const [artistList, setArtistList] = useState([]);
  const [venueList, setVenueList] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(eventData?.artist?.id);
  const [selectedVenue, setSelectedVenue] = useState(eventData?.venue?.id);
  const [isHidingAddModal, setIsHidingAddModal] = useState(false);
  const [eventStatus, setEventStatus] = useState(eventData?.status);
  const [posterType, setPosterType] = useState("");

  useEffect(() => {
    isShownImageModal ? setIsHidingAddModal(true) : setIsHidingAddModal(false);
  }, [isShownImageModal]);

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

    const postersIds = eventImageData.map((item) => item.id);

    const updatedData = {
      id: eventData.id,
      clientStatus: clientStatus,
      startTime: times.startIso,
      endTime: times.endIso,
      highlighted: isHighlighted,
      posterIds: postersIds,
      ticketUrl: state.ticketUrl,
      title: state.title,
      titleFrench: state.titleFrench,
      titleDutch: state.titleDutch,
      status: eventStatus,
    };
    EventService.updateEvent(updatedData).then((response) => {
      if (response.status === 200) {
        setEditEventModal(false);
        getEventsData();
      }
    });
  };

  const changeEventStatus = (event) => {
    setEventStatus(event.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const changeClientStatus = (event) => {
    setClientStatus(event.target.value);
  };

  const handleCloseModal = () => {
    setIsShownImageModal(false);
    setImageData(null);
  };

  const changeSelectedArtist = (event) => {
    setSelectedArtist(event.target.value);
  };

  const changeSelectedVenue = (event) => {
    setSelectedVenue(event.target.value);
  };

  console.log("event DATA-->", eventData);

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

  const modalOpacity = isHidingAddModal ? "0" : "1";

  const modalStyle = {
    opacity: modalOpacity,
  };

  return (
    <>
      <Modal
        onHide={onHide}
        openModal={openModal}
        title="Edit Event Information"
        acceptTypo="Save Changes"
        onRequest={updateEventData}
        modalStyle={modalStyle}
      >
        <Box
          component="form"
          sx={{
            margin: "0px 5px",
            borderBottom: "1px dashed rgba(197, 196, 196, 0.8)",
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
                  <TextField sx={{ width: "47%" }} {...props} />
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
            <FormControl sx={{ width: "47%" }} variant="standard">
              <InputLabel sx={labelStyle} id="demo-simple-select-label">
                Event Condition
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={clientStatus}
                label="Event Condition"
                onChange={changeClientStatus}
                sx={selectStyle}
              >
                <MenuItem value={"CANCELLED"}>Cancelled</MenuItem>
                <MenuItem value={"LAST_TICKETS"}>Last Tickets</MenuItem>
                <MenuItem value={"SOLD_OUT"}>Sold Out</MenuItem>
              </Select>
            </FormControl>
            <SwitchToggle
              isChecked={isHighlighted}
              setIsChecked={setIsHighlighted}
              switchLabel="Highlighted"
            />
            <FormControl sx={{ width: "47%" }} variant="standard">
              <InputLabel sx={labelStyle} id="demo-simple-select-label">
                Event Status
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={eventStatus}
                label="Event Status"
                onChange={changeEventStatus}
                sx={selectStyle}
              >
                <MenuItem
                  value={"DRAFT"}
                  sx={{ paddingLeft: "15px !important" }}
                >
                  Draft
                </MenuItem>
                <MenuItem value={"PREVIEW"}>Preview</MenuItem>
                <MenuItem value={"LIVE"}>Live</MenuItem>
              </Select>
            </FormControl>
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
          setPosterType={setPosterType}
        />
      )}
    </>
  );
};

export default EditEventModal;
