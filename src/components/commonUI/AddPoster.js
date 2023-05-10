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
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import PosterService from "../../services/PosterService";
import "./AddPoster.scss";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const StyledButton = styled(Button)({
  textTransform: "none", // Prevents capitalization
});

const AddPoster = (props) => {
  // const [dense, setDense] = React.useState(false);
  // const [secondary, setSecondary] = React.useState(false);

  const fileInputRef = useRef(null);

  const handleClickImage = () => {
    fileInputRef.current.click();
  };

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
    const deletedId = props.imagesData[posterIndex].id;

    PosterService.deletePoster(deletedId).then((response) => {
      console.log(response);

      const filteredPosters = props.imagesData.filter(
        (poster, index) => index !== posterIndex
      );

      props.setImagesData(filteredPosters);
    });
  };

  console.log("image data-->", props.imageData);

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
          <div className="add-poster-typo">
            <CloudUploadIcon />
            <span>Drop files here...</span>
          </div>
        </div>

        <input
          type="file"
          accept="image/*"
          className="poster-input"
          ref={fileInputRef}
          onChange={handleFileChange}
        />

        <Grid item xs={12} md={6}>
          <Demo>
            <List dense={true} className="poster-list">
              {props.imagesData.map((poster, index) => (
                <ListItem
                  key={poster.fileName}
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
                  <ListItemAvatar>
                    <Avatar>
                      <img src={props.imageData} alt="Uploaded" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${poster.fileName}`}
                    // secondary={secondary ? "Secondary text" : null}
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
