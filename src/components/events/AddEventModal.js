import React, { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";

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
import SwitchButtonUI from "../commonUI/SwitchButtonUI";
import InputTab from "../commonUI/InputTab";
import DatePicker from "../commonUI/DatePicker";
import { clientStatusConfig } from "../../configs/config";
import SelectInputUI from "../commonUI/SelectInputUI";
import AutoComplete from "../commonUI/AutoComplete";

const currentTime = new Date().toISOString();

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
  const [startTime, setStartTime] = useState(currentTime);
  const [endTime, setEndTime] = useState(currentTime);
  const [isShownImageModal, setIsShownImageModal] = useState(false);
  const [imageData, setImageData] = useState(null);
  const [selectedArtist, setSelectedArtist] = useState();
  const [selectedVenue, setSelectedVenue] = useState();
  const [artistList, setArtistList] = useState([]);
  const [venueList, setVenueList] = useState([]);
  const [inputArtist, setInputArtist] = useState("");
  const [inputVenue, setInputVenue] = useState("");
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
    ArtistServiceV2.getArtistsList(inputArtist, null, null, null).then(
      (response) =>
        response.status === 200 &&
        setArtistList(response.data.artistsPage.content)
    );
  }, [inputArtist]);

  useEffect(() => {
    VenueServiceV2.getVenues(null, null, null, inputVenue, null).then(
      (response) =>
        response.status === 200 &&
        setVenueList(response.data.venuesPage.content)
    );
  }, [inputVenue]);

  const postEventData = () => {
    const times = formatIso(startTime, endTime);

    const postersIds = eventImageData.map((item) => item.id);

    const eventData = {
      clientStatus: clientStatus,
      artistId: selectedArtist.id,
      venueId: selectedVenue.id,
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleCloseModal = () => {
    setIsShownImageModal(false);
    setImageData(null);
    setPosterType("");
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
        <Box
          sx={{
            width: "99.89%",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <AutoComplete
            value={selectedArtist}
            setValue={setSelectedArtist}
            inputValue={inputArtist}
            setInputValue={setInputArtist}
            options={artistList}
            handleOption={(option) => option.fullName}
            label="Artist"
          />
          <AutoComplete
            value={selectedVenue}
            setValue={setSelectedVenue}
            inputValue={inputVenue}
            setInputValue={setInputVenue}
            options={venueList}
            handleOption={(option) => option.name}
            label="Venue"
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            width: "100%",
            gap: "48px",
            paddingBottom: "5px",
          }}
        >
          <DatePicker
            label="Start Time"
            time={startTime}
            setTime={setStartTime}
            width="%100"
          />
          <DatePicker
            label="End Time"
            time={endTime}
            setTime={setEndTime}
            width="%100"
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "flex-end",
            gap: "48px",
            paddingBottom: "5px",
          }}
        >
          <SelectInputUI
            label="Live Status"
            width="225px"
            value={clientStatus}
            setValue={setClientStatus}
            data={clientStatusConfig}
          />
          <SwitchButtonUI
            isChecked={isHighlighted}
            setIsChecked={setIsHighlighted}
            switchLabel="Highlighted"
          />
        </Box>

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
