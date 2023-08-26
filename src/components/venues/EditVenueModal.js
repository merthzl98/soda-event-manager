import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";

import VenueService from "../../services/VenueService";
import VenueServiceV2 from "../../services/v2/VenueService";
import Modal from "../commonUI/Modal";
import locationData from "../../static/locationData.json";
import ImageModal from "../commonUI/ImageModal";
import AddPoster from "../commonUI/AddPoster";
import TextInput from "../commonUI/TextInput";
import AutoComplete from "../commonUI/AutoComplete";

const EditVenueModal = ({
  onHide,
  openModal,
  setEditVenueModal,
  getVenuesData,
  venueId,
}) => {
  const [state, setState] = useState({
    enteredFullAddress: "",
    enteredName: "",
  });

  const [cities, setCities] = useState([]);
  const [country, setCountry] = useState("");
  const [inputCountry, setInputCountry] = useState("");
  const [city, setCity] = useState("");
  const [inputCity, setInputCity] = useState("");
  const [fileData, setFileData] = useState(null);
  const [isShownImageModal, setIsShownImageModal] = useState(false);
  const [venueImageData, setVenueImageData] = useState([]);
  const [imageData, setImageData] = useState(null);
  const [isHidingAddModal, setIsHidingAddModal] = useState(false);

  useEffect(() => {
    VenueServiceV2.getVenueById(venueId).then((response) => {
      setState({
        enteredName: response.data.venue.name,
        enteredFullAddress: response.data.venue.fullAddress,
      });

      const initCountry = locationData.find(
        (item) => item.country_name === response.data.venue.country
      );
      setCountry(initCountry);

      const initCity = initCountry.states.find(
        (item) => response.data.venue.city === item.state_name
      );
      setCity(initCity);

      const stringCity = typeof initCity === "string" ? initCity : "";
      setInputCity(stringCity);

      const stringCountry = typeof initCountry === "string" ? initCountry : "";
      setInputCountry(stringCountry);

      setVenueImageData(response.data.venue.posters);
    });
  }, []);

  useEffect(() => {
    isShownImageModal ? setIsHidingAddModal(true) : setIsHidingAddModal(false);
  }, [isShownImageModal]);

  useEffect(() => {
    country && setCities(country.states ? country.states : []);
  }, [country]);

  const updateVenueData = () => {
    const posterIds = venueImageData.map((item) => item.id);
    const updatedData = {
      id: venueId,
      country: country.country_name,
      city: city.state_name,
      fullAddress: state.enteredFullAddress,
      name: state.enteredName,
      posterIds: posterIds,
    };
    VenueServiceV2.updateVenue(updatedData).then((response) => {
      if (response.status === 200) {
        setEditVenueModal(false);
        getVenuesData();
      }
    });
  };

  const handleCloseModal = () => {
    setIsShownImageModal(false);
    setImageData(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
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
        title="Edit Venue Information"
        acceptTypo="Save changes"
        onRequest={updateVenueData}
        modalStyle={modalStyle}
      >
        <TextInput
          name="enteredName"
          onChange={handleChange}
          value={state.enteredName}
          label="Name"
          multiline={true}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            gap: "calc(6% - 0.5px)",
          }}
        >
          <AutoComplete
            value={country}
            setValue={setCountry}
            inputValue={inputCountry}
            setInputValue={setInputCountry}
            options={locationData}
            handleOption={(option) => option.country_name}
            width="47%"
            label="Country"
          />
          <AutoComplete
            value={city}
            setValue={setCity}
            inputValue={inputCity}
            setInputValue={setInputCity}
            options={cities}
            handleOption={(option) => option.state_name}
            width="47%"
            label="City"
          />
        </Box>

        <TextInput
          name="enteredFullAddress"
          onChange={handleChange}
          value={state.enteredFullAddress}
          label="Full Address"
          multiline={true}
          minRows={3}
        />

        <AddPoster
          setImageData={setImageData}
          setIsShownImageModal={setIsShownImageModal}
          imagesData={venueImageData}
          setFileData={setFileData}
          setImagesData={setVenueImageData}
        />
      </Modal>
      {isShownImageModal && (
        <ImageModal
          imageData={imageData}
          onOpen={isShownImageModal}
          onClose={handleCloseModal}
          fileData={fileData}
          setImagesData={setVenueImageData}
          posterType="VENUE_DEFAULT"
        />
      )}
    </>
  );
};

export default EditVenueModal;
