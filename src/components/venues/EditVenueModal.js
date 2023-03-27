import React, { useState } from "react";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";

import VenueService from "../../services/VenueService";
import Modal from "../commonUI/Modal";

const EditVenueModal = ({
  onHide,
  openModal,
  setEditVenueModal,
  venueData,
  getVenuesData,
}) => {
  const [state, setState] = useState({
    enteredCity: venueData.city,
    enteredCountry: venueData.country,
    enteredFullAddress: venueData.fullAddress,
    enteredPosters: venueData.posters,
    enteredName: venueData.name,
  });

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
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          name="enteredCity"
          onChange={handleChange}
          value={state.enteredCity}
          id="standard-basic"
          label="City"
          variant="standard"
        />
        <TextField
          name="enteredCountry"
          onChange={handleChange}
          value={state.enteredCountry}
          id="standard-basic"
          label="Country"
          variant="standard"
        />
        <TextField
          name="enteredFullAddress"
          onChange={handleChange}
          value={state.enteredFullAddress}
          id="standard-basic"
          label="Full Address"
          variant="standard"
        />
        <TextField
          name="enteredPosters"
          onChange={handleChange}
          value={state.enteredPosters}
          id="standard-basic"
          label="Posters"
          variant="standard"
        />
        <TextField
          name="enteredName"
          onChange={handleChange}
          value={state.enteredName}
          id="standard-basic"
          label="Name"
          variant="standard"
        />
      </Box>
    </Modal>
  );
};

export default EditVenueModal;
