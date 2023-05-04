import React, { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import Box from "@mui/material/Box";

import VenueService from "../../services/VenueService";
import Modal from "../commonUI/Modal";
import locationData from "../../static/locationData.json";
import ImageModal from "../commonUI/ImageModal";
import AddPoster from "../commonUI/AddPoster";

const EditVenueModal = ({
  onHide,
  openModal,
  setEditVenueModal,
  venueData,
  getVenuesData,
}) => {
  const [state, setState] = useState({
    enteredFullAddress: venueData.fullAddress,

    enteredName: venueData.name,
  });

  const initCountry = locationData.find(
    (item) => item.country_name === venueData.country
  );

  const initCity = initCountry.states.find(
    (item) => venueData.city === item.state_name
  );

  const stringCity = typeof initCity === "string" ? initCity : "";

  const stringCountry = typeof initCountry === "string" ? initCountry : "";

  const [cities, setCities] = useState([]);
  const [country, setCountry] = useState(initCountry);
  const [inputCountry, setInputCountry] = useState(stringCountry);
  const [city, setCity] = useState(initCity);
  const [inputCity, setInputCity] = useState(stringCity);
  const [fileData, setFileData] = useState(null);
  const [isShownImageModal, setIsShownImageModal] = useState(false);
  const [venueImageData, setVenueImageData] = useState(venueData.posters);
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    country && setCities(country.states ? country.states : []);
  }, [country]);

  const updateVenueData = () => {
    const updatedData = {
      id: venueData.id,
      country: country.country_name,
      city: city.state_name,
      fullAddress: state.enteredFullAddress,
      name: state.enteredName,
      posters: venueImageData,
    };
    VenueService.updateVenue(updatedData).then((response) => {
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

  // console.log("country", country);
  // console.log("city", city);
  // console.log("cities", cities);
  // console.log("lcoationData", locationData);
  // console.log("inputCity-->", inputCity, typeof inputCity);
  // console.log("inputCountry-->", inputCountry, typeof inputCountry);

  return (
    <>
      <Modal
        onHide={onHide}
        openModal={openModal}
        title="Edit Venue Information"
        acceptTypo="Save changes"
        onRequest={updateVenueData}
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
