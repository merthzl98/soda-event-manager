import React, { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";

import AuthContext from "../../storage/auth-context";
import Modal from "../commonUI/Modal";
import ArtistService from "../../services/ArtistService";
import ImageModal from "../commonUI/ImageModal.js";
import AddPoster from "../commonUI/AddPoster";
import TextInput from "../commonUI/TextInput";
import "./Artists.scss";

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

  const [isShownImageModal, setIsShownImageModal] = useState(false);
  const [imageData, setImageData] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [artistImageData, setArtistImageData] = useState([]);
  const [isHidingAddModal, setIsHidingAddModal] = useState(false);

  const { setIsLoading } = useContext(AuthContext);

  useEffect(() => {
    isShownImageModal ? setIsHidingAddModal(true) : setIsHidingAddModal(false);
  }, [isShownImageModal]);

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
    setIsShownImageModal(false);
    setImageData(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const modalOpacity = isHidingAddModal ? "0" : "1";

  const modalStyle = {
    opacity: modalOpacity,
  };

  return (
    <>
      <Modal
        onHide={onHide}
        openModal={openModal}
        title="New Artist Add Form"
        modalStyle={modalStyle}
        acceptTypo="Add Artist"
        onRequest={postArtistData}
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
          // className="artist-input-box"
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

export default AddArtistModal;
