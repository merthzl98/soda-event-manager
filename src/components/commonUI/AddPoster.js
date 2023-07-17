import React, { useRef } from "react";
import {
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
// import ListItemAvatar from "@mui/material/ListItemAvatar";
// import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

// import PosterService from "../../services/PosterService";
import "./AddPoster.scss";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const StyledButton = styled(Button)({
  textTransform: "none", // Prevents capitalization
});

const getPosterTypeText = (text) => {
  if (text === "EVENT_HIGHLIGHTED") {
    return "Event Highlighted";
  } else if (text === "EVENT_LIST") {
    return "Event List";  
  } else if (text === "EVENT_NEXTUP") {
    return "Event Next-up"
  } else if (text === "EVENT_DETAIL") {
    return "Event Detail";
  } else {
    return text;
  }
};

const AddPoster = (props) => {
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
    props.setFileData(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageInfo = { name: file.name, data: e.target.result };

      props.setImageData(imageInfo);
      props.setIsShownImageModal(true);
    };
    reader.readAsDataURL(file);
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    props.setFileData(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageInfo = { name: file.name, data: e.target.result };

      props.setImageData(imageInfo);
      props.setIsShownImageModal(true);
    };
    reader.readAsDataURL(file);
  };

  const handleDeletePoster = (posterIndex) => {
    // const deletedId = props.imagesData[posterIndex].id;

    // PosterService.deletePoster(deletedId).then((response) => {
    //   console.log(response);

    //   const filteredPosters = props.imagesData.filter(
    //     (poster, index) => index !== posterIndex
    //   );

    //   props.setImagesData(filteredPosters);
    // });

    const filteredPosters = props.imagesData.filter(
      (poster, index) => index !== posterIndex
    );

    props.setImagesData(filteredPosters);

    const filteredList = props.fileNameList.filter(
      (poster, index) => index !== posterIndex
    );

    props.setFileNameList(filteredList);
  };

  return (
    <div className="add-poster-container">
      <Typography className="posters-typo" variant="h8" component="div">
        Upload Posters
      </Typography>

      <div className="add-poster-field">
        <div className="poster-head">
          <StyledButton
            onClick={handleClickImage}
            className="add-poster-button"
            variant="contained"
            size="small"
          >
            Select Files
          </StyledButton>
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
        </div>

        <Grid item xs={12} md={6}>
          <Demo>
            <List dense={true} className="poster-list">
              {props.imagesData?.map((poster, index) => (
                <ListItem
                  key={Math.random()}
                  className="list-item"
                  secondaryAction={
                    <IconButton
                      onClick={() => handleDeletePoster(index)}
                      edge="end"
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  {/* <ListItemAvatar>
                    <Avatar>
                      <img src={props.imageData} alt="Uploaded" />
                    </Avatar>
                  </ListItemAvatar> */}
                  <ListItemText
                    primary={`${poster.fileName}`}
                    secondary={`${getPosterTypeText(poster.type)}`}
                  />
                </ListItem>
              ))}
            </List>
          </Demo>
        </Grid>
      </div>
    </div>
  );
};

export default AddPoster;
