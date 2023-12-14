import React, { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";

import AuthContext from "../../storage/auth-context";
import Modal from "../commonUI/Modal";
import VenueServiceV2 from "../../services/v2/VenueService";
import ImageModal from "../commonUI/ImageModal.js";
import locationData from "../../static/locationData.json";
import AddPoster from "../commonUI/AddPoster";
import TextInput from "../commonUI/TextInput";
import AutoComplete from "../commonUI/AutoComplete";

const AddVenueModal = ({
  onHide,
  openModal,
  setAddVenueModal,
  getVenuesData,
}) => {
  const [state, setState] = useState({
    enteredFullAddress: "",
    enteredName: "",
  });

  const [cities, setCities] = useState([]);
  const [isShownImageModal, setIsShownImageModal] = useState(false);
  const [imageData, setImageData] = useState(null);
  const [country, setCountry] = useState(locationData[0]);
  const [inputCountry, setInputCountry] = useState("Belgium");
  const [city, setCity] = useState(locationData[0].states[4]);
  const [inputCity, setInputCity] = useState("");
  const [venueImageData, setVenueImageData] = useState([]);
  const [fileData, setFileData] = useState(null);
  const [isHidingAddModal, setIsHidingAddModal] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const { setIsLoading } = useContext(AuthContext);

  useEffect(() => {
    isShownImageModal ? setIsHidingAddModal(true) : setIsHidingAddModal(false);
  }, [isShownImageModal]);

  useEffect(() => {
    if (!country && !inputCountry) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [country, inputCountry]);

  useEffect(() => {
    country && setCities(country.states);
  }, [country]);

  const postVenueData = () => {
    const venueData = {
      country: country.country_name,
      city: city.state_name,
      fullAddress: state.enteredFullAddress,
      name: state.enteredName,
      posters: venueImageData,
    };

    setIsLoading(true);

    VenueServiceV2.createVenue(venueData).then((response) => {
      if (response.status === 200) {
        setIsLoading(false);
        setAddVenueModal(false);
        getVenuesData();
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
        title="New Venue Add Form"
        acceptTypo="Add Venue"
        onRequest={postVenueData}
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
            width: "99.85%",
            gap: "48px",
          }}
        >
          <AutoComplete
            value={country}
            setValue={setCountry}
            inputValue={inputCountry}
            setInputValue={setInputCountry}
            options={locationData}
            handleOption={(option) => option.country_name}
            label="Country"
          />
          <AutoComplete
            value={city}
            setValue={setCity}
            inputValue={inputCity}
            setInputValue={setInputCity}
            options={cities}
            handleOption={(option) => option.state_name}
            label="City"
            isDisabled={isDisabled}
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

export default AddVenueModal;
