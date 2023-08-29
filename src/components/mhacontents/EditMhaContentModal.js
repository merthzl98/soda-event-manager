import React, { useState, useEffect } from "react";

import MhaContentServiceV2 from "../../services/v2/MhaContentService";
import Modal from "../commonUI/Modal";
import TextInput from "../commonUI/TextInput";
import SelectInputUI from "../commonUI/SelectInputUI";
import { statusConfig } from "../../configs/config";

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

  return (
    <Modal
      onHide={onHide}
      openModal={openModal}
      title="Edit Main Highlighted Area Content"
      acceptTypo="Save"
      onRequest={updateMhaContentData}
    >
      <TextInput
        name="enteredTargetUrl"
        onChange={handleChangeEnteredTargetUrl}
        value={enteredTargetUrl}
        label="Target url"
        minRows={3}
      />
      <SelectInputUI
        label="Mha Concent Status"
        width="100px"
        value={mhaContentStatus}
        setValue={setMhaContentStatus}
        data={statusConfig}
      />
    </Modal>
  );
};

export default EditMhaContentModal;
