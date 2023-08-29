import React from "react";

import Modal from "../commonUI/Modal";
import PosterServiceV2 from "../../services/v2/PosterService";
import { FormControl, InputLabel, MenuItem, Select, Box } from "@mui/material";
import { posterTypeConfig } from "../../configs/config";
import SelectInputUI from "./SelectInputUI";

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
    <SelectInputUI
      label="Select Poster Type"
      width="150px"
      value={posterType}
      setValue={setPosterType}
      data={posterTypeConfig}
    />
  );

  const postPoster = () => {
    console.log(fileData);
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        <img
          src={imageData.data}
          alt="Uploaded"
          style={{ maxWidth: "558px", height: "auto", maxHeight: "300px" }}
        />
        {(posterType.includes("EVENT") || posterType.trim("").length === 0) &&
          selectEventPoster}
      </Box>
    </Modal>
  );
};

export default ImageModal;
