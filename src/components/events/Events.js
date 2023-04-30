import React, { useEffect, useState, useContext } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import AuthContext from "../../storage/auth-context";
import EventService from "../../services/EventService";
import EditEventModal from "./EditEventModal";
import AddEventModal from "./AddEventModal";
import TableActions from "../commonUI/TableActions";
import "./Events.scss";
import TableHeader from "../commonUI/TableHeader";
import TableColumnTitle from "../commonUI/TableColumnTitle";

const columns = [
  {
    id: "title",
    label: "Title",
    minWidth: 100,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "date",
    label: "Date",
    minWidth: 100,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "startHour",
    label: "Start Hour",
    minWidth: 100,
    format: (value) => value.toLocaleString("en-US"),
  },

  {
    id: "status",
    label: "Status",
    minWidth: 100,
    format: (value) => value.toLocaleString("en-US"),
  },

  {
    id: "action",
    label: "Action",
    align: "center",
    minWidth: 100,
    format: (value) => value.toLocaleString("en-US"),
  },

  // {
  //   id: "posters",
  //   label: "Posters",
  //   minWidth: 100,
  //   // align: "right",
  //   format: (value) => value.toLocaleString("en-US"),
  // },
];

const Events = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [eventsData, setEventsData] = useState([]);
  const [addEventModal, setAddEventModal] = useState(false);
  const [editEventModal, setEditEventModal] = useState(false);
  const [eventData, setEventData] = useState({});

  const { setIsLoading } = useContext(AuthContext);

  const getEventsData = () => {
    setIsLoading(true);
    EventService.getEvents()
      .then((response) => {
        console.log(response);
        setEventsData(response.data.content);
      })
      .then(() => setIsLoading(false));
  };

  useEffect(() => {
    getEventsData();
    // eslint-disable-next-line
  }, []);

  const handleDeleteEvent = (clickedIndex) => {
    const eventId = eventsData[clickedIndex]?.id;
    EventService.deleteEvent(eventId).then((response) => {
      response.status === 200 && getEventsData();
    });
  };

  const showAddEvent = () => {
    setAddEventModal(true);
  };

  const hideAddEvent = () => {
    setAddEventModal(false);
  };

  const showEditEvent = (clickedIndex) => {
    const event = eventsData[clickedIndex];
    console.log("event id-->", event.id);
    // EventService.getEventById(event.id).then((response) => {
    //   console.log("response-->",response);
    // })
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
      <Paper className="paper-container">
        <TableContainer sx={{ maxHeight: 740 }}>
          <TableHeader
            title="Events"
            showAddModal={showAddEvent}
            toolTip="Add New Event"
          />
          <Table stickyHeader aria-label="sticky table">
            <TableColumnTitle columns={columns} />
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
                        return column.id === "action" ? (
                          <TableCell
                            sx={{ padding: "0px 8px", width: "7rem" }}
                            className="table-actions"
                            key={column.id}
                            align={column.align}
                          >
                            <TableActions
                              handleDelete={() => handleDeleteEvent(index)}
                              showEdit={() => showEditEvent(index)}
                            />
                          </TableCell>
                        ) : (
                          <TableCell
                            sx={{
                              padding: "12px 30px",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              maxWidth: "25vw",
                            }}
                            key={column.id}
                            align={column.align}
                          >
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
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
          onHide={hideAddEvent}
          openModal={addEventModal}
          setAddeventModal={setAddEventModal}
          geteventsData={getEventsData}
        />
      )}

      {editEventModal && (
        <EditEventModal
          onHide={hideEditevent}
          openModal={editEventModal}
          setEditeventModal={setEditEventModal}
          eventData={eventData}
          geteventsData={getEventsData}
        />
      )}
    </>
  );
};

export default Events;
