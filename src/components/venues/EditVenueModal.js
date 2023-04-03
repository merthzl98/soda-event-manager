import React, { useState } from "react";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
// import Button from "@mui/material/Button";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AddCircleIcon from "@mui/icons-material/AddCircle";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemText from "@mui/material/ListItemText";
// import IconButton from "@mui/material/IconButton";

import VenueService from "../../services/VenueService";
import Modal from "../commonUI/Modal";
import countryData from "../../static/countryData.json";

const EditVenueModal = ({
  onHide,
  openModal,
  setEditVenueModal,
  venueData,
  getVenuesData,
  locationInfos
}) => {
  const [state, setState] = useState({
    enteredCity: venueData.city,
    enteredCountry: venueData.country,
    enteredFullAddress: venueData.fullAddress,
    enteredPosters: venueData.posters,
    enteredName: venueData.name,
  });

  console.log("veue data-->", venueData);

  const [countryId, setCountryId] = useState(locationInfos?.country_id);
  const [cities, setCities] = useState([]);
  const [cityId, setCityId] = useState(locationInfos?.city_id);
  // const [posterList, setPosterList] = useState([]);
  // const [showModal, setShowModal] = useState(false);
  // const [imageData, setImageData] = useState(null);

  const updateVenueData = () => {
    const updatedData = {
      id: venueData.id,
      city: state.enteredCity,
      country: state.enteredCountry,
      fullAddress: state.enteredFullAddress,
      name: state.enteredName,
      posters: null,
    };
    VenueService.updateVenue(updatedData).then((response) => {
      if (response.status === 200) {
        setEditVenueModal(false);
        getVenuesData();
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleCountry = (e) => {
    const getCountryId = e.target.value;
    const getStatedata = countryData.find(
      (country) => country.country_id === getCountryId
    ).states;
    setCities(getStatedata);
    setCountryId(getCountryId);
  };

  const handleCity = (e) => {
    const cityId = e.target.value;
    setCityId(cityId);
  };

  // const handleCloseModal = () => {
  //   setShowModal(false);
  //   setImageData(null);
  // };

  return (
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
            width: "20rem",
            margin: "16px",
          },
        }}
        noValidate
        autoComplete="off"
      >
        <FormControl fullWidth>
          <InputLabel id="select-country">Country</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={countryId}
            label="Country"
            onChange={(e) => handleCountry(e)}
          >
            {countryData.map((getCountry, index) => (
              <MenuItem value={getCountry.country_id} key={index}>
                {getCountry.country_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="select-city">City</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={cityId}
            label="City"
            onChange={(e) => handleCity(e)}
          >
            {cities.map((getCity, index) => (
              <MenuItem value={getCity.state_id} key={index}>
                {getCity.state_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
        <TextField
          name="enteredName"
          onChange={handleChange}
          value={state.enteredName}
          id="standard-basic"
          label="Name"
          variant="outlined"
          multiline={true}
          minRows={2}
        />
      </Box>
    </Modal>
  );
};

export default EditVenueModal;
