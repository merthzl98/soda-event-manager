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

import AddArtistModal from "./AddArtistModal";
import EditArtistModal from "./EditArtistModal";
import AuthContext from "../../storage/auth-context";
import AlertContext from "../../storage/alert-context";
import ArtistService from "../../services/ArtistService";

const columns = [
  { id: "fullName", label: "Full\u00a0Name", minWidth: 170 },
  { id: "genre", label: "Genre", minWidth: 100 },
  {
    id: "description",
    label: "Description",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "posters",
    label: "Posters",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "socials",
    label: "Socials",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "additionalInfo",
    label: "Additional Info",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];

const Artists = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [artistsData, setArtistsData] = useState([]);
  const [addArtistModal, setAddArtistModal] = useState(false);
  const [editArtistModal, setEditArtistModal] = useState(false);

  const { setIsLoading } = useContext(AuthContext);

  const { handleShowError } = useContext(AlertContext);

  const getArtistsData = () => {
    setIsLoading(true);

    ArtistService.getArtistsList()
      .then((response) => {
        setArtistsData(response.data.content);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        console.log("message", error.message);
        const errorMessage = error.message;
        handleShowError(
          {
            vertical: "top",
            horizontal: "center",
          },
          errorMessage
        );
      })
      .then(() => setIsLoading(false));
  };

  // console.log(artistsData[0].id);

  useEffect(() => {
    getArtistsData();
    // eslint-disable-next-line
  }, []);

  const handleDeleteArtist = (clickedIndex) => {
    console.log(clickedIndex);
  };

  const showAddArtist = () => {
    setAddArtistModal(true);
  };

  const hideAddArtist = () => {
    setAddArtistModal(false);
  };

  const showEditArtist = () => {
    setEditArtistModal(true);
  };

  const hideEditArtist = () => {
    setEditArtistModal(false);
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
                  Artists
                </TableCell>
                <TableCell
                  align="right"
                  colSpan={4}
                  style={{ backgroundColor: "rgba(0,0,0, 0.2)" }}
                >
                  <Tooltip title="Add New Artist">
                    <Fab
                      onClick={showAddArtist}
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
              {artistsData
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
                            onClick={showEditArtist}
                            aria-label="edit"
                            size="large"
                          >
                            <EditIcon fontSize="inherit" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="delete">
                          <IconButton
                            onClick={() => handleDeleteArtist(index)}
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
          count={artistsData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {addArtistModal && (
        <AddArtistModal
          onHide={hideAddArtist}
          openModal={addArtistModal}
          setAddArtistModal={setAddArtistModal}
          getArtistsData={getArtistsData}
        />
      )}

      {editArtistModal && (
        <EditArtistModal
          onHide={hideEditArtist}
          openModal={editArtistModal}
          setEditArtistModal={setEditArtistModal}
        />
      )}
    </>
  );
};

export default Artists;
