import React, { useState, useContext } from "react";
import Modal from "../commonUI/Modal";
import http from "../../services/http-common";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AuthContext from "../../storage/auth-context";

const ARTIST_BASE = "/v1/artists";

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
  const authCtx = useContext(AuthContext);

  const { setIsLoading, setErrorContent, showError } = authCtx;

  const postArtistData = async () => {
    const addArtistData = {
      fullName: state.enteredFullName,
      genre: state.enteredGenre,
      description: state.enteredDescription,
      posters: null,
      social: state.enteredSocial,
      additionalInfo: state.enteredAdditionalInfo,
    };
    setIsLoading(true);

    try {
      const response = await http.post(ARTIST_BASE, addArtistData);
      console.log(response);
    } catch (error) {
      console.error(error);
      setErrorContent(error.message);
      showError({
        vertical: "top",
        horizontal: "center",
      });
    }
    setIsLoading(false);
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
    </>
  );
};

export default AddArtistModal;
