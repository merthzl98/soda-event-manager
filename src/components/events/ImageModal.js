import React from "react";

import Modal from "../commonUI/Modal";
// import PosterService from "../../services/PosterService";

const ImageModal = ({ imageData, onClose, onOpen, setPosterList }) => {
  const postPoster = () => {
    console.log("posted a poster");
    // const posterType = "ARTIST_DEFAULT";
    // PosterService.uploadPoster( posterType, imageData).then((response) => {
    //   console.log("response poster-->", response);
    //   if (response.status === 200) {
    //     onClose();
    //   }
    // });

    //if status === 200 run at below lines
    onClose();
    // setImageList((prevState) => [...prevState, response.data)])
    setPosterList((prevList) => [...prevList, imageData]);
  };
  return (
    <Modal
      title={imageData.name}
      onHide={onClose}
      openModal={onOpen}
      onRequest={postPoster}
    >
      <img
        style={{
          maxWidth: "30rem",
          height: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        src={imageData.data}
        alt="Uploaded"
      />
    </Modal>
  );
};

export default ImageModal;
