import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import AuthContext from "../../storage/auth-context";
import Modal from "../commonUI/Modal";
import ArtistService from "../../services/ArtistService";

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
  });

  const { setIsLoading } = useContext(AuthContext);

  const postArtistData = () => {
    const artistData = {
      fullName: state.enteredFullName,
      genre: state.enteredGenre,
      description: state.enteredDescription,
      posters: null,
    };

    setIsLoading(true);

    ArtistService.createArtist(artistData).then((response) => {
      if (response.status === 200) {
        setIsLoading(false);
        setAddArtistModal(false);
        getArtistsData();
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
        </Box>
      </Modal>
    </>
  );
};

export default AddArtistModal;
