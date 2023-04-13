import React, { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AddCircleIcon from "@mui/icons-material/AddCircle";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemText from "@mui/material/ListItemText";
// import IconButton from "@mui/material/IconButton";

import VenueService from "../../services/VenueService";
import Modal from "../commonUI/Modal";
import locationData from "../../static/locationData.json";

const EditVenueModal = ({
  onHide,
  openModal,
  setEditVenueModal,
  venueData,
  getVenuesData,
}) => {
  const [state, setState] = useState({
    enteredFullAddress: venueData.fullAddress,
    enteredPosters: venueData.posters,
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

  // const [posterList, setPosterList] = useState([]);
  // const [showModal, setShowModal] = useState(false);
  // const [imageData, setImageData] = useState(null);

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
      posters: null,
    };
    VenueService.updateVenue(updatedData).then((response) => {
      if (response.status === 200) {
        setEditVenueModal(false);
        getVenuesData();
      }
    });
  };

  // const handleCloseModal = () => {
  //   setShowModal(false);
  //   setImageData(null);
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

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
        <TextField
          name="enteredName"
          onChange={handleChange}
          value={state.enteredName}
          id="standard-basic"
          label="Name"
          variant="outlined"
          multiline={true}
        />
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
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Country" />}
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
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="City" />}
        />
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
    </Modal>
  );
};

export default EditVenueModal;
