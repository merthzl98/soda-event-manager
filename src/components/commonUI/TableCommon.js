import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  TableHead,
  Typography,
  Box,
} from "@mui/material";
import React from "react";

import TableActions from "./TableActions";
import { tableConfig } from "../../configs/config";
import greenDot from "../../assets/icons/greenDot.png";
import greyDot from "../../assets/icons/greyDot.png";
import "./TableCommon.scss";
import TableHeader from "./TableHeader";

const TableCommon = (props) => {
  const {
    columns,
    data,
    handleDelete,
    showEdit,
    count,
    page,
    onPageChange,
    title,
    showAddModal,
    label,
  } = props;

  const getFormattedHour = (time) => {
    console.log("time: " + time);
    const date = new Date(time);

    const hour = date.getHours();
    const minute = date.getMinutes();

    return `${hour}:${minute}`;
  };

  const getFormattedDate = (time) => {
    return new Date(time).toLocaleDateString("en-CA");
  };

  return (
    <Paper className="paper-container">
      <TableContainer sx={{ maxHeight: 740 }}>
        <TableHeader title={title} showAddModal={showAddModal} label={label} />
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={{
                    top: 50,
                    minWidth: column.minWidth,
                    backgroundColor: "rgba(85, 85, 85, 0.02)",
                    padding: "8px 24px",
                    color: "text.secondary",
                    fontWeight: "medium",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={Math.random()}
                >
                  {columns.map((column) => {
                    let truncatedValue = "";
                    const value = row[column.id];
                    if (column.id === "date") {
                      truncatedValue = getFormattedDate(row.startTime);
                    } else if (column.id === "startHour") {
                      truncatedValue = getFormattedHour(row.startTime);
                    } else {
                      truncatedValue =
                        typeof value === "string" &&
                        value.length > column.maxLength
                          ? `${value.slice(0, column.maxLength)}...`
                          : value;
                    }

                    return column.id === "action" ? (
                      <TableCell
                        className="table-cell-action"
                        key={column.id}
                        align={column.align}
                      >
                        <TableActions
                          handleDelete={() => handleDelete(index)}
                          showEdit={() => showEdit(index)}
                        />
                      </TableCell>
                    ) : (
                      <TableCell
                        sx={{
                          padding: "8px 24px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "25vw",
                          fontWeight: "medium",
                        }}
                        key={column.id}
                        align={column.align}
                      >
                        {value === "LIVE" && (
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              border: "1px solid green",
                              width: "75px",
                              borderRadius: "8px",
                              color: "green",
                              gap: "4px",
                              backgroundColor: "rgba(7, 233, 82, 0.1)",
                            }}
                          >
                            <img
                              style={{
                                width: "0.5rem",
                                height: "0.5rem",
                              }}
                              src={greenDot}
                              alt="live icon"
                            />
                            Live
                          </Box>
                        )}
                        {value === "DRAFT" && (
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              border: "1px solid rgba(1 ,1 ,1 ,0.25)",
                              width: "75px",
                              borderRadius: "8px",
                              color: "grey",
                              gap: "4px",
                              backgroundColor: "rgba(1 ,1 ,1 ,0.1)",
                            }}
                          >
                            <img
                              style={{
                                width: "0.5rem",
                                height: "0.5rem",
                              }}
                              src={greyDot}
                              alt="draft icon"
                            />
                            Draft
                          </Box>
                        )}
                        {column.format && typeof truncatedValue === "number"
                          ? column.format(truncatedValue)
                          : value !== "DRAFT" &&
                            value !== "LIVE" &&
                            truncatedValue}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        className="table-foot"
        rowsPerPageOptions={[tableConfig.itemCount]}
        component="div"
        count={count}
        rowsPerPage={tableConfig.itemCount}
        page={page}
        onPageChange={onPageChange}
      />
    </Paper>
  );
};

export default TableCommon;
