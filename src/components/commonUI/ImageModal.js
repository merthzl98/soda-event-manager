import React from "react";
import axios from "axios";

import Modal from "../commonUI/Modal";
import "./ImageModal.scss";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const ImageModal = (props) => {
  const selectEventPoster = (
    <FormControl fullWidth sx={{ marginTop: "1rem" }}>
      <InputLabel id="demo-simple-select-label">Poster Type</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={props.posterType}
        label="Poster Type"
        onChange={props.changePosterType}
      >
        <MenuItem value={"EVENT_DEFAULT"}>Event Default</MenuItem>
        <MenuItem value={"EVENT_BIG"}>Event Big</MenuItem>
        <MenuItem value={"EVENT_HIGHLIGHTED"}>Event Highlighted</MenuItem>
        <MenuItem value={"EVENT_LIST"}>Event List</MenuItem>
        <MenuItem value={"EVENT_NEXTUP"}>Event Next-up</MenuItem>
        <MenuItem value={"EVENT_SMALL"}>Event Small</MenuItem>
      </Select>
    </FormControl>
  );

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
    props.posterType.includes("EVENT") && props.setPosterType("");
  };

  let isDisabled = props.posterType === "";

  // console.log("onOpen-->", onOpen);

  console.log("image data-->", props.imageData);

  return (
    <Modal
      title={props.imageData.name}
      acceptTypo = "Upload Poster"
      onHide={props.onClose}
      openModal={props.onOpen}
      onRequest={postPoster}
      isDisabled={isDisabled}
    >
      <div className="upload-image-container">
        <img src={props.imageData.data} alt="Uploaded" />
      </div>
      <div className="poster-type">
        {(props.posterType.includes("EVENT") ||
          props.posterType.trim("").length === 0) &&
          selectEventPoster}
      </div>
    </Modal>
  );
};

export default ImageModal;
