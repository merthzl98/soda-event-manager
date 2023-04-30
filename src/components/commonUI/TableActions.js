import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import "./TableActions.scss";

const TableActions = (props) => {
  return (
    <>
      <Tooltip title="Edit">
        <IconButton
          onClick={props.showEdit}
          aria-label="edit"
          size="medium"
          color="primary"
        >
          <EditIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
      <Tooltip title="delete">
        <IconButton
          onClick={props.handleDelete}
          aria-label="delete"
          size="medium"
          color="error"
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default TableActions;
