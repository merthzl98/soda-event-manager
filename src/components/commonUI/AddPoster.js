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
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { styled } from "@mui/material/styles";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";

import PosterService from "../../services/PosterService";
import "./AddPoster.scss";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

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
      props.setShowModal(true);
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
      <Button
        onClick={handleClickImage}
        className="add-poster-button"
        variant="contained"
        startIcon={<AddCircleIcon />}
      >
        Add Poster
      </Button>
      <input
        type="file"
        accept="image/*"
        className="poster-input"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      <Grid item xs={12} md={6}>
        <Typography className="posters-typo" variant="h6" component="div">
          Posters
        </Typography>
        <Demo>
          <List dense={false} className="poster-list">
            {props.imagesData.map((poster, index) => (
              <ListItem
                key={poster.fileName}
                className="list-item"
                secondaryAction={
                  <IconButton
                    onClick={() => handleDeletePoster(index)}
                    edge="end"
                    aria-label="delete"
                    color="error"
                  >
                    <DeleteIcon color="error" />
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
  );
};

export default AddPoster;
