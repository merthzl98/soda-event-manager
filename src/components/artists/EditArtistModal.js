import React, { useState } from "react";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";

import ArtistService from "../../services/ArtistService";
import Modal from "../commonUI/Modal";

const EditArtistModal = ({
  onHide,
  openModal,
  setEditArtistModal,
  artistData,
  getArtistsData,
}) => {
  const [state, setState] = useState({
    enteredFullName: artistData.fullName,
    enteredGenre: artistData.genre,
    enteredDescription: artistData.description,
    enteredPoster: "",
    enteredSocial: "",
    enteredAdditionalInfo: artistData.additionalInfo,
  });

  const updateArtistData = () => {
    const updatedData = {
      fullName: state.enteredFullName,
      id: artistData.id,
      genre: state.enteredGenre,
      description: state.enteredDescription,
      posters: null,
      social: null,
      additionalInfo: state.enteredAdditionalInfo,
    };
    ArtistService.updateArtist(updatedData).then((response) => {
      if (response.status === 200) {
        setEditArtistModal(false);
        getArtistsData();
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
      title={"Edit Artist"}
      onRequest={updateArtistData}
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
  );
};

export default EditArtistModal;
