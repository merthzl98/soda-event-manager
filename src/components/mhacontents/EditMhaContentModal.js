import React, { useState, useEffect } from "react";
import MhaContentServiceV2 from "../../services/v2/MhaContentService";
import Modal from "../commonUI/Modal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextInput from "../commonUI/TextInput";
import Stack from "@mui/material/Stack";

const EditMhaContentModal = ({
  onHide,
  openModal,
  setEditMhaContentModal,
  getMhaContentsData,
  mhaContentId,
}) => {
  const [mhaContentStatus, setMhaContentStatus] = useState("DRAFT");
  const [enteredTargetUrl, setEnteredTargetUrl] = useState("");

  useEffect(() => {
    MhaContentServiceV2.getMhaContentById(mhaContentId).then((response) => {
      console.log({ response });
      setMhaContentStatus(response.data.status);
      setEnteredTargetUrl(response.data.targetUrl);
    });
  }, []);

  const updateMhaContentData = () => {
    MhaContentServiceV2.softUpdateMhaContent({
      id: mhaContentId,
      status: mhaContentStatus,
      targetUrl: enteredTargetUrl,
    }).then((response) => {
      if (response.status === 200) {
        setEditMhaContentModal(false);
        getMhaContentsData();
      }
    });
  };

  const handleChangeEnteredTargetUrl = (event) => {
    setEnteredTargetUrl(event.target.value);
  };

  const handleChangeMhaContentStatus = (event) => {
    setMhaContentStatus(event.target.value);
  };

  return (
    <Modal
      onHide={onHide}
      openModal={openModal}
      title="Edit Main Highlighted Area Content"
      acceptTypo="Save"
      onRequest={updateMhaContentData}
    >
      <Stack spacing={4}>
        <FormControl sx={{ width: "47%" }} variant="standard">
          <InputLabel
            sx={{
              fontWeight: "700 !important",
              color: "rgba(0, 0, 0, 0.6)",
              fontSize: "1rem",
            }}
            id="demo-simple-select-label"
          >
            MhaContent Status
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={mhaContentStatus}
            label="MhaContent Status"
            onChange={handleChangeMhaContentStatus}
            sx={{
              backgroundColor: "rgba(85, 85, 85, 0.1)",
              borderRadius: "4px",
              border: "1px solid #ced4da",
              padding: "4px 8px !important",
            }}
          >
            <MenuItem value="DRAFT" sx={{ paddingLeft: "15px !important" }}>
              Draft
            </MenuItem>
            <MenuItem value="PREVIEW">Preview</MenuItem>
            <MenuItem value="LIVE">Live</MenuItem>
          </Select>
        </FormControl>
        <TextInput
          name="enteredTargetUrl"
          onChange={handleChangeEnteredTargetUrl}
          value={enteredTargetUrl}
          label="Target url"
          minRows={3}
        />
      </Stack>
    </Modal>
  );
};

export default EditMhaContentModal;
