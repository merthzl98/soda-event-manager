import React from "react";

import Modal from "../commonUI/Modal";
import "./ImageModal.scss";
import PosterServiceV2 from "../../services/v2/PosterService";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const ImageModal = ({
  posterType,
  setPosterType,
  fileData,
  imageData,
  setImagesData,
  onOpen,
  onClose,
}) => {
  const selectEventPoster = (
    <FormControl fullWidth sx={{ marginTop: "1rem" }}>
      <InputLabel id="demo-simple-select-label">Poster Type</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={posterType}
        label="Poster Type"
        onChange={(e) => {
          setPosterType(e.target.value);
        }}
      >
        <MenuItem value={"EVENT_HIGHLIGHTED"}>Event Highlighted</MenuItem>
        <MenuItem value={"EVENT_LIST"}>Event List</MenuItem>
        <MenuItem value={"EVENT_NEXTUP"}>Event Next-up</MenuItem>
        <MenuItem value={"EVENT_DETAIL"}>Event Detail</MenuItem>
      </Select>
    </FormControl>
  );

  const postPoster = () => {
    const formData = new FormData();
    formData.append("file", fileData);

    PosterServiceV2.uploadPoster(posterType, formData)
      .then((response) => {
        setImagesData((prevState) => [...prevState, response.data.poster]);
      })
      .catch((error) => {
        console.error(error);
      });

    onClose();
    posterType.includes("EVENT") && setPosterType("");
  };

  let isDisabled = posterType === "";

  return (
    <Modal
      title={imageData.name}
      acceptTypo="Upload Poster"
      onHide={onClose}
      openModal={onOpen}
      onRequest={postPoster}
      isDisabled={isDisabled}
    >
      <div className="upload-image-container">
        <img src={imageData.data} alt="Uploaded" />
      </div>
      <div className="poster-type">
        {(posterType.includes("EVENT") || posterType.trim("").length === 0) &&
          selectEventPoster}
      </div>
    </Modal>
  );
};

export default ImageModal;
