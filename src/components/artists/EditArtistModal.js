import React from "react";
import Modal from "../commonUI/Modal";

const EditArtistModal = ({ onHide, openModal, setEditArtistModal }) => {
  const updateArtistData = () => {
    //update with axios
    setEditArtistModal(false);
    console.log("updated");
  };
  return (
    <Modal
      onHide={onHide}
      openModal={openModal}
      title={"Edit Artist"}
      onRequest={updateArtistData}
    >
      asdadasds
    </Modal>
  );
};

export default EditArtistModal;
