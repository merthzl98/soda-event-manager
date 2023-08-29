import React, { useState, useEffect } from "react";

import AnnounceService from "../../services/AnnouncementService";
import AnnouncementServiceV2 from "../../services/v2/AnnouncementService";
import Modal from "../commonUI/Modal";
import TextInput from "../commonUI/TextInput";
import { statusConfig } from "../../configs/config";
import SelectInputUI from "../commonUI/SelectInputUI";

const EditAnnouncementModal = ({
  onHide,
  openModal,
  setEditAnnouncementModal,
  getAnnouncementsData,
  announcementId,
}) => {
  const [state, setState] = useState({
    enteredText: "",
    enteredTextFrench: "",
    enteredTextDutch: "",
    enteredHighlightedText: "",
    enteredHighlightedTextFrench: "",
    enteredHighlightedTextDutch: "",
  });
  const [announcementStatus, setAnnouncementStatus] = useState("DRAFT");

  useEffect(() => {
    AnnouncementServiceV2.getAnnoucementById(announcementId).then(
      (response) => {
        setState({
          enteredText: response.data.announcement.text,
          enteredTextFrench: response.data.announcement.textFrench,
          enteredTextDutch: response.data.announcement.textDutch,
          enteredHighlightedText: response.data.announcement.highlightedText,
          enteredHighlightedTextFrench:
            response.data.announcement.highlightedTextFrench,
          enteredHighlightedTextDutch:
            response.data.announcement.highlightedTextDutch,
        });
        setAnnouncementStatus(response.data.announcement.status);
      }
    );
  }, []);

  const updateAnnouncementData = () => {
    const updatedData = {
      id: announcementId,
      status: announcementStatus,
      text: state.enteredText,
      textDutch: state.enteredTextDutch,
      textFrench: state.enteredTextFrench,
      highlightedText: state.enteredHighlightedText,
      highlightedTextDutch: state.enteredHighlightedTextDutch,
      highlightedTextFrench: state.enteredHighlightedTextFrench,
    };
    AnnouncementServiceV2.updateAnnouncement(updatedData).then((response) => {
      if (response.status === 200) {
        setEditAnnouncementModal(false);
        getAnnouncementsData();
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const changeAnnouncementStatus = (event) => {
    setAnnouncementStatus(event.target.value);
  };

  return (
    <Modal
      onHide={onHide}
      openModal={openModal}
      title="Edit Announce Information"
      acceptTypo="Save Changes"
      onRequest={updateAnnouncementData}
    >
      <TextInput
        name="enteredHighlightedText"
        onChange={handleChange}
        value={state.enteredHighlightedText}
        label="Highlighted Eng"
        minRows={1}
      />
      <TextInput
        name="enteredHighlightedTextFrench"
        onChange={handleChange}
        value={state.enteredHighlightedTextFrench}
        label="Highlighted French"
        minRows={1}
      />
      <TextInput
        name="enteredHighlightedTextDutch"
        onChange={handleChange}
        value={state.enteredHighlightedTextDutch}
        label="Highlighted Dutch"
        minRows={1}
      />
      <TextInput
        name="enteredText"
        onChange={handleChange}
        value={state.enteredText}
        label="Eng"
        minRows={1}
      />
      <TextInput
        name="enteredTextFrench"
        onChange={handleChange}
        value={state.enteredTextFrench}
        label="French"
        minRows={1}
      />
      <TextInput
        name="enteredTextDutch"
        onChange={handleChange}
        value={state.enteredTextDutch}
        label="Dutch"
        minRows={1}
      />
      <SelectInputUI
        label="Announcement Status"
        width="100px"
        value={announcementStatus}
        setValue={setAnnouncementStatus}
        data={statusConfig}
      />
    </Modal>
  );
};

export default EditAnnouncementModal;
