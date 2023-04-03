import React, { useState, useContext, useRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";

import AuthContext from "../../storage/auth-context";
import Modal from "../commonUI/Modal";
import VenueService from "../../services/VenueService";
import countryData from "../../static/countryData.json";
import ImageModal from "./ImageModal";

const AddVenueModal = ({
  onHide,
  openModal,
  setAddVenueModal,
  getVenuesData,
  setLocationInfos,
}) => {
  const [state, setState] = useState({
    enteredFullAddress: "",
    enteredPosters: "",
    enteredName: "",
  });

  const [countryId, setCountryId] = useState("");
  const [cities, setCities] = useState([]);
  const [cityId, setCityId] = useState("");
  const [posterList, setPosterList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [imageData, setImageData] = useState(null);

  const fileInputRef = useRef(null);

  const { setIsLoading } = useContext(AuthContext);

  const city = cities.find((city) => cityId === city?.state_id);

  const postVenueData = () => {
    const venueData = {
      country: countryData[countryId - 1]?.country_name,
      city: city?.state_name,
      fullAddress: state.enteredFullAddress,
      name: state.enteredName,
      posters: null,
    };

    setLocationInfos({ country_id: countryId, city_id: cityId });

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

  const handleCountry = (e) => {
    const getCountryId = e.target.value;
    const getStatedata = countryData.find(
      (country) => country.country_id === getCountryId
    ).states;
    setCities(getStatedata);
    setCountryId(getCountryId);
  };

  const handleCity = (e) => {
    const cityId = e.target.value;
    setCityId(cityId);
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
              width: "20rem",
              margin: "16px",
            },
          }}
          noValidate
          autoComplete="off"
        >
          <FormControl fullWidth>
            <InputLabel id="select-country">Country</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={countryId}
              label="Country"
              onChange={(e) => handleCountry(e)}
            >
              {countryData.map((getCountry, index) => (
                <MenuItem value={getCountry.country_id} key={index}>
                  {getCountry.country_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="select-city">City</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={cityId}
              label="City"
              onChange={(e) => handleCity(e)}
            >
              {cities.map((getCity, index) => (
                <MenuItem value={getCity.state_id} key={index}>
                  {getCity.state_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
          <TextField
            name="enteredName"
            onChange={handleChange}
            value={state.enteredName}
            id="standard-basic"
            label="Name"
            variant="outlined"
            multiline={true}
            minRows={2}
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
