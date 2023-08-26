import React, { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import dayjs from "dayjs";

import AuthContext from "../../storage/auth-context";
import Modal from "../commonUI/Modal";
import EventServiceV2 from "../../services/v2/EventService";
import ImageModal from "../commonUI/ImageModal.js";
// import PosterService from "../../services/PosterService";
import ArtistServiceV2 from "../../services/v2/ArtistService";
import VenueServiceV2 from "../../services/v2/VenueService";
import AddPoster from "../commonUI/AddPoster";
import { formatIso } from "../../utils";
import TextInput from "../commonUI/TextInput";
import SwitchToggle from "../commonUI/SwitchToggle";
import InputTab from "../commonUI/InputTab";
import DatePicker from "../commonUI/DatePicker";

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

  const [clientStatus, setClientStatus] = useState("AVAILABLE");
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [startTime, setStartTime] = useState(dayjs("2023-06-17T20:30"));
  const [endTime, setEndTime] = useState(dayjs("2023-06-17T22:30"));
  const [isShownImageModal, setIsShownImageModal] = useState(false);
  const [imageData, setImageData] = useState(null);
  const [selectedArtist, setSelectedArtist] = useState();
  const [selectedVenue, setSelectedVenue] = useState();
  const [artistList, setArtistList] = useState([]);
  const [venueList, setVenueList] = useState([]);
  const [fileData, setFileData] = useState(null);
  const [eventImageData, setEventImageData] = useState([]);
  const [posterType, setPosterType] = useState("");
  const [isHidingAddModal, setIsHidingAddModal] = useState(false);
  const [englishDescription, setEnglishDescription] = useState("");
  const [frenchDescription, setFrenchDescription] = useState("");
  const [dutchDescription, setDutchDescription] = useState("");

  useEffect(() => {
    isShownImageModal ? setIsHidingAddModal(true) : setIsHidingAddModal(false);
  }, [isShownImageModal]);

  const { setIsLoading } = useContext(AuthContext);

  useEffect(() => {
    ArtistServiceV2.getArtistsList().then(
      (response) =>
        response.status === 200 &&
        setArtistList(response.data.artistsPage.content)
    );

    VenueServiceV2.getVenues().then(
      (response) =>
        response.status === 200 &&
        setVenueList(response.data.venuesPage.content)
    );
  }, []);

  const postEventData = () => {
    const times = formatIso(startTime, endTime);

    const postersIds = eventImageData.map((item) => item.id);

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
      description: englishDescription,
      descriptionFrench: frenchDescription,
      descriptionDutch: dutchDescription,
      status: "DRAFT",
    };

    setIsLoading(true);

    EventServiceV2.createEvent(eventData).then((response) => {
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

  const handleCloseModal = () => {
    setIsShownImageModal(false);
    setImageData(null);
    setPosterType("");
  };

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

  const modalOpacity = isHidingAddModal ? "0" : "1";

  const modalStyle = {
    opacity: modalOpacity,
  };

  return (
    <>
      <Modal
        onHide={onHide}
        openModal={openModal}
        title="New Event Add Form"
        acceptTypo="Add Event"
        onRequest={postEventData}
        modalStyle={modalStyle}
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

        <InputTab
          englishDescription={englishDescription}
          setEnglishDescription={setEnglishDescription}
          frenchDescription={frenchDescription}
          setFrenchDescription={setFrenchDescription}
          dutchDescription={dutchDescription}
          setDutchDescription={setDutchDescription}
        />

        <FormControl variant="standard">
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
        <FormControl variant="standard">
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

        <Box>
          <DatePicker
            label="Start Time"
            time={startTime}
            setTime={setStartTime}
            width="%47"
          />
          <DatePicker
            label="End Time"
            time={endTime}
            setTime={setEndTime}
            width="%47"
          />
        </Box>
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
              Live Status
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={clientStatus}
              label="Live Status"
              onChange={changeClientStatus}
              sx={selectStyle}
            >
              <MenuItem value="AVAILABLE">Available</MenuItem>
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

export default AddEventModal;
