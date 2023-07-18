import React, { useState, useContext, useRef, useEffect } from "react";
import AuthContext from "../../storage/auth-context";
import Modal from "../commonUI/Modal";
import TextInput from "../commonUI/TextInput";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button, Checkbox, FormControlLabel } from "@mui/material";
import MhaContentServiceV2 from "../../services/v2/MhaContentService";

const isUrlValid = (text) => {
  try {
    new URL(text);
    return true;
  } catch (err) {
    return false;
  }
};

const AddMhaContentModal = ({
  onHide,
  openModal,
  setAddMhaContentModal,
  getMhaContentsData,
}) => {
  const [contentType, setContentType] = useState("POSTER");
  const [status, setStatus] = useState("DRAFT");
  const [posterId, setPosterId] = useState("");
  const [videoId, setVideoId] = useState("");
  const [external, setExternal] = useState(false);
  const [fileInfo, setFileInfo] = useState({});
  const [enteredExternalUrl, setEnteredExternalUrl] = useState("");
  const [enteredTargetUrl, setEnteredTargetUrl] = useState("");
  const [showExternalContent, setShowExternalContent] = useState(false);

  const posterInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const { setIsLoading } = useContext(AuthContext);

  const postMhaContentData = () => {
    const mhaContentData = {
      contentType: contentType,
      status: status,
      posterId: posterId,
      videoId: videoId,
      external: external,
      externalUrl: enteredExternalUrl,
      targetUrl: enteredTargetUrl,
    };

    setIsLoading(true);

    MhaContentServiceV2.createMhaContent(mhaContentData).then((response) => {
      if (response.status === 200) {
        setIsLoading(false);
        setAddMhaContentModal(false);
        getMhaContentsData();
      }
    });
  };

  const handleChangeEnteredExternalUrl = (event) => {
    setEnteredExternalUrl(event.target.value);
  };

  useEffect(() => {
    if (isUrlValid(enteredExternalUrl)) {
      setShowExternalContent(true);
    } else {
      setShowExternalContent(false);
    }
  }, [enteredExternalUrl]);

  const handleChangeEnteredTargetUrl = (event) => {
    setEnteredTargetUrl(event.target.value);
  };

  const handleChangeContentType = (event) => {
    setFileInfo({});
    setContentType(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setFileInfo({ name: file.name, data: e.target.result });
    };
    reader.readAsDataURL(file);
  };

  return (
    <Modal
      onHide={onHide}
      openModal={openModal}
      title="Add Main Highlighted Area Content"
      acceptTypo="Add MhaContent"
      onRequest={postMhaContentData}
    >
      <Box
        component="form"
        sx={{
          margin: "0px 5px",
          "& > :not(style)": {
            m: 1,
            display: "flex",
            flexDirection: "column",
            width: "100%",
            margin: "15px 0px",
          },
        }}
        noValidate
        autoComplete="off"
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={external}
              onChange={() => setExternal(!external)}
            />
          }
          label="External url"
        />
        <FormControl size="small">
          <Select
            value={contentType}
            onChange={handleChangeContentType}
            input={<OutlinedInput />}
          >
            <MenuItem value="POSTER">Poster</MenuItem>
            <MenuItem value="VIDEO">Video</MenuItem>
          </Select>
        </FormControl>
        {!external && contentType === "VIDEO" && (
          <>
            <Button
              onClick={() => videoInputRef.current.click()}
              variant="contained"
              size="small"
            >
              Select video
            </Button>
            <input
              ref={videoInputRef}
              id="fileInputVideo"
              type="file"
              accept="video/mp4,video/x-m4v,video/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            {fileInfo.data && <video src={fileInfo.data} alt="Video" />}
          </>
        )}
        {!external && contentType === "POSTER" && (
          <>
            <Button
              onClick={() => posterInputRef.current.click()}
              variant="contained"
              size="small"
            >
              Select poster
            </Button>
            <input
              ref={posterInputRef}
              id="fileInputPoster"
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            {fileInfo.data && <img src={fileInfo.data} alt="Poster" />}
          </>
        )}
        {external && (
          <>
            <TextInput
              name="enteredExternalUrl"
              onChange={handleChangeEnteredExternalUrl}
              value={enteredExternalUrl}
              label="External url"
              minRows={1}
            />
            {showExternalContent && contentType === "VIDEO" && (
              <iframe src={enteredExternalUrl} />
            )}
            {showExternalContent && contentType === "POSTER" && (
              <img src={enteredExternalUrl} alt="Poster" />
            )}
          </>
        )}
        <TextInput
          name="enteredTargetUrl"
          onChange={handleChangeEnteredTargetUrl}
          value={enteredTargetUrl}
          label="Target url"
          minRows={1}
        />
      </Box>
    </Modal>
  );
};

export default AddMhaContentModal;
