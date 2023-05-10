import React, { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import AuthContext from "../../storage/auth-context";
import Modal from "../commonUI/Modal";
import VenueService from "../../services/VenueService";
import ImageModal from "../commonUI/ImageModal.js";
import locationData from "../../static/locationData.json";
import AddPoster from "../commonUI/AddPoster";
import TextInput from "../commonUI/TextInput";
import "./Venues.scss";

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
  const [country, setCountry] = useState(null);
  const [inputCountry, setInputCountry] = useState("");
  const [city, setCity] = useState(null);
  const [inputCity, setInputCity] = useState("");
  const [venueImageData, setVenueImageData] = useState([]);
  const [fileData, setFileData] = useState(null);

  const { setIsLoading } = useContext(AuthContext);

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

    VenueService.createVenue(venueData).then((response) => {
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

  return (
    <>
      <Modal
        onHide={onHide}
        openModal={openModal}
        title="New Venue Add Form"
        acceptTypo="Add Venue"
        onRequest={postVenueData}
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
            name="enteredName"
            onChange={handleChange}
            value={state.enteredName}
            label="Name"
            multiline={true}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Autocomplete
              value={country}
              onChange={(event, newValue) => {
                setCountry(newValue);
              }}
              inputValue={inputCountry}
              onInputChange={(event, newInputValue) => {
                setInputCountry(newInputValue);
              }}
              id="controllable-states-demo"
              options={locationData}
              getOptionLabel={(option) => option.country_name}
              sx={{ width: "47%" }}
              renderInput={(params) => (
                <TextField
                  className="auto-complete"
                  variant="standard"
                  {...params}
                  label="Country"
                />
              )}
            />
            <Autocomplete
              value={city}
              onChange={(event, newValue) => {
                setCity(newValue);
              }}
              inputValue={inputCity}
              onInputChange={(event, newInputValue) => {
                setInputCity(newInputValue);
              }}
              id="controllable-states-demo"
              options={cities}
              getOptionLabel={(option) => option.state_name}
              sx={{ width: "47%" }}
              renderInput={(params) => (
                <TextField
                  className="auto-complete"
                  variant="standard"
                  {...params}
                  label="City"
                />
              )}
            />
          </div>

          <TextInput
            name="enteredFullAddress"
            onChange={handleChange}
            value={state.enteredFullAddress}
            label="Full Address"
            multiline={true}
            minRows={3}
          />
        </Box>
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
