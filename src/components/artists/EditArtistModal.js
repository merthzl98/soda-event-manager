import React, { useState, useEffect } from "react";

import ArtistService from "../../services/ArtistService";
import ArtistServiceV2 from "../../services/v2/ArtistService";
import Modal from "../commonUI/Modal";
import ImageModal from "../commonUI/ImageModal.js";
import AddPoster from "../commonUI/AddPoster";
import TextInput from "../commonUI/TextInput";

const EditArtistModal = ({
  onHide,
  openModal,
  setEditArtistModal,
  getArtistsData,
  artistId,
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

  useEffect(() => {
    isShownImageModal ? setIsHidingAddModal(true) : setIsHidingAddModal(false);
  }, [isShownImageModal]);

  useEffect(() => {
    ArtistServiceV2.getArtistById(artistId).then((response) => {
      setState({
        enteredFullName: response.data.artist.fullName,
        enteredGenre: response.data.artist.genre,
        enteredDescription: response.data.artist.description,
      });
      setArtistImageData(response.data.artist.posters);
    });
  }, []);

  const updateArtistData = () => {
    const posterIds = artistImageData.map((item) => item.id);
    const updatedData = {
      id: artistId,
      fullName: state.enteredFullName,
      genre: state.enteredGenre,
      description: state.enteredDescription,
      posterIds: posterIds,
    };
    ArtistServiceV2.updateArtist(updatedData).then((response) => {
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

  const modalOpacity = isHidingAddModal ? "0" : "1";

  const modalStyle = {
    opacity: modalOpacity,
  };

  return (
    <>
      <Modal
        onHide={onHide}
        openModal={openModal}
        title="Edit Artist Information"
        acceptTypo="Save Changes"
        onRequest={updateArtistData}
        modalStyle={modalStyle}
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
