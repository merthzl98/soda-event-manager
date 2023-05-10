import React from "react";
import { TableCell, TableHead, TableRow } from "@mui/material";

const TableColumnTitle = (props) => {
  return (
    <TableHead>
      <TableRow>
        {props.columns.map((column) => (
          <TableCell
            key={column.id}
            align={column.align}
            style={{
              top: 50,
              minWidth: column.minWidth,
              backgroundColor: "rgba(85, 85, 85, 0.02)",
              padding: "10px 30px",
              fontWeight: "bolder",
            }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableColumnTitle;
