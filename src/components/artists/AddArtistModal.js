import React, { useState } from "react";
import Modal from "../commonUI/Modal";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Error from "../commonUI/Error";
import Succes from "../commonUI/Succes";

const artistsDataUrl = "http://localhost/manager-app/api/v1/artists";

const AddArtistModal = ({
  onHide,
  openModal,
  setAddArtistModal,
  getArtistsData,
}) => {
  const [state, setState] = useState({
    enteredFullName: "",
    enteredGenre: "",
    enteredDescription: "",
    enteredPoster: "",
    enteredSocial: "",
    enteredAdditionalInfo: "",
  });
  const [error, setError] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const [success, setSuccess] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const showSuccess = (newState) => {
    setSuccess({ open: true, ...newState });
  };

  const showError = (newState) => {
    setError({ open: true, ...newState });
  };

  const postArtistData = async () => {
    const addArtistData = {
      fullName: state.enteredFullName,
      genre: state.enteredGenre,
      description: state.enteredDescription,
      posters: null,
      social: state.enteredSocial,
      additionalInfo: state.enteredAdditionalInfo,
    };

    try {
      const response = await axios.post(artistsDataUrl, addArtistData);
      console.log(response);
      console.log("posted");
      showSuccess({
        vertical: "top",
        horizontal: "center",
      });
    } catch (error) {
      console.error(error);
      console.log("girdi");
      showError({
        vertical: "top",
        horizontal: "center",
      });
    }
    setAddArtistModal(false);
    getArtistsData();
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
        title={"Add Artist"}
        onRequest={postArtistData}
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
            name="enteredFullName"
            onChange={handleChange}
            value={state.enteredFullName}
            id="standard-basic"
            label="Full Name"
            variant="standard"
          />
          <TextField
            name="enteredGenre"
            onChange={handleChange}
            value={state.enteredGenre}
            id="standard-basic"
            label="Genre"
            variant="standard"
          />
          <TextField
            name="enteredDescription"
            onChange={handleChange}
            value={state.enteredDescription}
            id="standard-basic"
            label="Description"
            variant="standard"
          />
          <TextField
            name="enteredPoster"
            onChange={handleChange}
            value={state.enteredPoster}
            id="standard-basic"
            label="Posters"
            variant="standard"
          />
          <TextField
            name="enteredSocial"
            onChange={handleChange}
            value={state.enteredSocial}
            id="standard-basic"
            label="Social"
            variant="standard"
          />
          <TextField
            name="enteredAdditionalInfo"
            onChange={handleChange}
            value={state.enteredAdditionalInfo}
            id="standard-basic"
            label="Additional Info"
            variant="standard"
          />
        </Box>
      </Modal>
      {error && (
        <Error error={error} setError={setError}>
          Artist was not added! Please try again!
        </Error>
      )}

      {success && (
        <Succes success={success} setSuccess={setSuccess}>
          Artist added successfully!
        </Succes>
      )}
    </>
  );
};

export default AddArtistModal;
