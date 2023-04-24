import React, { useRef } from "react";
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
// import Avatar from "@mui/material/Avatar";
// import Box from "@mui/material/Box";
// import Paper from "@mui/material/Paper";
// import Stack from "@mui/material/Stack";
// import { styled } from "@mui/material/styles";
// import Typography from "@mui/material/Typography";

import PosterService from "../../services/PosterService";

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
// }));

// const message = `Truncation should be conditionally applicable on this long line of text
//  as this is a much longer line than what the container can support.`;

const AddPoster = (props) => {
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

  return (
    <>
      <Button
        onClick={handleClickImage}
        sx={{ width: "12rem", margin: "8px 16px" }}
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
      {/* <Box sx={{ flexGrow: 1, overflow: "hidden", px: 5, width: "30rem" }}>
        <Item
          sx={{
            my: 1,
            mx: "auto",
            p: 2,
          }}
        >
          <Stack spacing={2} direction="row" alignItems="center">
            <Avatar>W</Avatar>
            <Typography noWrap>{message}</Typography>
            <IconButton color="error">
              <DeleteIcon color="error" />
            </IconButton>
          </Stack>
        </Item>
        <Item
          sx={{
            my: 1,
            mx: "auto",
            p: 2,
          }}
        >
          <Stack spacing={2} direction="row" alignItems="center">
            <Stack><Avatar>W</Avatar></Stack>
            <Stack sx={{ minWidth: 0 }}>
              <Typography noWrap>{message}</Typography>
            </Stack>
            <Stack>
              <IconButton color="error">
                <DeleteIcon color="error" />
              </IconButton>
            </Stack>
          </Stack>
        </Item>
      </Box> */}

      <List
        sx={{ width: "70%", maxWidth: "40rem", bgcolor: "background.paper" }}
      >
        {props.imagesData.map((poster, index) => (
          <ListItem
            key={poster.fileName}
            disableGutters
            sx={{
              backgroundColor: "rgba(1,1,1, 0.1)",
              margin: "8px 16px",
              borderRadius: "10px",
            }}
            secondaryAction={
              <IconButton
                onClick={() => handleDeletePoster(index)}
                aria-label="comment"
                color="error"
              >
                <DeleteIcon color="error" />
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
              primary={`${poster.fileName}`}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default AddPoster;
