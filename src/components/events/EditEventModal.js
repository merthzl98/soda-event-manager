import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";

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
import AutoComplete from "../commonUI/AutoComplete";

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
  const [selectedArtist, setSelectedArtist] = useState("");
  const [selectedVenue, setSelectedVenue] = useState("");
  const [inputArtist, setInputArtist] = useState("");
  const [inputVenue, setInputVenue] = useState("");
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
      setSelectedArtist(response.data.event.artist);
      setSelectedVenue(response.data.event.venue);
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

  // useEffect(() => {
  //   ArtistServiceV2.getArtistsList().then(
  //     (response) =>
  //       response.status === 200 &&
  //       // setArtistList(response.data.artistsPage.content)
  //       console.log(response.data.artistsPage.content)
  //   );
  // }, [inputArtist]);

  const updateEventData = () => {
    const times = formatIso(startTime, endTime);

    const posterIds = eventImageData.map((item) => item.id);

    const updatedData = {
      id: eventId,
      clientStatus: clientStatus,
      artistId: selectedArtist.id,
      venueId: selectedVenue.id,
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

  const handleCloseModal = () => {
    setIsShownImageModal(false);
    setImageData(null);
  };

  const modalOpacity = isHidingAddModal ? "0" : "1";

  const modalStyle = {
    opacity: modalOpacity,
  };

  // console.log("selected Artist-->", selectedArtist);
  // console.log("selected Venue-->", selectedVenue);

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
            handleOption={(option) => {
              return `${option.country}, ${option.city} /  ${option.name}`;
            }}
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
          style={{
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
        <SelectInputUI
          label="Event Status"
          width="100px"
          value={eventStatus}
          setValue={setEventStatus}
          data={statusConfig}
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
