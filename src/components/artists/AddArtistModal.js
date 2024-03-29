import React, { useState, useContext, useEffect } from "react";

import AuthContext from "../../storage/auth-context";
import Modal from "../commonUI/Modal";
import ArtistServiceV2 from "../../services/v2/ArtistService";
import ImageModal from "../commonUI/ImageModal.js";
import AddPoster from "../commonUI/AddPoster";
import TextInput from "../commonUI/TextInput";

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
  const [fileNameList, setFileNameList] = useState([]);
  const [fileData, setFileData] = useState(null);
  const [artistImageData, setArtistImageData] = useState([]);
  const [isHidingAddModal, setIsHidingAddModal] = useState(false);

  const { setIsLoading } = useContext(AuthContext);

  useEffect(() => {
    isShownImageModal ? setIsHidingAddModal(true) : setIsHidingAddModal(false);
  }, [isShownImageModal]);

  const postArtistData = () => {
    const posterIds = artistImageData.map((item) => item.id);
    const artistData = {
      fullName: state.enteredFullName,
      genre: state.enteredGenre,
      description: state.enteredDescription,
      posterIds: posterIds,
    };

    setIsLoading(true);

    ArtistServiceV2.createArtist(artistData).then((response) => {
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
          fileNameList={fileNameList}
          setFileNameList={setFileNameList}
          setImageData={setImageData}
          setIsShownImageModal={setIsShownImageModal}
          imagesData={artistImageData}
          setFileData={setFileData}
          setImagesData={setArtistImageData}
        />
      </Modal>
      {isShownImageModal && (
        <ImageModal
          setFileNameList={setFileNameList}
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
