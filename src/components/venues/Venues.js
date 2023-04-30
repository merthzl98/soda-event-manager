import React, { useEffect, useState, useContext } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import AuthContext from "../../storage/auth-context";
import VenueService from "../../services/VenueService";
import EditVenueModal from "./EditVenueModal";
import AddVenueModal from "./AddVenueModal";
import TableActions from "../commonUI/TableActions";
import "./Venues.scss";
import TableHeader from "../commonUI/TableHeader";
import TableColumnTitle from "../commonUI/TableColumnTitle";

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
      <Paper className="paper-container">
        <TableContainer sx={{ maxHeight: 740 }}>
          <TableHeader
            title="Venues"
            showAddModal={showAddVenue}
            toolTip="Add New Venue"
          />
          <Table stickyHeader aria-label="sticky table">
            <TableColumnTitle columns={columns} />
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
                        return column.id === "action" ? (
                          <TableCell
                            sx={{ padding: "0px 8px", width: "7rem" }}
                            className="table-actions"
                            key={column.id}
                            align={column.align}
                          >
                            <TableActions
                              handleDelete={() => handleDeleteVenue(index)}
                              showEdit={() => showEditVenue(index)}
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
