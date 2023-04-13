import React, { useState, useContext, useRef, useEffect } from "react";
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
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";

import AuthContext from "../../storage/auth-context";
import Modal from "../commonUI/Modal";
import EventService from "../../services/EventService";
import ImageModal from "./ImageModal";
// import PosterService from "../../services/PosterService";
import ArtistService from "../../services/ArtistService";
import VenueService from "../../services/VenueService";

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
    posterIds: [""],
    ticketUrl: "",
    title: "",
    titleDutch: "",
    titleFrench: "",
  });

  const [clientStatus, setClientStatus] = useState("");
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [startTime, setStartTime] = useState(dayjs("2023-06-17T20:30"));
  const [endTime, setEndTime] = useState(dayjs("2023-06-17T22:30"));
  const [posterList, setPosterList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [imageData, setImageData] = useState(null);
  const [selectedArtist, setSelectedArtist] = useState("");
  const [selectedVenue, setSelectedVenue] = useState("");
  const [artistList, setArtistList] = useState([]);
  const [venueList, setVenueList] = useState([]);

  const fileInputRef = useRef(null);

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

  const postEventData = () => {
    const eventData = {
      clientStatus: clientStatus,
      artistId: selectedArtist,
      venueId: selectedVenue,
      startTime: startIso,
      endTime: endIso,
      highlighted: isHighlighted,
      posterIds: null,
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

  const switchHighlighted = (event) => {
    setIsHighlighted(event.target.checked);
  };

  const handleClickImage = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageInfo = { name: file.name, data: e.target.result };
      // setPosterList((prevList) => [...prevList, imageInfo]);
      setImageData(imageInfo);
      setShowModal(true); // show the modal after adding the image to the list
    };
    reader.readAsDataURL(file);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setImageData(null);
  };

  const handleDeletePoster = (posterIndex) => {
    //delete from server this line
    // PosterService.deletePoster(posterId);

    const filteredPosters = posterList.filter(
      (poster, index) => index !== posterIndex
    );

    setPosterList(filteredPosters);
  };

  const startTimeString = startTime.toString();
  const endTimeString = endTime.toString();

  const start = new Date(startTimeString);
  const end = new Date(endTimeString);

  const startIso = start.toISOString();
  const endIso = end.toISOString();

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
              width: "23rem",
              margin: "16px",
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

          <FormControl fullWidth>
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
          <FormControl fullWidth>
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
            label="Ticket Url"
            variant="outlined"
            multiline={true}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              {" "}
              <Button
                onClick={handleClickImage}
                sx={{ width: "10rem" }}
                variant="contained"
                startIcon={<AddCircleIcon />}
              >
                Add Poster
              </Button>
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </div>
            <div>
              {" "}
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
          </div>

          {/* {imageData && <img src={imageData} alt="Uploaded" />} */}

          <List
            sx={{
              width: "100%",
              maxWidth: "23rem",
              bgcolor: "background.paper",
            }}
          >
            {posterList.map((poster, index) => (
              <ListItem
                key={poster.name}
                disableGutters
                secondaryAction={
                  <IconButton
                    onClick={() => handleDeletePoster(index)}
                    aria-label="comment"
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  sx={{
                    textDecoration: "underline",
                    color: "purple",
                    margin: "0px 16px",
                    cursor: "pointer",
                  }}
                  primary={`${poster.name}`}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Modal>
      {showModal && (
        <ImageModal
          imageData={imageData}
          onOpen={showModal}
          onClose={handleCloseModal}
          setPosterList={setPosterList}
        />
      )}
    </>
  );
};

export default AddEventModal;
