import React, { useState } from "react";
import Box from "@mui/material/Box";

import ArtistService from "../../services/ArtistService";
import Modal from "../commonUI/Modal";
import ImageModal from "../commonUI/ImageModal.js";
import AddPoster from "../commonUI/AddPoster";
import TextInput from "../commonUI/TextInput";

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
  const [isShownImageModal, setIsShownImageModal] = useState(false);
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
    setIsShownImageModal(false);
    setImageData(null);
  };

  // console.log("artistdata-->", artistData);

  return (
    <>
      <Modal
        onHide={onHide}
        openModal={openModal}
        title="Edit Artist Information"
        acceptTypo="Save Changes"
        onRequest={updateArtistData}
      >
        <Box
          component="form"
          sx={{
            borderBottom: "1px dashed rgba(197, 196, 196, 0.8)",
            margin: "0px 5px",
            "& > :not(style)": {
              m: 1,
              display: "flex",
              flexDirection: "column",
              width: "100%",
              margin: "15px 0px",
            },
          }}
          noValidate
          autoComplete="off"
        >
          <TextInput
            name="enteredFullName"
            onChange={handleChange}
            label="Full Name"
            value={state.enteredFullName}
          />
          <TextInput
            name="enteredGenre"
            onChange={handleChange}
            value={state.enteredGenre}
            label="Genre"
          />
          <TextInput
            name="enteredDescription"
            onChange={handleChange}
            value={state.enteredDescription}
            label="Description"
            minRows={4}
          />
        </Box>
        <AddPoster
          imageData={imageData}
          setImageData={setImageData}
          setIsShownImageModal={setIsShownImageModal}
          imagesData={artistImageData}
          setFileData={setFileData}
          setImagesData={setArtistImageData}
        />
      </Modal>
      {isShownImageModal && (
        <ImageModal
          imageData={imageData}
          onOpen={isShownImageModal}
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
