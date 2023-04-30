import React from "react";
import { Fab, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";

import "./AddNewButton.scss";

const CustomFab = styled(Fab)({
  minHeight: 0,
});

const AddNewButton = (props) => {
  return (
    <Tooltip title={props.toolTip}>
      <CustomFab
        onClick={props.showAddModal}
        color="primary"
        aria-label="add"
        className="new-button-fab"
      >
        <AddIcon className="add-icon" />
      </CustomFab>
    </Tooltip>
  );
};

export default AddNewButton;
