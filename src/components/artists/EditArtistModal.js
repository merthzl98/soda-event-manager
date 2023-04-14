import React, { useState } from "react";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";

import ArtistService from "../../services/ArtistService";
import Modal from "../commonUI/Modal";
import ImageModal from "../commonUI/ImageModal.js";
import AddPoster from "../commonUI/AddPoster";

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
  });
  const [showModal, setShowModal] = useState(false);
  const [imageData, setImageData] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [artistImageData, setArtistImageData] = useState(artistData.posters);

  const updateArtistData = () => {
    const updatedData = {
      fullName: state.enteredFullName,
      id: artistData.id,
      genre: state.enteredGenre,
      description: state.enteredDescription,
      posters: artistImageData,
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

  const handleCloseModal = () => {
    setShowModal(false);
    setImageData(null);
  };

  // console.log("artistdata-->", artistData);

  return (
    <>
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
              width: "35rem",
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
        <AddPoster
          setImageData={setImageData}
          setShowModal={setShowModal}
          imagesData={artistImageData}
          setFileData={setFileData}
          setImagesData={setArtistImageData}
        />
      </Modal>
      {showModal && (
        <ImageModal
          imageData={imageData}
          onOpen={showModal}
          onClose={handleCloseModal}
          fileData={fileData}
          setImagesData={setArtistImageData}
          posterType="ARTIST_DEFAULT"
        />
      )}
    </>
  );
};

export default EditArtistModal;
