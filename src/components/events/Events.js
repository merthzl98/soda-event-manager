import React, { useEffect, useState, useContext } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Fab from "@mui/material/Fab";
import { Tooltip } from "@mui/material";

import AuthContext from "../../storage/auth-context";
import EventService from "../../services/EventService";
import EditEventModal from "./EditEventModal";
import AddEventModal from "./AddEventModal";

const columns = [
  { id: "fullName", label: "Full\u00a0Name", minWidth: 100 },
  { id: "genre", label: "Genre", minWidth: 100 },
  {
    id: "description",
    label: "Description",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "posters",
    label: "Posters",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "socials",
    label: "Socials",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "additionalInfo",
    label: "Additional Info",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];

const Events = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [eventsData, setEventsData] = useState([]);
  const [addEventModal, setAddEventModal] = useState(false);
  const [editEventModal, setEditEventModal] = useState(false);
  const [eventData, setEventData] = useState({});

  const { setIsLoading } = useContext(AuthContext);

  const geteventsData = () => {
    setIsLoading(true);

    EventService.geteventsList()
      .then((response) => {
        setEventsData(response.data.content);
      })
      .then(() => setIsLoading(false));
  };

  useEffect(() => {
    geteventsData();
    // eslint-disable-next-line
  }, []);

  const handleDeleteevent = (clickedIndex) => {
    const eventId = eventsData[clickedIndex]?.id;
    EventService.deleteEvent(eventId).then((response) => {
      response.status === 200 && geteventsData();
    });
  };

  const showAddevent = () => {
    setAddEventModal(true);
  };

  const hideAddevent = () => {
    setAddEventModal(false);
  };

  const showEditevent = (clickedIndex) => {
    const event = eventsData[clickedIndex];
    setEventData(event);
    setEditEventModal(true);
  };

  const hideEditevent = () => {
    setEditEventModal(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Paper sx={{ width: "100%" }}>
        <TableContainer sx={{ maxHeight: 740 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  colSpan={6}
                  style={{ backgroundColor: "rgba(0,0,0, 0.2)" }}
                >
                  events
                </TableCell>
                <TableCell
                  align="right"
                  colSpan={4}
                  style={{ backgroundColor: "rgba(0,0,0, 0.2)" }}
                >
                  <Tooltip title="Add New event">
                    <Fab
                      onClick={showAddevent}
                      color="primary"
                      aria-label="add"
                      size="small"
                    >
                      <AddIcon />
                    </Fab>
                  </Tooltip>
                </TableCell>
              </TableRow>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      top: 57,
                      minWidth: column.minWidth,
                      backgroundColor: "rgba(0,0,0, 0.1)",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {eventsData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={Math.random()}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                      <td
                        className="actions"
                        style={{
                          width: "7rem",
                          backgroundColor: "rgba(50,50,0, 0.1)",
                        }}
                      >
                        <Tooltip title="Edit">
                          <IconButton
                            onClick={() => showEditevent(index)}
                            aria-label="edit"
                            size="large"
                          >
                            <EditIcon fontSize="inherit" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="delete">
                          <IconButton
                            onClick={() => handleDeleteevent(index)}
                            aria-label="delete"
                            size="large"
                          >
                            <DeleteIcon fontSize="inherit" />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={eventsData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {addEventModal && (
        <AddEventModal
          onHide={hideAddevent}
          openModal={addEventModal}
          setAddeventModal={setAddEventModal}
          geteventsData={geteventsData}
        />
      )}

      {editEventModal && (
        <EditEventModal
          onHide={hideEditevent}
          openModal={editEventModal}
          setEditeventModal={setEditEventModal}
          eventData={eventData}
          geteventsData={geteventsData}
        />
      )}
    </>
  );
};

export default Events;
