import React, { useState, useContext, useRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";

import AuthContext from "../../storage/auth-context";
import Modal from "../commonUI/Modal";
import ArtistService from "../../services/ArtistService";
import ImageModal from "./ImageModal";
// import PosterService from "../../services/PosterService";

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
    enteredPoster: "",
  });
  const [posterList, setPosterList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [imageData, setImageData] = useState(null);

  const fileInputRef = useRef(null);

  const { setIsLoading } = useContext(AuthContext);

  const postArtistData = () => {
    const artistData = {
      fullName: state.enteredFullName,
      genre: state.enteredGenre,
      description: state.enteredDescription,
      posters: null,
      // posters: imageList,
    };

    setIsLoading(true);

    ArtistService.createArtist(artistData).then((response) => {
      if (response.status === 200) {
        setIsLoading(false);
        setAddArtistModal(false);
        getArtistsData();
      }
    });
  };

  const handleClickImage = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageInfo = { name: file.name, data: e.target.result };
      // setPosterList((prevList) => [...prevList, imageInfo]);
      setImageData(imageInfo);
      setShowModal(true); // show the modal after adding the image to the list
    };
    reader.readAsDataURL(file);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setImageData(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleDeletePoster = (posterIndex) => {
    //delete from server this line
    // PosterService.deletePoster(posterId);

    const filteredPosters = posterList.filter(
      (poster, index) => index !== posterIndex
    );

    setPosterList(filteredPosters);
  };

  return (
    <>
      <Modal
        onHide={onHide}
        openModal={openModal}
        title={"Add Artist"}
        onRequest={postArtistData}
      >
        <Box
          component="form"
          sx={{
            "& > :not(style)": {
              m: 1,
              display: "flex",
              flexDirection: "column",
              width: "20rem",
              margin: "16px",
            },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            name="enteredFullName"
            onChange={handleChange}
            value={state.enteredFullName}
            id="outlined-basic"
            label="Full Name"
            variant="outlined"
            multiline={true}
          />
          <TextField
            name="enteredGenre"
            onChange={handleChange}
            value={state.enteredGenre}
            id="outlined-basic"
            label="Genre"
            variant="outlined"
            multiline={true}
          />
          <TextField
            name="enteredDescription"
            onChange={handleChange}
            value={state.enteredDescription}
            id="outlined-basic"
            label="Description"
            variant="outlined"
            multiline={true}
            minRows={3}
          />
        </Box>
        <Button
          onClick={handleClickImage}
          sx={{ width: "10rem", margin: "8px 16px" }}
          variant="contained"
          startIcon={<AddCircleIcon />}
        >
          Add Poster
        </Button>
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={handleFileChange}
        />

        {/* {imageData && <img src={imageData} alt="Uploaded" />} */}

        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {posterList.map((poster, index) => (
            <ListItem
              key={poster.name}
              disableGutters
              secondaryAction={
                <IconButton
                  onClick={() => handleDeletePoster(index)}
                  aria-label="comment"
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText
                sx={{
                  textDecoration: "underline",
                  color: "purple",
                  margin: "0px 16px",
                  cursor: "pointer",
                }}
                primary={`${poster.name}`}
              />
            </ListItem>
          ))}
        </List>
      </Modal>
      {showModal && (
        <ImageModal
          imageData={imageData}
          onOpen={showModal}
          onClose={handleCloseModal}
          setPosterList={setPosterList}
        />
      )}
    </>
  );
};

export default AddArtistModal;
