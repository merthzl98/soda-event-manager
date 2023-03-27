import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import AuthContext from "../../storage/auth-context";
import Modal from "../commonUI/Modal";
import VenueService from "../../services/VenueService";

const AddVenueModal = ({
  onHide,
  openModal,
  setAddVenueModal,
  getVenuesData,
}) => {
  const [state, setState] = useState({
    enteredCity: "",
    enteredCountry: "",
    enteredFullAddress: "",
    enteredPosters: "",
    enteredName: "",
  });

  const { setIsLoading } = useContext(AuthContext);

  const postVenueData = () => {
    const venueData = {
      city: state.enteredCity,
      country: state.enteredCountry,
      fullAddress: state.enteredFullAddress,
      name: state.enteredName,
      posters: null,
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
    </>
  );
};

export default AddVenueModal;
