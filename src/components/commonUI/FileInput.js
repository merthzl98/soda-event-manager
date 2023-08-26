import { useRef } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import "./FileInput.scss";
import ButtonUI from "./ButtonUI";

const FileInput = (props) => {
  const { setFileData, setImageData, setIsShownImageModal, label } = props;

  const fileInputRef = useRef(null);

  const handleClickImage = () => {
    fileInputRef.current.click();
  };

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setFileData(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageInfo = { name: file.name, data: e.target.result };

      setImageData(imageInfo);
      setIsShownImageModal(true);
    };
    reader.readAsDataURL(file);
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileData(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageInfo = { name: file.name, data: e.target.result };

      setImageData(imageInfo);
      setIsShownImageModal(true);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Box sx={{ display: "flex", gap: "1rem", width: "100%" }}>
      <ButtonUI width="12rem" onClick={handleClickImage} label={label} />
      <div
        className="drop-file"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <label htmlFor="fileInput">
          <div className="add-poster-typo">
            <CloudUploadIcon />
            <span>Drop files here...</span>
          </div>
        </label>
        <input
          ref={fileInputRef}
          id="fileInput"
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </div>
    </Box>
  );
};

export default FileInput;
