import {
  Box,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
// import ListItemAvatar from "@mui/material/ListItemAvatar";
// import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";

// import PosterService from "../../services/PosterService";
import "./AddPoster.scss";
import FileInput from "./FileInput";
import IconButtonUI from "./IconButtonUI";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const getPosterTypeText = (text) => {
  if (text === "EVENT_HIGHLIGHTED") {
    return "Event Highlighted";
  } else if (text === "EVENT_LIST") {
    return "Event List";
  } else if (text === "EVENT_NEXTUP") {
    return "Event Next-up";
  } else if (text === "EVENT_DETAIL") {
    return "Event Detail";
  } else {
    return text;
  }
};

const AddPoster = (props) => {
  const {
    setFileData,
    setImageData,
    setIsShownImageModal,
    setImagesData,
    setFileNameList,
  } = props;

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

    setImagesData(filteredPosters);

    const filteredList = props.fileNameList.filter(
      (poster, index) => index !== posterIndex
    );

    setFileNameList(filteredList);
  };

  return (
    <div className="add-poster-container">
      <Typography
        className="posters-typo"
        sx={{ fontWeight: "bold" }}
        component="div"
      >
        Upload Posters
      </Typography>

      <div className="add-poster-field">
        <div className="poster-head">
          <FileInput
            setFileData={setFileData}
            setImageData={setImageData}
            setIsShownImageModal={setIsShownImageModal}
            label="Select Files"
          />
        </div>
        <Demo>
          <List dense={true} className="poster-list">
            {props.imagesData?.map((poster, index) => (
              <ListItem key={Math.random()} className="list-item">
                {/* <ListItemAvatar>
                    <Avatar>
                      <img src={props.imageData} alt="Uploaded" />
                    </Avatar>
                  </ListItemAvatar> */}
                <ListItemText
                  sx={{
                    display: "flex",
                    gap: "1rem",
                    fontSize: "0.75rem !important",
                  }}
                  primary={`${poster.fileName}`}
                  secondary={`(${getPosterTypeText(poster.type)})`}
                />

                <IconButtonUI
                  onClick={() => handleDeletePoster(index)}
                  title="Delete"
                  bgColor="rgba(235, 59, 59, 0.2)"
                >
                  <DeleteIcon fontSize="medium" color="error" />
                </IconButtonUI>
              </ListItem>
            ))}
          </List>
        </Demo>
      </div>
    </div>
  );
};

export default AddPoster;
