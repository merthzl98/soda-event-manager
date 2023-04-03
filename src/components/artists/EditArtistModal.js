import React, { useState } from "react";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";

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
  });

  const updateArtistData = () => {
    const updatedData = {
      fullName: state.enteredFullName,
      id: artistData.id,
      genre: state.enteredGenre,
      description: state.enteredDescription,
      posters: null,
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
          name="enteredFullName"
          onChange={handleChange}
          value={state.enteredFullName}
          id="outlined-basic"
          label="Full Name"
          variant="outlined"
          multiline={true}
        />
        <TextField
          name="enteredGenre"
          onChange={handleChange}
          value={state.enteredGenre}
          id="outlined-basic"
          label="Genre"
          variant="outlined"
          multiline={true}
        />
        <TextField
          name="enteredDescription"
          onChange={handleChange}
          value={state.enteredDescription}
          id="outlined-basic"
          label="Description"
          variant="outlined"
          multiline={true}
          minRows={3}
        />
      </Box>
      <Button
        sx={{ width: "10rem", margin: "8px 16px" }}
        variant="contained"
        startIcon={<AddCircleIcon />}
      >
        Add Poster
      </Button>
    </Modal>
  );
};

export default EditArtistModal;
