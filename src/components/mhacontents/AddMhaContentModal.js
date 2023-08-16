import React, { useState, useContext, useRef, useEffect } from "react";
import AuthContext from "../../storage/auth-context";
import Modal from "../commonUI/Modal";
import TextInput from "../commonUI/TextInput";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button, Checkbox, FormControlLabel, Grid, Stack } from "@mui/material";
import MhaContentServiceV2 from "../../services/v2/MhaContentService";
import PosterServiceV2 from "../../services/v2/PosterService";
import DefaultImage from "../../static/empty_content_yet.jpg";
import "./AddMhaContentModal.scss";

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
  const [fileData, setFileData] = useState(null);
  const [enteredExternalUrl, setEnteredExternalUrl] = useState("");
  const [enteredTargetUrl, setEnteredTargetUrl] = useState("");
  const [showExternalContent, setShowExternalContent] = useState(false);

  const posterInputRef = useRef(null);
  // const videoInputRef = useRef(null);

  const { setIsLoading } = useContext(AuthContext);

  const postMhaContentData = () => {
    const formData = new FormData();
    formData.append("file", fileData);

    PosterServiceV2.uploadPoster("MHA_DEFAULT", formData)
      .then((response) => {
        const mhaContentData = {
          contentType: contentType,
          status: status,
          posterId: response.data.poster.id,
          videoId: null,
          external: external,
          externalUrl: enteredExternalUrl,
          targetUrl: enteredTargetUrl,
        };

        setIsLoading(true);

        MhaContentServiceV2.createMhaContent(mhaContentData).then(
          (response) => {
            if (response.status === 200) {
              setIsLoading(false);
              setAddMhaContentModal(false);
              getMhaContentsData();
            }
          }
        );
      })
      .catch((error) => {
        console.error(error);
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
    setEnteredExternalUrl("");
    setShowExternalContent(false);
    setContentType(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileData(file);
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
      acceptTypo="Add Highlighted Poster"
      onRequest={postMhaContentData}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xl: "row", sm: "column" },
          gap: "2rem",
          position: "relative",
        }}
      >
        <Box
          className="image-container"
          // sx={{
          //   maxWidth: "958px",
          //   height: "540px",
          //   border: "2px solid red",
          // }}
        >
          {/* {!external && fileInfo.data && contentType === "VIDEO" && (
            <video src={fileInfo.data} alt="Video" />
          )} */}
          {!external && fileInfo.data && contentType === "POSTER" && (
            <img
              src={fileInfo.data}
              alt="Poster"
              // style={{ maxWidth: "1058", height: "auto"}}
            />
          )}
          {/* {external && showExternalContent && contentType === "VIDEO" && (
            <iframe src={enteredExternalUrl} />
          )} */}
          {/* {external && showExternalContent && contentType === "POSTER" && (
            <img
              src={enteredExternalUrl}
              width="1158px"
              height="540px"
              alt="Poster"
            />
          )} */}
          {!showExternalContent && !fileInfo.data && (
            <img
              src={DefaultImage}
              style={{
                aspectRatio: "2.144",
                // width: "1158px",
                // height: "540px",
              }}
              alt="Poster"
            />
          )}
        </Box>

        <Stack spacing={3} sx={{ minWidth: "215px" }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            {/* <FormControlLabel
                control={
                  <Checkbox
                    checked={external}
                    onChange={() => setExternal(!external)}
                  />
                }
                label="External"
              />
              <FormControl size="small" sx={{ minWidth: "160px" }}>
                <Select
                  value={contentType}
                  onChange={handleChangeContentType}
                  input={<OutlinedInput />}
                >
                  <MenuItem value="POSTER">Poster</MenuItem>
                  <MenuItem value="VIDEO">Video</MenuItem>
                </Select>
              </FormControl> */}
            {/* {!external && contentType === "VIDEO" && (
                <>
                  <Button
                    onClick={() => videoInputRef.current.click()}
                    variant="contained"
                    size="small"
                    sx={{ minWidth: "160px" }}
                  >
                    Select
                  </Button>
                  <input
                    ref={videoInputRef}
                    id="fileInputVideo"
                    type="file"
                    accept="video/mp4,video/x-m4v,video/*"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                </>
              )} */}
            {!external && contentType === "POSTER" && (
              <>
                <Button
                  onClick={() => posterInputRef.current.click()}
                  variant="contained"
                  size="small"
                  sx={{ minWidth: "120px" }}
                >
                  Select
                </Button>
                <input
                  ref={posterInputRef}
                  id="fileInputPoster"
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </>
            )}
          </Stack>
          {/* {external && (
              <>
                <TextInput
                  name="enteredExternalUrl"
                  onChange={handleChangeEnteredExternalUrl}
                  value={enteredExternalUrl}
                  label="External url"
                  minRows={3}
                />
              </>
            )} */}
          <TextInput
            name="enteredTargetUrl"
            onChange={handleChangeEnteredTargetUrl}
            value={enteredTargetUrl}
            label="Target url"
            minRows={3}
          />
        </Stack>
      </Box>
    </Modal>
  );
};

export default AddMhaContentModal;
