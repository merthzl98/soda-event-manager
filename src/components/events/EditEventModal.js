import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// import dayjs from "dayjs";

import EventService from "../../services/EventService";
import EventServiceV2 from "../../services/v2/EventService";
import Modal from "../commonUI/Modal";
import ImageModal from "../commonUI/ImageModal";
import AddPoster from "../commonUI/AddPoster";
import ArtistService from "../../services/ArtistService";
import VenueService from "../../services/VenueService";
import ArtistServiceV2 from "../../services/v2/ArtistService";
import VenueServiceV2 from "../../services/v2/VenueService";
import { formatIso } from "../../utils";
import SwitchButtonUI from "../commonUI/SwitchButtonUI";
import TextInput from "../commonUI/TextInput";
import InputTab from "../commonUI/InputTab";
import DatePicker from "../commonUI/DatePicker";
import { clientStatusConfig, statusConfig } from "../../configs/config";
import SelectInputUI from "../commonUI/SelectInputUI";

const EditEventModal = ({
  onHide,
  openModal,
  setEditEventModal,
  getEventsData,
  eventId,
}) => {
  const [title, setTitle] = useState();
  const [titleFrench, setTitleFrench] = useState();
  const [titleDutch, setTitleDutch] = useState();
  const [ticketUrl, setTicketUrl] = useState();
  const [clientStatus, setClientStatus] = useState("AVAILABLE");
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [fileData, setFileData] = useState();
  const [eventImageData, setEventImageData] = useState();
  const [imageData, setImageData] = useState();
  const [isShownImageModal, setIsShownImageModal] = useState(false);
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [artistList, setArtistList] = useState([]);
  const [venueList, setVenueList] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState();
  const [selectedVenue, setSelectedVenue] = useState();
  const [isHidingAddModal, setIsHidingAddModal] = useState(false);
  const [eventStatus, setEventStatus] = useState("DRAFT");
  const [posterType, setPosterType] = useState("");
  const [description, setDescription] = useState();
  const [descriptionFrench, setDescriptionFrench] = useState();
  const [descriptionDutch, setDescriptionDutch] = useState();

  useEffect(() => {
    isShownImageModal ? setIsHidingAddModal(true) : setIsHidingAddModal(false);
  }, [isShownImageModal]);

  useEffect(() => {
    EventServiceV2.getEventById(eventId).then((response) => {
      console.log({ response });
      setTitle(response.data.event.title);
      setTitleFrench(response.data.event.titleFrench);
      setTitleDutch(response.data.event.titleDutch);
      setDescription(response.data.event.description);
      setDescriptionFrench(response.data.event.descriptionFrench);
      setDescriptionDutch(response.data.event.descriptionDutch);
      setTicketUrl(response.data.event.ticketUrl);
      setClientStatus(response.data.event.clientStatus);
      setEventStatus(response.data.event.status);
      setIsHighlighted(response.data.event.highlighted);
      setStartTime(response.data.event.startTime);
      setEndTime(response.data.event.endTime);
      setEventImageData(response.data.event.posters);
    });

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

  const updateEventData = () => {
    const times = formatIso(startTime, endTime);

    const posterIds = eventImageData.map((item) => item.id);

    const updatedData = {
      id: eventId,
      clientStatus: clientStatus,
      startTime: times.startIso,
      endTime: times.endIso,
      highlighted: isHighlighted,
      posterIds: posterIds,
      ticketUrl: ticketUrl,
      title: title,
      titleFrench: titleFrench,
      titleDutch: titleDutch,
      status: eventStatus,
      description: description,
      descriptionFrench: descriptionFrench,
      descriptionDutch: descriptionDutch,
    };

    EventServiceV2.updateEvent(updatedData).then((response) => {
      if (response.status === 200) {
        setEditEventModal(false);
        getEventsData();
      }
    });
  };

  const changeEventStatus = (event) => {
    setEventStatus(event.target.value);
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
        <TextInput
          name="title"
          onChange={(event) => setTitle(event.target.value)}
          value={title}
          label="Title"
          multiline={true}
        />
        <TextInput
          name="titleFrench"
          onChange={(event) => setTitleFrench(event.target.value)}
          value={titleFrench}
          label="Title French"
          multiline={true}
        />
        <TextInput
          name="titleDutch"
          onChange={(event) => setTitleDutch(event.target.value)}
          value={titleDutch}
          label="Title Dutch"
          multiline={true}
        />

        <InputTab
          englishDescription={description}
          setEnglishDescription={setDescription}
          frenchDescription={descriptionFrench}
          setFrenchDescription={setDescriptionFrench}
          dutchDescription={descriptionDutch}
          setDutchDescription={setDescriptionDutch}
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
            gap: "2rem",
          }}
        >
          <SelectInputUI
            label="Live Status"
            width="200px"
            value={clientStatus}
            setValue={setClientStatus}
            data={clientStatusConfig}
          />
          <SwitchButtonUI
            isChecked={isHighlighted}
            setIsChecked={setIsHighlighted}
            switchLabel="Highlighted"
          />
          <SelectInputUI
            label="Event Status"
            width="100px"
            value={eventStatus}
            setValue={setEventStatus}
            data={statusConfig}
          />
        </div>

        <TextInput
          name="ticketUrl"
          onChange={(event) => setTicketUrl(event.target.value)}
          value={ticketUrl}
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

export default EditEventModal;
