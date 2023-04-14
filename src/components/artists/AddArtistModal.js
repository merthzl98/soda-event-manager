import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import AuthContext from "../../storage/auth-context";
import Modal from "../commonUI/Modal";
import ArtistService from "../../services/ArtistService";
import ImageModal from "../commonUI/ImageModal.js";
import AddPoster from "../commonUI/AddPoster";

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
  });

  const [showModal, setShowModal] = useState(false);
  const [imageData, setImageData] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [artistImageData, setArtistImageData] = useState([]);

  const { setIsLoading } = useContext(AuthContext);

  const postArtistData = () => {
    const artistData = {
      fullName: state.enteredFullName,
      genre: state.enteredGenre,
      description: state.enteredDescription,
      posters: artistImageData,
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

  const handleCloseModal = () => {
    setShowModal(false);
    setImageData(null);
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
            "& > :not(style)": {
              m: 1,
              display: "flex",
              flexDirection: "column",
              width: "35rem",
              margin: "24px 16px",
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
            minRows={4}
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

export default AddArtistModal;
