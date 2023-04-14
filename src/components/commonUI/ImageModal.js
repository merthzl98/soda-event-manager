import React from "react";
import axios from "axios";

import Modal from "../commonUI/Modal";
import "./ImageModal.scss";

const ImageModal = (props) => {
  const postPoster = () => {
    const formData = new FormData();
    formData.append("file", props.fileData);

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/posters/${props.posterType}/upload`,
        formData,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log(response);
        props.setImagesData((prevState) => [...prevState, response.data]);
      })
      .catch((error) => {
        console.error(error);
      });

    props.onClose();
  };

  // console.log("onOpen-->", onOpen);
  return (
    <Modal
      title={props.imageData.name}
      onHide={props.onClose}
      openModal={props.onOpen}
      onRequest={postPoster}
    >
      <div className="upload-image-container">
        <img src={props.imageData.data} alt="Uploaded" />
      </div>
    </Modal>
  );
};

export default ImageModal;
