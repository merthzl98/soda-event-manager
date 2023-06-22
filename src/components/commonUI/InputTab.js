import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import "./InputTab.scss";
import TextInput from "./TextInput";

const InputTab = (props) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "input1":
        props.setEnglishDescription(value);
        break;
      case "input2":
        props.setFrenchDescription(value);
        break;
      case "input3":
        props.setDutchDescription(value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Tabs value={activeTab} onChange={handleTabChange}>
        <Tab label="En" />
        <Tab label="Fr" />
        <Tab label="Du" />
      </Tabs>

      {activeTab === 0 && (
        <div>
          <TextInput
            minRows={3}
            name="input1"
            value={props.englishDescription}
            onChange={handleInputChange}
            placeholder="Description"
          />
        </div>
      )}

      {activeTab === 1 && (
        <div>
          <TextInput
            minRows={3}
            name="input2"
            value={props.frenchDescription}
            onChange={handleInputChange}
            placeholder="Description"
          />
        </div>
      )}

      {activeTab === 2 && (
        <div>
          <TextInput
            minRows={3}
            name="input3"
            value={props.dutchDescription}
            onChange={handleInputChange}
            placeholder="Description"
          />
        </div>
      )}
    </div>
  );
};

export default InputTab;
