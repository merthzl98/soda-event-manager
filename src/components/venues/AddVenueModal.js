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

// const countryList = locationData.map((item) => item.country_name);


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
  const [showModal, setShowModal] = useState(false);
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
    setShowModal(false);
    setImageData(null);
  };

  

  // console.log("country _name-->", country?.country_name);
  console.log("country", country);
  console.log("city", city);
  console.log("cities", cities);
  console.log("lcoationData", locationData);
  // console.log("countryList", countryList);
  

  return (
    <>
      <Modal
        onHide={onHide}
        openModal={openModal}
        title={"Add Venue"}
        onRequest={postVenueData}
      >
        <Box
          component="form"
          sx={{
            "& > :not(style)": {
              m: 1,
              display: "flex",
              flexDirection: "column",
              width: "35rem",
              margin: "24px 16px",
            },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            name="enteredName"
            onChange={handleChange}
            value={state.enteredName}
            id="standard-basic"
            label="Name"
            variant="outlined"
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
                <TextField {...params} label="Country" />
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
              renderInput={(params) => <TextField {...params} label="City" />}
            />
          </div>

          <TextField
            name="enteredFullAddress"
            onChange={handleChange}
            value={state.enteredFullAddress}
            id="standard-basic"
            label="Full Address"
            variant="outlined"
            multiline={true}
            minRows={3}
          />
        </Box>
        <AddPoster
          setImageData={setImageData}
          setShowModal={setShowModal}
          imagesData={venueImageData}
          setFileData={setFileData}
          setImagesData={setVenueImageData}
        />
      </Modal>
      {showModal && (
        <ImageModal
          imageData={imageData}
          onOpen={showModal}
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
