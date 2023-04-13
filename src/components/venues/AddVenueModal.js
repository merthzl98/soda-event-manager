import React, { useState, useContext, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Autocomplete from "@mui/material/Autocomplete";

import AuthContext from "../../storage/auth-context";
import Modal from "../commonUI/Modal";
import VenueService from "../../services/VenueService";
import ImageModal from "./ImageModal";
import locationData from "../../static/locationData.json";

const AddVenueModal = ({
  onHide,
  openModal,
  setAddVenueModal,
  getVenuesData,
}) => {
  const [state, setState] = useState({
    enteredFullAddress: "",
    enteredPosters: "",
    enteredName: "",
  });

  const [cities, setCities] = useState([]);
  const [posterList, setPosterList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [imageData, setImageData] = useState(null);
  const [country, setCountry] = useState("");
  const [inputCountry, setInputCountry] = useState("");
  const [city, setCity] = useState("");
  const [inputCity, setInputCity] = useState("");

  const fileInputRef = useRef(null);

  const { setIsLoading } = useContext(AuthContext);

  useEffect(() => {
    country && setCities(country.states);
  }, [country]);

  const postVenueData = () => {
    const venueData = {
      country: country.country_name,
      city: city.state_name,
      fullAddress: state.enteredFullAddress,
      name: state.enteredName,
      posters: null,
    };

    setIsLoading(true);

    VenueService.createVenue(venueData).then((response) => {
      if (response.status === 200) {
        setIsLoading(false);
        setAddVenueModal(false);
        getVenuesData();
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setImageData(null);
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

  const handleDeletePoster = (posterIndex) => {
    //delete from server this line
    // PosterService.deletePoster(posterId);

    const filteredPosters = posterList.filter(
      (poster, index) => index !== posterIndex
    );

    setPosterList(filteredPosters);
  };

  console.log("country _name-->", country?.country_name);

  return (
    <>
      <Modal
        onHide={onHide}
        openModal={openModal}
        title={"Add Venue"}
        onRequest={postVenueData}
      >
        <Box
          component="form"
          sx={{
            "& > :not(style)": {
              m: 1,
              display: "flex",
              flexDirection: "column",
              width: "25rem",
              margin: "16px",
            },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            name="enteredName"
            onChange={handleChange}
            value={state.enteredName}
            id="standard-basic"
            label="Name"
            variant="outlined"
            multiline={true}
          />
          <Autocomplete
            value={country?.country_name}
            onChange={(event, newValue) => {
              setCountry(newValue);
            }}
            inputValue={inputCountry}
            onInputChange={(event, newInputValue) => {
              setInputCountry(newInputValue);
            }}
            id="controllable-states-demo"
            options={locationData}
            getOptionLabel={(option) => option.country_name}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Country" />}
          />
          <Autocomplete
            value={city?.state_name}
            onChange={(event, newValue) => {
              setCity(newValue);
            }}
            inputValue={inputCity}
            onInputChange={(event, newInputValue) => {
              setInputCity(newInputValue);
            }}
            id="controllable-states-demo"
            options={cities}
            getOptionLabel={(option) => option.state_name}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="City" />}
          />

          <TextField
            name="enteredFullAddress"
            onChange={handleChange}
            value={state.enteredFullAddress}
            id="standard-basic"
            label="Full Address"
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

export default AddVenueModal;
