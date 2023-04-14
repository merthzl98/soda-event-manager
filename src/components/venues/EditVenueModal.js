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

  // const initialCities = locationData.filter((item) => {
  //   if (item.country_name === venueData.country_name) {
  //     return item.states;
  //   }
  // });

  const [cities, setCities] = useState([]);
  const [country, setCountry] = useState(venueData?.country);
  const [inputCountry, setInputCountry] = useState(venueData?.country);
  const [city, setCity] = useState(venueData?.city);
  const [inputCity, setInputCity] = useState(venueData?.city);
  const [fileData, setFileData] = useState(null);
  const [showModal, setShowModal] = useState(false);
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
    setShowModal(false);
    setImageData(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <>
      {" "}
      <Modal
        onHide={onHide}
        openModal={openModal}
        title={"Edit Venue"}
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
              value={country?.country_name}
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
              value={city?.state_name}
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

export default EditVenueModal;
