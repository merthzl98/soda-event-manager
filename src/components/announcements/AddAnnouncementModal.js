import React, { useState, useContext } from "react";

import AuthContext from "../../storage/auth-context";
import Modal from "../commonUI/Modal";
import AnnouncementServiceV2 from "../../services/v2/AnnouncementService";
import TextInput from "../commonUI/TextInput";

const AddAnnouncementModal = ({
  onHide,
  openModal,
  setAddAnnouncementModal,
  getAnnouncementsData,
  orderLength,
}) => {
  const [state, setState] = useState({
    enteredText: "",
    enteredTextFrench: "",
    enteredTextDutch: "",
    enteredHighlightedText: "",
    enteredHighlightedTextFrench: "",
    enteredHighlightedTextDutch: "",
  });

  const { setIsLoading } = useContext(AuthContext);

  const postAnnouncementData = () => {
    const announcementData = {
      orderNo: orderLength,
      text: state.enteredText,
      textDutch: state.enteredTextDutch,
      textFrench: state.enteredTextFrench,
      highlightedText: state.enteredHighlightedText,
      highlightedTextDutch: state.enteredHighlightedTextDutch,
      highlightedTextFrench: state.enteredHighlightedTextFrench,
      status: "DRAFT",
    };

    setIsLoading(true);

    AnnouncementServiceV2.createAnnouncement(announcementData).then(
      (response) => {
        if (response.status === 200) {
          setIsLoading(false);
          setAddAnnouncementModal(false);
          getAnnouncementsData();
        }
      }
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <>
      <Modal
        onHide={onHide}
        openModal={openModal}
        title="New Announcement Add Form"
        acceptTypo="Add Announcement"
        onRequest={postAnnouncementData}
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
      </Modal>
    </>
  );
};

export default AddAnnouncementModal;
