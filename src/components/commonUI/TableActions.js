import React from "react";
import { Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import IconButtonUI from "./IconButtonUI";

const TableActions = (props) => {
  const { showEdit, handleDelete, hideEdit } = props;
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "right",
        gap: "8px",
        padding: "12px 0",
      }}
    >
      {!hideEdit && (
        <IconButtonUI
          title="Edit"
          color="primary"
          onClick={showEdit}
          bgColor="rgba(15,5,29,0.15)"
        >
          <EditIcon fontSize="medium" color="primary" />
        </IconButtonUI>
      )}

      <IconButtonUI
        title="Delete"
        color="error"
        onClick={handleDelete}
        bgColor="rgba(235, 59, 59, 0.2)"
      >
        <DeleteIcon fontSize="medium" color="error" />
      </IconButtonUI>
    </Box>
  );
};

export default TableActions;
