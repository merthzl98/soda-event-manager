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
import VenueService from "../../services/VenueService";
import EditVenueModal from "./EditVenueModal";
import AddVenueModal from "./AddVenueModal";

const columns = [
  {
    id: "name",
    label: "Name",
    minWidth: 100,
    format: (value) => value.toLocaleString("en-US"),
  },
  { id: "country", label: "Country", minWidth: 100 },
  { id: "city", label: "City", minWidth: 100 },
  {
    id: "fullAddress",
    label: "Full Address",
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

const Venues = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [venuesData, setVenuesData] = useState([]);
  const [addVenueModal, setAddVenueModal] = useState(false);
  const [editVenueModal, setEditVenueModal] = useState(false);
  const [venueData, setVenueData] = useState({});

  const { setIsLoading } = useContext(AuthContext);

  const getVenuesData = () => {
    setIsLoading(true);
    VenueService.getVenues()
      .then((response) => {
        // console.log(response);
        setVenuesData(response.data.content);
      })
      .then(() => setIsLoading(false));
  };

  useEffect(() => {
    getVenuesData();
    // eslint-disable-next-line
  }, []);

  const handleDeleteVenue = (clickedIndex) => {
    const venueId = venuesData[clickedIndex]?.id;
    VenueService.deleteVenue(venueId).then((response) => {
      response.status === 200 && getVenuesData();
    });
  };

  const showAddVenue = () => {
    setAddVenueModal(true);
  };

  const hideAddVenue = () => {
    setAddVenueModal(false);
  };

  const showEditVenue = (clickedIndex) => {
    const venue = venuesData[clickedIndex];
    setVenueData(venue);
    setEditVenueModal(true);
  };

  const hideEditVenue = () => {
    setEditVenueModal(false);
  };

  const handleChangePage = (venue, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (venue) => {
    setRowsPerPage(+venue.target.value);
    setPage(0);
  };
  return (
    <>
      <Paper sx={{ width: "100%", position: "relative" }}>
        <TableContainer sx={{ maxHeight: 740 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  colSpan={columns.length}
                  style={{ backgroundColor: "rgba(0,0,0, 0.2)" }}
                >
                  Venues
                </TableCell>
                <TableCell
                  align="right"
                  colSpan={1}
                  style={{ backgroundColor: "rgba(0,0,0, 0.2)", width: "7rem" }}
                >
                  <Tooltip title="Add New Venue">
                    <Fab
                      onClick={showAddVenue}
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
              {venuesData
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
                          position: "absolute",
                        }}
                      >
                        <Tooltip title="Edit">
                          <IconButton
                            onClick={() => showEditVenue(index)}
                            aria-label="edit"
                            size="large"
                          >
                            <EditIcon fontSize="inherit" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="delete">
                          <IconButton
                            onClick={() => handleDeleteVenue(index)}
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
          count={venuesData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {addVenueModal && (
        <AddVenueModal
          onHide={hideAddVenue}
          openModal={addVenueModal}
          setAddVenueModal={setAddVenueModal}
          getVenuesData={getVenuesData}
        />
      )}

      {editVenueModal && (
        <EditVenueModal
          onHide={hideEditVenue}
          openModal={editVenueModal}
          setEditVenueModal={setEditVenueModal}
          venueData={venueData}
          getVenuesData={getVenuesData}
        />
      )}
    </>
  );
};

export default Venues;
